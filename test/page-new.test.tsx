import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

import NewPost from "@/app/posts/new/page";

const fetchMock = vi.fn();

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
  pushMock.mockReset();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("NewPost page", () => {
  it("renders the form with title, description and the Auto-Generate button", () => {
    render(<NewPost />);
    expect(screen.getByText("New Post Template")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your CL post title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Your CL post body")).toBeInTheDocument();
    expect(screen.getByText("Auto-Generate")).toBeInTheDocument();
    // Defaults
    expect(screen.getByPlaceholderText("springfield")).toHaveValue("springfield");
  });

  it("Auto-Generate fills the title and description fields", async () => {
    const user = userEvent.setup();
    render(<NewPost />);
    const titleInput = screen.getByPlaceholderText("Your CL post title") as HTMLInputElement;
    const descInput = screen.getByPlaceholderText("Your CL post body") as HTMLTextAreaElement;
    expect(titleInput.value).toBe("");

    await user.click(screen.getByText("Auto-Generate"));
    expect(titleInput.value).toContain("Full-Stack Web Developer");
    expect(descInput.value.length).toBeGreaterThan(50);
  });

  it("submitting the form POSTs to /api/posts and routes home on success", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ id: 1 }) });
    const user = userEvent.setup();
    render(<NewPost />);

    await user.type(screen.getByPlaceholderText("Your CL post title"), "My Title");
    await user.type(screen.getByPlaceholderText("Your CL post body"), "My Body");
    await user.click(screen.getByText("Save Template"));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        "/api/posts",
        expect.objectContaining({ method: "POST" })
      )
    );
    // body carries the typed title/description
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.title).toBe("My Title");
    expect(body.description).toBe("My Body");

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/"));
  });

  it("does not route home when the POST fails", async () => {
    fetchMock.mockResolvedValue({ ok: false, json: async () => ({}) });
    const user = userEvent.setup();
    render(<NewPost />);
    await user.type(screen.getByPlaceholderText("Your CL post title"), "T");
    await user.type(screen.getByPlaceholderText("Your CL post body"), "B");
    await user.click(screen.getByText("Save Template"));
    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    expect(pushMock).not.toHaveBeenCalled();
  });

  it("Cancel button routes home without posting", async () => {
    const user = userEvent.setup();
    render(<NewPost />);
    await user.click(screen.getByText("Cancel"));
    expect(pushMock).toHaveBeenCalledWith("/");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("updates category, subcategory, location, email and price fields", async () => {
    const user = userEvent.setup();
    render(<NewPost />);
    const location = screen.getByPlaceholderText("springfield") as HTMLInputElement;
    await user.clear(location);
    await user.type(location, "boston");
    expect(location.value).toBe("boston");

    const email = screen.getByPlaceholderText("your@email.com") as HTMLInputElement;
    await user.type(email, "me@x.com");
    expect(email.value).toBe("me@x.com");

    // Category + subcategory selects (cover their onChange handlers).
    const selects = screen.getAllByRole("combobox") as HTMLSelectElement[];
    await user.selectOptions(selects[0], "gigs");
    expect(selects[0].value).toBe("gigs");
    await user.selectOptions(selects[1], "creative");
    expect(selects[1].value).toBe("creative");

    // Price (number input) onChange.
    const price = screen.getByRole("spinbutton") as HTMLInputElement;
    await user.clear(price);
    await user.type(price, "250");
    expect(price.value).toBe("250");
  });

  it("price defaults to 0 when cleared to an empty value", async () => {
    const user = userEvent.setup();
    render(<NewPost />);
    const price = screen.getByRole("spinbutton") as HTMLInputElement;
    await user.clear(price);
    // parseInt("") || 0 -> 0
    expect(price.value).toBe("0");
  });
});
