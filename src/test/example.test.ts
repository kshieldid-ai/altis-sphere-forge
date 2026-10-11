import { describe, it, expect } from "vitest";
import { blogPosts, getPostBySlug } from "@/data/blog";

describe("blog data", () => {
  it("exports at least one post", () => {
    expect(blogPosts.length).toBeGreaterThan(0);
  });

  it("each post has a unique slug", () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getPostBySlug returns the matching post", () => {
    const first = blogPosts[0];
    expect(getPostBySlug(first.slug)?.title).toBe(first.title);
  });

  it("getPostBySlug returns undefined for unknown slug", () => {
    expect(getPostBySlug("slug-inexistant")).toBeUndefined();
  });
});
