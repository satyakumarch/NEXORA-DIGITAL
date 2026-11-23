import { describe, it, expect } from "vitest";
import { siteConfig, contactChannels } from "@/lib/site-config";
import { canSubmitInquiry, inquirySchema } from "@/lib/inquiry";
describe("Supplied business rules", () => {
  it("Starter starts at 5000", () => expect(siteConfig.prices.Starter).toBe(5000));
  it("Growth starts at 8000", () => expect(siteConfig.prices.Growth).toBe(8000));
  it("Premium starts at 10000", () => expect(siteConfig.prices.Premium).toBe(10000));
  it("uses the confirmed email address", () =>
    expect(contactChannels(siteConfig).email).toBe("mailto:satyaku246@gmail.com"));
  it("uses the confirmed Indian WhatsApp number", () =>
    expect(contactChannels(siteConfig).whatsapp).toBe("https://wa.me/918934856824"));
  it("does not allow an unconfigured submission", () => expect(canSubmitInquiry("")).toBe(false));
  it("allows a configured secure submission endpoint", () =>
    expect(canSubmitInquiry("https://example.com/inquiries")).toBe(true));
  it("validates inquiry inputs before submission", () => {
    const data = {
      name: "Test Person",
      email: "test@example.com",
      company: "Test Business",
      country: "Nepal",
      service: "Website Development",
      budget: "Starter",
      description: "A website for our education business.",
    };
    expect(inquirySchema.safeParse(data).success).toBe(true);
    expect(inquirySchema.safeParse({ ...data, email: "not-an-email" }).success).toBe(false);
  });
});
