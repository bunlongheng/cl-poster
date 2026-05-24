import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db", () => ({
  getPost: vi.fn(),
  updatePost: vi.fn(),
  deletePost: vi.fn(),
  getPostLogs: vi.fn(),
}));

import { GET, PUT, DELETE } from "@/app/api/posts/[id]/route";
import * as dbModule from "@/lib/db";

const db = vi.mocked(dbModule);

function ctx(id: string) {
  return { params: Promise.resolve({ id }) };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/posts/[id]", () => {
  it("returns { post, logs } when the post exists", async () => {
    const post = { id: 1, title: "A" };
    const logs = [{ id: 9 }];
    db.getPost.mockReturnValue(post as never);
    db.getPostLogs.mockReturnValue(logs as never);

    const res = await GET(new Request("http://localhost"), ctx("1"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.post).toEqual(post);
    expect(json.logs).toEqual(logs);
    expect(db.getPostLogs).toHaveBeenCalledWith(1);
  });

  it("returns 404 when the post is missing", async () => {
    db.getPost.mockReturnValue(undefined as never);
    const res = await GET(new Request("http://localhost"), ctx("999"));
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error).toBe("Not found");
  });
});

describe("PUT /api/posts/[id]", () => {
  it("updates and returns the post", async () => {
    const updated = { id: 1, title: "Updated" };
    db.updatePost.mockReturnValue(updated as never);

    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ title: "Updated" }),
    });
    const res = await PUT(req, ctx("1"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual(updated);
    expect(db.updatePost).toHaveBeenCalledWith(1, { title: "Updated" });
  });

  it("returns 404 when updating a missing post", async () => {
    db.updatePost.mockReturnValue(undefined as never);
    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ title: "x" }),
    });
    const res = await PUT(req, ctx("999"));
    expect(res.status).toBe(404);
  });
});

describe("DELETE /api/posts/[id]", () => {
  it("deletes the post and returns { ok: true }", async () => {
    const res = await DELETE(new Request("http://localhost"), ctx("3"));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toEqual({ ok: true });
    expect(db.deletePost).toHaveBeenCalledWith(3);
  });
});
