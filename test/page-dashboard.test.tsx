import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// next/link renders an <a>; keep it as-is per the brief (no router needed here).
import Dashboard from "@/app/page";

interface MockPost {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  location: string;
  email: string;
  images: string;
  created_at: string;
}

function makePosts(n: number): MockPost[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    title: `Post ${i + 1}`,
    description: `Body ${i + 1}`,
    category: "services",
    subcategory: "computer",
    location: "springfield",
    email: "",
    images: "[]",
    created_at: "2026-01-01 00:00:00",
  }));
}

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
  // default: GET /api/posts returns 25 posts, no logs
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({ posts: makePosts(25), logs: [] }),
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("Dashboard", () => {
  it("shows the loading spinner before data resolves", () => {
    // Never-resolving fetch to keep loading state.
    fetchMock.mockReturnValue(new Promise(() => {}));
    render(<Dashboard />);
    expect(screen.getByText("Loading posts...")).toBeInTheDocument();
  });

  it("renders posts after fetch resolves", async () => {
    render(<Dashboard />);
    // 10 posts show per week; the template count is always rendered in the header.
    await waitFor(() => expect(screen.getByText(/25 templates/)).toBeInTheDocument());
    // The weekly view shows at most 10 posts (a date-dependent slice).
    const visible = screen.getAllByText("Copy").length;
    expect(visible).toBeGreaterThan(0);
    expect(visible).toBeLessThanOrEqual(10);
  });

  // Helper: switch to the "All" view so post ordering is deterministic
  // (the weekly view shows a date-dependent slice).
  async function showAllPosts(user: ReturnType<typeof userEvent.setup>) {
    await waitFor(() => screen.getByText("All"));
    await user.click(screen.getByText("All"));
    await waitFor(() => expect(screen.getByText("Post 1")).toBeInTheDocument());
  }

  it("shows 10 posts per week, not all 25", async () => {
    render(<Dashboard />);
    await waitFor(() => expect(screen.getByText("This Week")).toBeInTheDocument());
    // Week label format "Week X / Y"
    expect(screen.getByText(/Week \d+ \/ 3/)).toBeInTheDocument();
  });

  it("All toggle reveals all 25 posts", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    await waitFor(() => screen.getByText("All"));
    await user.click(screen.getByText("All"));
    await waitFor(() => expect(screen.getByText("All 25 posts")).toBeInTheDocument());
    expect(screen.getByText("Post 25")).toBeInTheDocument();
  });

  it("week navigation arrows change the displayed week", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    await waitFor(() => screen.getByText(/Week \d+ \/ 3/));
    const initial = screen.getByText(/Week \d+ \/ 3/).textContent;
    await user.click(screen.getByText("→")); // right arrow
    await waitFor(() => {
      const next = screen.getByText(/Week \d+ \/ 3/).textContent;
      expect(next).not.toBe(initial);
    });
    // left arrow returns to a different/previous week
    await user.click(screen.getByText("←"));
    await waitFor(() => expect(screen.getByText(/Week \d+ \/ 3/)).toBeInTheDocument());
  });

  it("This Week button resets the view to the current week", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    await waitFor(() => screen.getByText("All"));
    // Go to All, then back to This Week.
    await user.click(screen.getByText("All"));
    await waitFor(() => screen.getByText("All 25 posts"));
    await user.click(screen.getByText("This Week"));
    await waitFor(() => expect(screen.getByText(/Week \d+ \/ 3/)).toBeInTheDocument());
  });

  it("renders a thumbnail when a post has images", async () => {
    const posts = makePosts(3).map((p) => ({ ...p, images: '["/posts/post-1.jpg"]' }));
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ posts, logs: [] }) });
    const user = userEvent.setup();
    render(<Dashboard />);
    await waitFor(() => screen.getByText("All"));
    await user.click(screen.getByText("All"));
    await waitFor(() => screen.getByText("Post 1"));
    const imgs = document.querySelectorAll('img[src="/posts/post-1.jpg"]');
    expect(imgs.length).toBeGreaterThan(0);
  });

  it("applies and removes hover background on a post row", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    await showAllPosts(user);
    const row = screen.getByText("Post 1").closest("div.animate-slide-in") as HTMLElement;
    fireEvent.mouseEnter(row);
    expect(row.style.background).toBe("var(--muted-light)");
    fireEvent.mouseLeave(row);
    expect(row.style.background).toBe("transparent");
  });

  it("Copy button writes title+description to the clipboard", async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    await showAllPosts(user);
    // Override clipboard AFTER userEvent.setup (which installs its own stub),
    // and use fireEvent so userEvent doesn't reset it mid-click.
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    const copyButtons = screen.getAllByText("Copy");
    fireEvent.click(copyButtons[0]);
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("Post 1\n\nBody 1"));
    await waitFor(() => expect(screen.getAllByText("Copied!").length).toBeGreaterThan(0));
  });

  it("Post button calls /api/post-now and alerts the CLI command", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    // First GET resolves posts; the post-now POST then a re-GET for logs.
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => ({ posts: makePosts(25), logs: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ command: "npx ts-node cli/post.ts --id 1" }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ logs: [{ id: 1, post_id: 1, title_used: "x", posted_at: "2026-01-01 00:00:00", status: "pending", category: "services", location: "springfield" }] }) });

    const user = userEvent.setup();
    render(<Dashboard />);
    await showAllPosts(user);
    const postButtons = screen.getAllByText("Post");
    await user.click(postButtons[0]);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/post-now",
        expect.objectContaining({ method: "POST" })
      );
    });
    await waitFor(() => expect(alertMock).toHaveBeenCalledWith(expect.stringContaining("npx ts-node cli/post.ts --id 1")));
  });

  it("Post button alerts the error when the API returns non-ok", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => ({ posts: makePosts(25), logs: [] }) })
      .mockResolvedValueOnce({ ok: false, json: async () => ({ error: "Too soon" }) });

    const user = userEvent.setup();
    render(<Dashboard />);
    await showAllPosts(user);
    await user.click(screen.getAllByText("Post")[0]);
    await waitFor(() => expect(alertMock).toHaveBeenCalledWith("Too soon"));
  });

  it("Delete confirms then DELETEs and removes the post from the list", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(true);
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => ({ posts: makePosts(25), logs: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ ok: true }) });

    const user = userEvent.setup();
    render(<Dashboard />);
    await showAllPosts(user);
    // The delete buttons render the × glyph.
    const deleteButtons = screen.getAllByText("×");
    await user.click(deleteButtons[0]);

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith("/api/posts/1", { method: "DELETE" })
    );
    await waitFor(() => expect(screen.queryByText("Post 1")).not.toBeInTheDocument());
  });

  it("Delete does nothing when the user cancels the confirm dialog", async () => {
    vi.spyOn(window, "confirm").mockReturnValue(false);
    const user = userEvent.setup();
    render(<Dashboard />);
    await showAllPosts(user);
    fetchMock.mockClear();
    await user.click(screen.getAllByText("×")[0]);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText("Post 1")).toBeInTheDocument();
  });

  it("renders the empty state when there are no posts", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ posts: [], logs: [] }) });
    render(<Dashboard />);
    await waitFor(() => expect(screen.getByText("No templates yet")).toBeInTheDocument());
  });
});
