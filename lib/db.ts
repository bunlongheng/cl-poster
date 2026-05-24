import Database from "better-sqlite3";
import path from "path";

const DB_PATH = process.env.CL_DB_PATH || path.join(process.cwd(), "cl-poster.db");

let _db: Database.Database | null = null;

export function getDb() {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.pragma("journal_mode = WAL");
    _db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        price INTEGER DEFAULT 0,
        location TEXT DEFAULT '',
        category TEXT DEFAULT 'services',
        subcategory TEXT DEFAULT 'computer',
        email TEXT DEFAULT '',
        images TEXT DEFAULT '[]',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
      );

      CREATE TABLE IF NOT EXISTS post_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER NOT NULL,
        title_used TEXT NOT NULL,
        description_used TEXT NOT NULL,
        category TEXT NOT NULL,
        location TEXT NOT NULL,
        posted_at TEXT DEFAULT (datetime('now')),
        status TEXT DEFAULT 'posted',
        cl_url TEXT DEFAULT '',
        FOREIGN KEY (post_id) REFERENCES posts(id)
      );
    `);
  }
  return _db;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  price: number;
  location: string;
  category: string;
  subcategory: string;
  email: string;
  images: string;
  created_at: string;
  updated_at: string;
}

export interface PostLog {
  id: number;
  post_id: number;
  title_used: string;
  description_used: string;
  category: string;
  location: string;
  posted_at: string;
  status: string;
  cl_url: string;
}

export function getAllPosts(): Post[] {
  return getDb().prepare("SELECT * FROM posts ORDER BY updated_at DESC").all() as Post[];
}

export function getPost(id: number): Post | undefined {
  return getDb().prepare("SELECT * FROM posts WHERE id = ?").get(id) as Post | undefined;
}

export function createPost(post: Omit<Post, "id" | "created_at" | "updated_at">): Post {
  const stmt = getDb().prepare(`
    INSERT INTO posts (title, description, price, location, category, subcategory, email, images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(
    post.title, post.description, post.price, post.location,
    post.category, post.subcategory, post.email, post.images
  );
  return getPost(result.lastInsertRowid as number)!;
}

export function updatePost(id: number, post: Partial<Post>): Post | undefined {
  const fields = Object.keys(post).filter(k => k !== "id" && k !== "created_at");
  if (fields.length === 0) return getPost(id);
  const sets = fields.map(f => `${f} = ?`).join(", ");
  const values = fields.map(f => (post as Record<string, unknown>)[f]);
  getDb().prepare(`UPDATE posts SET ${sets}, updated_at = datetime('now') WHERE id = ?`).run(...values, id);
  return getPost(id);
}

export function deletePost(id: number): void {
  getDb().prepare("DELETE FROM posts WHERE id = ?").run(id);
}

export function getPostLogs(postId?: number): PostLog[] {
  if (postId) {
    return getDb().prepare("SELECT * FROM post_logs WHERE post_id = ? ORDER BY posted_at DESC").all(postId) as PostLog[];
  }
  return getDb().prepare("SELECT * FROM post_logs ORDER BY posted_at DESC LIMIT 50").all() as PostLog[];
}

export function addPostLog(log: Omit<PostLog, "id" | "posted_at">): PostLog {
  const stmt = getDb().prepare(`
    INSERT INTO post_logs (post_id, title_used, description_used, category, location, status, cl_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(log.post_id, log.title_used, log.description_used, log.category, log.location, log.status, log.cl_url);
  return getDb().prepare("SELECT * FROM post_logs WHERE id = ?").get(result.lastInsertRowid) as PostLog;
}

export function canPostToCategory(category: string, location: string): { allowed: boolean; nextPostAt?: string } {
  const recent = getDb().prepare(`
    SELECT posted_at FROM post_logs
    WHERE category = ? AND location = ? AND status = 'posted'
    ORDER BY posted_at DESC LIMIT 1
  `).get(category, location) as { posted_at: string } | undefined;

  if (!recent) return { allowed: true };

  const lastPost = new Date(recent.posted_at + "Z");
  const cooldown = 48 * 60 * 60 * 1000; // 48 hours
  const nextPost = new Date(lastPost.getTime() + cooldown);

  if (Date.now() >= nextPost.getTime()) return { allowed: true };

  return { allowed: false, nextPostAt: nextPost.toISOString() };
}
