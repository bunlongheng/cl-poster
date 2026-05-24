import { NextResponse } from "next/server";
import { getPost, canPostToCategory, addPostLog } from "@/lib/db";
import { rotateContent } from "@/lib/rotator";

export async function POST(req: Request) {
  const { postId } = await req.json();
  const post = getPost(postId);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  // Check cooldown
  const cooldown = canPostToCategory(post.category, post.location);
  if (!cooldown.allowed) {
    return NextResponse.json(
      { error: `Too soon. Next post allowed at ${cooldown.nextPostAt}` },
      { status: 429 }
    );
  }

  // Rotate content
  const { title, description } = rotateContent(post.title, post.description);

  // Log the post (actual posting happens via CLI/Playwright)
  const log = addPostLog({
    post_id: post.id,
    title_used: title,
    description_used: description,
    category: post.category,
    location: post.location,
    status: "pending",
    cl_url: "",
  });

  return NextResponse.json({
    log,
    message: "Post queued. Run CLI to submit: npx ts-node cli/post.ts",
    command: `npx ts-node cli/post.ts --id ${log.id}`,
  });
}
