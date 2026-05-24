import { describe, it, expect } from "vitest";
import {
  generateTitle,
  generateTitles,
  generateDescription,
  rotateContent,
} from "@/lib/rotator";

describe("generateTitle", () => {
  it("returns a non-empty string", () => {
    const title = generateTitle();
    expect(typeof title).toBe("string");
    expect(title.length).toBeGreaterThan(0);
  });

  it("substitutes all placeholders (no literal {emoji}/{skill}/{benefit})", () => {
    for (let i = 0; i < 50; i++) {
      const title = generateTitle();
      expect(title).not.toContain("{emoji}");
      expect(title).not.toContain("{skill}");
      expect(title).not.toContain("{benefit}");
    }
  });
});

describe("generateTitles", () => {
  it("returns the requested count of unique titles", () => {
    const titles = generateTitles(5);
    expect(titles).toHaveLength(5);
    expect(new Set(titles).size).toBe(5);
  });

  it("returns zero titles when count is 0", () => {
    expect(generateTitles(0)).toEqual([]);
  });

  it("can produce a large batch of unique titles", () => {
    const titles = generateTitles(20);
    expect(titles).toHaveLength(20);
    expect(new Set(titles).size).toBe(20);
  });
});

describe("generateDescription", () => {
  it("contains all four expected blocks separated by blank lines", () => {
    const desc = generateDescription();
    const blocks = desc.split("\n\n");
    expect(blocks.length).toBeGreaterThanOrEqual(4);
  });

  it("includes an intro line, a services/why block, and a CTA", () => {
    for (let i = 0; i < 30; i++) {
      const desc = generateDescription();
      // CTA blocks all start with an emoji marker
      expect(desc).toMatch(/[📩📧💬]/);
      // services or why blocks use bullet markers
      expect(desc).toMatch(/[•✔→✓-]/);
    }
  });
});

describe("rotateContent", () => {
  it("passes through custom content when both title and description are provided", () => {
    const result = rotateContent("My Title", "My Description");
    expect(result).toEqual({ title: "My Title", description: "My Description" });
  });

  it("generates content when title is empty", () => {
    const result = rotateContent("", "Some description");
    expect(result.title.length).toBeGreaterThan(0);
    expect(result.description.length).toBeGreaterThan(0);
    // generated, not the passthrough
    expect(result.description).not.toBe("Some description");
  });

  it("generates content when description is empty", () => {
    const result = rotateContent("Some title", "");
    expect(result.title.length).toBeGreaterThan(0);
    expect(result.description.length).toBeGreaterThan(0);
    expect(result.title).not.toBe("Some title");
  });

  it("generates content when both are empty", () => {
    const result = rotateContent("", "");
    expect(result.title.length).toBeGreaterThan(0);
    expect(result.description.length).toBeGreaterThan(0);
  });
});
