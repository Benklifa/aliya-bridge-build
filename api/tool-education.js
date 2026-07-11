// Vercel serverless proxy for the Learning Tools page (src/pages/Tools.tsx).
// Holds ANTHROPIC_API_KEY server-side so it is never exposed to the browser.

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MAX_TOKENS_CAP = 2000;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is not configured" });
  }

  const { model, max_tokens, system, messages } = req.body || {};
  if (!model || !system || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid request body" });
  }

  try {
    const upstream = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      // Forward only the fields the tools page sends, with a hard cap on
      // max_tokens so the public endpoint can't be used for large generations.
      body: JSON.stringify({
        model,
        max_tokens: Math.min(Number(max_tokens) || 1000, MAX_TOKENS_CAP),
        system,
        messages,
      }),
    });

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (error) {
    console.error("Anthropic proxy error:", error);
    return res.status(502).json({ error: "Upstream request failed" });
  }
}
