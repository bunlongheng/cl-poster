import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/lib/db", () => ({
  getPost: vi.fn(),
  canPostToCategory: vi.fn(),
  addPostLog: vi.fn(),
}));

import { POST } from "@/app/api/post-now/route";
import * as dbModule from "@/lib/db";

const db = vi.mocked(dbModule);

function req(body: unknown) {
  return new Request("http://localhost/api/post-now", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/post-now", () => {
  it("returns 404 when the post does not exist", async () => {
    db.getPost.mockReturnValue(undefined as never);
    const res = await POST(req({ postId: 999 }));
    expect(res.status).toBe(404);
    const json = await res.json();
    expect(json.error).toBe("Post not found");
  });

  it("returns 429 when the cooldown blocks posting", async () => {
    db.getPost.mockReturnValue({
      id: 1,
      title: "T",
      description: "D",
      category: "services",
      location: "springfield",
    } as never);
    db.canPostToCategory.mockReturnValue({
      allowed: false,
      nextPostAt: "2030-01-01T00:00:00.000Z",
    } as never);

    const res = await POST(req({ postId: 1 }));
    expect(res.status).toBe(429);
    const json = await res.json();
    expect(json.error).toContain("Too soon");
    expect(json.error).toContain("2030-01-01");
    expect(db.addPostLog).not.toHaveBeenCalled();
  });

  it("logs a pending post and returns the log + CLI command on success", async () => {
    db.getPost.mockReturnValue({
      id: 7,
      title: "Custom Title",
      description: "Custom Body",
      category: "services",
      location: "springfield",
    } as never);
    db.canPostToCategory.mockReturnValue({ allowed: true } as never);
    db.addPostLog.mockReturnValue({ id: 42 } as never);

    const res = await POST(req({ postId: 7 }));
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.log).toEqual({ id: 42 });
    expect(json.command).toBe("npx ts-node cli/post.ts --id 42");
    expect(json.message).toContain("queued");

    // Custom (non-empty) title+description are passed through unchanged.
    expect(db.addPostLog).toHaveBeenCalledWith(
      expect.objectContaining({
        post_id: 7,
        title_used: "Custom Title",
        description_used: "Custom Body",
        category: "services",
        location: "springfield",
        status: "pending",
        cl_url: "",
      })
    );
  });
});
