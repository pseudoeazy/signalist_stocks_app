import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "stocks_app_signalist",
  ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! } },
});
