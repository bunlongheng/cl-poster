import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the db layer so route handlers run without touching SQLite.
vi.mock("@/lib/db", () => ({
  getAllPosts: vi.fn(),
  createPost: vi.fn(),
  getPostLogs: vi.fn(),
}));

import { GET, POST } from "@/app/api/posts/route";
import * as dbModule from "@/lib/db";

const db = vi.mocked(dbModule);

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/posts", () => {
  it("returns { posts, logs }", async () => {
    const posts = [{ id: 1, title: "A" }];
    const logs = [{ id: 10, post_id: 1 }];
    db.getAllPosts.mockReturnValue(posts as never);
    db.getPostLogs.mockReturnValue(logs as never);

    const res = await GET();
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.posts).toEqual(posts);
    expect(json.logs).toEqual(logs);
  });
});

describe("POST /api/posts", () => {
  it("creates a post from the request body and returns 201", async () => {
    const created = { id: 5, title: "New Post" };
    db.createPost.mockReturnValue(created as never);

    const req = new Request("http://localhost/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "New Post",
        description: "Body",
        price: 50,
        location: "boston",
        category: "gigs",
        subcategory: "creative",
        email: "me@example.com",
        images: ["a.jpg"],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    const json = await res.json();
    expect(json).toEqual(created);

    expect(db.createPost).toHaveBeenCalledWith({
      title: "New Post",
      description: "Body",
      price: 50,
      location: "boston",
      category: "gigs",
      subcategory: "creative",
      email: "me@example.com",
      images: JSON.stringify(["a.jpg"]),
    });
  });

  it("applies defaults when fields are missing", async () => {
    db.createPost.mockReturnValue({ id: 6 } as never);
    const req = new Request("http://localhost/api/posts", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    expect(db.createPost).toHaveBeenCalledWith({
      title: "",
      description: "",
      price: 0,
      location: "",
      category: "services",
      subcategory: "computer",
      email: "",
      images: "[]",
    });
  });
});
