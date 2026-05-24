import { describe, it, expect, beforeAll, afterAll } from "vitest";
import os from "os";
import path from "path";
import fs from "fs";

// Point the db module at a fresh temp database BEFORE importing it.
const TMP_DB = path.join(os.tmpdir(), `cl-poster-test-${process.pid}-${Date.now()}.db`);
process.env.CL_DB_PATH = TMP_DB;

// Dynamically imported after env var is set.
type DbModule = typeof import("@/lib/db");
let db: DbModule;

beforeAll(async () => {
  db = await import("@/lib/db");
});

afterAll(() => {
  // Close handles and remove the temp db files (incl. WAL/SHM sidecars).
  for (const suffix of ["", "-wal", "-shm"]) {
    const f = TMP_DB + suffix;
    if (fs.existsSync(f)) fs.rmSync(f);
  }
});

function makePost(overrides: Partial<Parameters<DbModule["createPost"]>[0]> = {}) {
  return {
    title: "Test Title",
    description: "Test Description",
    price: 0,
    location: "springfield",
    category: "services",
    subcategory: "computer",
    email: "test@example.com",
    images: "[]",
    ...overrides,
  };
}

describe("posts CRUD", () => {
  it("createPost inserts and returns the row with an id and timestamps", () => {
    const post = db.createPost(makePost({ title: "Created Post" }));
    expect(post.id).toBeGreaterThan(0);
    expect(post.title).toBe("Created Post");
    expect(post.created_at).toBeTruthy();
    expect(post.updated_at).toBeTruthy();
  });

  it("getPost returns the created row", () => {
    const created = db.createPost(makePost({ title: "Fetch Me" }));
    const fetched = db.getPost(created.id);
    expect(fetched).toBeDefined();
    expect(fetched!.title).toBe("Fetch Me");
  });

  it("getPost returns undefined for a missing id", () => {
    expect(db.getPost(999999)).toBeUndefined();
  });

  it("getAllPosts returns all rows", () => {
    const before = db.getAllPosts().length;
    db.createPost(makePost({ title: "A" }));
    db.createPost(makePost({ title: "B" }));
    expect(db.getAllPosts().length).toBe(before + 2);
  });

  it("updatePost changes fields and returns the updated row", () => {
    const created = db.createPost(makePost({ title: "Old" }));
    const updated = db.updatePost(created.id, { title: "New", price: 99 });
    expect(updated!.title).toBe("New");
    expect(updated!.price).toBe(99);
  });

  it("updatePost with no updatable fields returns the existing row", () => {
    const created = db.createPost(makePost({ title: "Unchanged" }));
    const updated = db.updatePost(created.id, { id: created.id });
    expect(updated!.title).toBe("Unchanged");
  });

  it("deletePost removes the row", () => {
    const created = db.createPost(makePost({ title: "Doomed" }));
    db.deletePost(created.id);
    expect(db.getPost(created.id)).toBeUndefined();
  });
});

describe("post logs", () => {
  function makeLog(postId: number, overrides: Partial<Parameters<DbModule["addPostLog"]>[0]> = {}) {
    return {
      post_id: postId,
      title_used: "Logged Title",
      description_used: "Logged Body",
      category: "services",
      location: "springfield",
      status: "posted",
      cl_url: "",
      ...overrides,
    };
  }

  it("addPostLog inserts and returns the log row", () => {
    const post = db.createPost(makePost());
    const log = db.addPostLog(makeLog(post.id));
    expect(log.id).toBeGreaterThan(0);
    expect(log.post_id).toBe(post.id);
    expect(log.title_used).toBe("Logged Title");
    expect(log.posted_at).toBeTruthy();
  });

  it("getPostLogs() returns recent logs (no filter)", () => {
    const before = db.getPostLogs().length;
    const post = db.createPost(makePost());
    db.addPostLog(makeLog(post.id));
    expect(db.getPostLogs().length).toBe(before + 1);
  });

  it("getPostLogs(postId) returns only that post's logs", () => {
    const postA = db.createPost(makePost());
    const postB = db.createPost(makePost());
    db.addPostLog(makeLog(postA.id, { title_used: "A1" }));
    db.addPostLog(makeLog(postA.id, { title_used: "A2" }));
    db.addPostLog(makeLog(postB.id, { title_used: "B1" }));
    const aLogs = db.getPostLogs(postA.id);
    expect(aLogs).toHaveLength(2);
    expect(aLogs.every((l) => l.post_id === postA.id)).toBe(true);
  });
});

describe("canPostToCategory", () => {
  it("allows posting when there are no logs for the category/location", () => {
    const result = db.canPostToCategory("uniquecat", "uniqueloc");
    expect(result.allowed).toBe(true);
    expect(result.nextPostAt).toBeUndefined();
  });

  it("blocks posting within the 48h cooldown and returns nextPostAt", () => {
    const cat = "blockcat";
    const loc = "blockloc";
    // Insert a log timestamped "now" (UTC) directly so cooldown is active.
    const raw = db.getDb();
    raw
      .prepare(
        `INSERT INTO post_logs (post_id, title_used, description_used, category, location, status, cl_url, posted_at)
         VALUES (?, ?, ?, ?, ?, 'posted', '', datetime('now'))`
      )
      .run(1, "t", "d", cat, loc);

    const result = db.canPostToCategory(cat, loc);
    expect(result.allowed).toBe(false);
    expect(result.nextPostAt).toBeTruthy();
    // nextPostAt should be roughly 48h in the future.
    const next = new Date(result.nextPostAt!).getTime();
    expect(next).toBeGreaterThan(Date.now());
  });

  it("allows posting again after the cooldown window has passed", () => {
    const cat = "expiredcat";
    const loc = "expiredloc";
    // Insert a log 49 hours in the past (UTC) -> cooldown expired.
    const raw = db.getDb();
    raw
      .prepare(
        `INSERT INTO post_logs (post_id, title_used, description_used, category, location, status, cl_url, posted_at)
         VALUES (?, ?, ?, ?, ?, 'posted', '', datetime('now', '-49 hours'))`
      )
      .run(1, "t", "d", cat, loc);

    const result = db.canPostToCategory(cat, loc);
    expect(result.allowed).toBe(true);
    expect(result.nextPostAt).toBeUndefined();
  });

  it("ignores logs whose status is not 'posted'", () => {
    const cat = "pendingcat";
    const loc = "pendingloc";
    const raw = db.getDb();
    raw
      .prepare(
        `INSERT INTO post_logs (post_id, title_used, description_used, category, location, status, cl_url, posted_at)
         VALUES (?, ?, ?, ?, ?, 'pending', '', datetime('now'))`
      )
      .run(1, "t", "d", cat, loc);

    const result = db.canPostToCategory(cat, loc);
    expect(result.allowed).toBe(true);
  });
});
