import { describe, expect, it } from "vitest";
import { newsletterSchema } from "@/lib/newsletter";

describe("Newsletter signup", () => {
  it("requires explicit consent", () => {
    expect(newsletterSchema.safeParse({ email: "reader@example.com", consent: false }).success).toBe(false);
    expect(newsletterSchema.safeParse({ email: "reader@example.com", consent: true }).success).toBe(true);
  });
  it("validates and normalizes email addresses", () => {
    expect(newsletterSchema.parse({ email: " Reader@Example.com ", consent: true }).email).toBe("reader@example.com");
    expect(newsletterSchema.safeParse({ email: "invalid", consent: true }).success).toBe(false);
  });
});