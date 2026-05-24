import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = vi.fn();
// editParam is mutated per-test to toggle between view and edit modes.
let editParam = "false";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useParams: () => ({ id: "1" }),
  useSearchParams: () => ({ get: (k: string) => (k === "edit" ? editParam : null) }),
}));

import PostPage from "@/app/posts/[id]/page";

const fetchMock = vi.fn();

const post = {
  id: 1,
  title: "Detail Title",
  description: "Detail Body",
  price: 100,
  location: "boston",
  category: "services",
  subcategory: "computer",
  email: "me@x.com",
  images: "[]",
};

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
  pushMock.mockReset();
  editParam = "false";
  // Default initial load: GET /api/posts/1
  fetchMock.mockResolvedValue({
    ok: true,
    json: async () => ({ post, logs: [] }),
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("PostPage - view mode", () => {
  it("shows the loading spinner until the post resolves", () => {
    fetchMock.mockReturnValue(new Promise(() => {}));
    const { container } = render(<PostPage />);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("renders the post title, body and metadata after fetch", async () => {
    render(<PostPage />);
    await waitFor(() => expect(screen.getByText("Detail Title")).toBeInTheDocument());
    expect(screen.getByText("Detail Body")).toBeInTheDocument();
    expect(screen.getByText("services")).toBeInTheDocument();
    expect(screen.getByText("boston")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();
  });

  it("Copy button copies title+description", async () => {
    render(<PostPage />);
    await waitFor(() => screen.getByText("Detail Title"));
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
    fireEvent.click(screen.getByText("Copy"));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith("Detail Title\n\nDetail Body"));
    await waitFor(() => expect(screen.getByText("Copied!")).toBeInTheDocument());
  });

  it("Post to CL button posts and alerts the CLI command", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => ({ post, logs: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ command: "npx ts-node cli/post.ts --id 9" }) });

    const user = userEvent.setup();
    render(<PostPage />);
    await waitFor(() => screen.getByText("Detail Title"));
    await user.click(screen.getByText("Post to CL"));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith("/api/post-now", expect.objectContaining({ method: "POST" }))
    );
    await waitFor(() => expect(alertMock).toHaveBeenCalledWith(expect.stringContaining("--id 9")));
  });

  it("Post to CL alerts the error on a non-ok response", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => ({ post, logs: [] }) })
      .mockResolvedValueOnce({ ok: false, json: async () => ({ error: "Too soon" }) });

    const user = userEvent.setup();
    render(<PostPage />);
    await waitFor(() => screen.getByText("Detail Title"));
    await user.click(screen.getByText("Post to CL"));
    await waitFor(() => expect(alertMock).toHaveBeenCalledWith("Too soon"));
  });

  it("renders post history when logs are present", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        post,
        logs: [{ id: 5, title_used: "Historic Title", posted_at: "2026-01-01 00:00:00", status: "posted" }],
      }),
    });
    render(<PostPage />);
    await waitFor(() => expect(screen.getByText("Post History")).toBeInTheDocument());
    expect(screen.getByText("Historic Title")).toBeInTheDocument();
  });
});

describe("PostPage - edit mode", () => {
  it("renders the edit form pre-filled with the post values", async () => {
    editParam = "true";
    render(<PostPage />);
    await waitFor(() => expect(screen.getByText("Editing Post #1")).toBeInTheDocument());
    expect(screen.getByDisplayValue("Detail Title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Detail Body")).toBeInTheDocument();
  });

  it("saving PUTs the edited fields and routes back to the post", async () => {
    editParam = "true";
    fetchMock
      .mockResolvedValueOnce({ ok: true, json: async () => ({ post, logs: [] }) })
      .mockResolvedValueOnce({ ok: true, json: async () => ({ ...post, title: "Edited Title" }) });

    const user = userEvent.setup();
    render(<PostPage />);
    await waitFor(() => screen.getByDisplayValue("Detail Title"));

    const titleInput = screen.getByDisplayValue("Detail Title");
    await user.clear(titleInput);
    await user.type(titleInput, "Edited Title");
    // Also edit the description textarea to cover its onChange handler.
    const descInput = screen.getByDisplayValue("Detail Body");
    await user.clear(descInput);
    await user.type(descInput, "Edited Body");
    await user.click(screen.getByText("Save Changes"));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith("/api/posts/1", expect.objectContaining({ method: "PUT" }))
    );
    const putCall = fetchMock.mock.calls.find((c) => c[1]?.method === "PUT")!;
    const body = JSON.parse(putCall[1].body);
    expect(body.title).toBe("Edited Title");

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/posts/1"));
  });

  it("Cancel in edit mode routes back to the post view", async () => {
    editParam = "true";
    const user = userEvent.setup();
    render(<PostPage />);
    await waitFor(() => screen.getByText("Editing Post #1"));
    // The form Cancel button (button, not the nav link).
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(pushMock).toHaveBeenCalledWith("/posts/1");
  });

  it("edits location, email, category, subcategory and price fields", async () => {
    editParam = "true";
    const user = userEvent.setup();
    render(<PostPage />);
    await waitFor(() => screen.getByDisplayValue("Detail Title"));

    const location = screen.getByDisplayValue("boston") as HTMLInputElement;
    await user.clear(location);
    await user.type(location, "denver");
    expect(location.value).toBe("denver");

    const email = screen.getByDisplayValue("me@x.com") as HTMLInputElement;
    await user.clear(email);
    await user.type(email, "new@x.com");
    expect(email.value).toBe("new@x.com");

    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    await user.selectOptions(selects[0], "jobs");
    expect(selects[0].value).toBe("jobs");
    await user.selectOptions(selects[1], "web");
    expect(selects[1].value).toBe("web");

    const price = screen.getByRole("spinbutton") as HTMLInputElement;
    await user.clear(price);
    await user.type(price, "75");
    expect(price.value).toBe("75");
  });

  it("renders the post image when images JSON has an entry", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ post: { ...post, images: '["/posts/post-1.jpg"]' }, logs: [] }),
    });
    render(<PostPage />);
    await waitFor(() => screen.getByText("Detail Title"));
    const img = screen.getByAltText("Detail Title") as HTMLImageElement;
    expect(img.getAttribute("src")).toBe("/posts/post-1.jpg");
  });
});
