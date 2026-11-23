export const siteConfig = {
  email: "satyaku246@gmail.com",
  whatsapp: "918934856824",
  responseTime: "Reply timing is agreed during your initial conversation.",
  inquiryEndpoint: "",
  currency: "NPR",
  prices: { Starter: 5000, Growth: 8000, Premium: 10000 },
};

export function contactChannels(config: Pick<typeof siteConfig, "email" | "whatsapp">) {
  return {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email) ? `mailto:${config.email}` : null,
    whatsapp: /^\d{11,15}$/.test(config.whatsapp) ? `https://wa.me/${config.whatsapp}` : null,
  };
}
