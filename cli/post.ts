#!/usr/bin/env npx ts-node

import { getDb, getPost, getAllPosts, canPostToCategory, addPostLog } from "../lib/db";
import { rotateContent, generateTitles } from "../lib/rotator";
import { postToCraigslist } from "../lib/poster";

const args = process.argv.slice(2);
const command = args[0];

function help() {
  console.log(`
┌─────────────────────────────────────────┐
│  CL-Poster CLI                          │
├─────────────────────────────────────────┤
│  Commands:                              │
│    list          List all post templates│
│    post <id>     Post a template to CL  │
│    rotate <n>    Generate n title ideas  │
│    status        Show posting history    │
│    cooldown      Check category cooldowns│
└─────────────────────────────────────────┘
  `);
}

async function listPosts() {
  const posts = getAllPosts();
  if (posts.length === 0) {
    console.log("No posts yet. Create one at http://localhost:3000/posts/new");
    return;
  }
  console.log("\n📋 Post Templates:\n");
  for (const p of posts) {
    console.log(`  [${p.id}] ${p.title}`);
    console.log(`      ${p.category} / ${p.subcategory} — ${p.location}`);
    console.log();
  }
}

async function postById(id: number) {
  const post = getPost(id);
  if (!post) {
    console.error(`Post #${id} not found.`);
    process.exit(1);
  }

  // Check cooldown
  const cd = canPostToCategory(post.category, post.location);
  if (!cd.allowed) {
    console.error(`⏳ Cooldown active. Next post allowed at: ${cd.nextPostAt}`);
    process.exit(1);
  }

  // Rotate content
  const { title, description } = rotateContent(post.title, post.description);

  console.log("\n📝 Posting to Craigslist:");
  console.log(`   Title: ${title}`);
  console.log(`   Category: ${post.category} > ${post.subcategory}`);
  console.log(`   Location: ${post.location}`);
  console.log();

  // Log as pending
  const log = addPostLog({
    post_id: post.id,
    title_used: title,
    description_used: description,
    category: post.category,
    location: post.location,
    status: "pending",
    cl_url: "",
  });

  // Launch Playwright
  const result = await postToCraigslist({
    title,
    description,
    price: post.price,
    location: post.location,
    category: post.category,
    subcategory: post.subcategory,
    email: post.email,
  });

  if (result.success) {
    // Update log status
    getDb()
      .prepare("UPDATE post_logs SET status = 'posted' WHERE id = ?")
      .run(log.id);
    console.log("✅ Post submitted successfully!");
  } else {
    getDb()
      .prepare("UPDATE post_logs SET status = 'failed' WHERE id = ?")
      .run(log.id);
    console.error(`❌ Failed: ${result.error}`);
  }
}

function showRotations(count: number) {
  const titles = generateTitles(count);
  console.log(`\n🔄 ${count} Title Variations:\n`);
  titles.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
  console.log();
}

function showStatus() {
  const logs = getDb()
    .prepare(
      "SELECT * FROM post_logs ORDER BY posted_at DESC LIMIT 20"
    )
    .all() as Array<{
    id: number;
    post_id: number;
    title_used: string;
    posted_at: string;
    status: string;
    category: string;
    location: string;
  }>;

  if (logs.length === 0) {
    console.log("No posting history yet.");
    return;
  }

  console.log("\n📊 Recent Posts:\n");
  for (const l of logs) {
    const icon = l.status === "posted" ? "✅" : l.status === "pending" ? "⏳" : "❌";
    console.log(`  ${icon} [${l.posted_at}] ${l.title_used}`);
    console.log(`     ${l.category} — ${l.location}`);
    console.log();
  }
}

async function main() {
  // Initialize DB
  getDb();

  switch (command) {
    case "list":
      await listPosts();
      break;
    case "post":
      const id = parseInt(args[1]);
      if (isNaN(id)) {
        console.error("Usage: cl-post post <id>");
        process.exit(1);
      }
      await postById(id);
      break;
    case "rotate":
      showRotations(parseInt(args[1]) || 10);
      break;
    case "status":
      showStatus();
      break;
    case "cooldown": {
      const posts = getAllPosts();
      console.log("\n⏱️  Category Cooldowns:\n");
      for (const p of posts) {
        const cd = canPostToCategory(p.category, p.location);
        const icon = cd.allowed ? "✅" : "⏳";
        console.log(`  ${icon} ${p.category} / ${p.location}: ${cd.allowed ? "Ready" : `Wait until ${cd.nextPostAt}`}`);
      }
      console.log();
      break;
    }
    default:
      help();
  }
}

main().catch(console.error);
