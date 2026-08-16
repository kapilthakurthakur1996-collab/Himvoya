/* =========================================================
   /api/generate-tour-image.js
   Vercel Serverless Function

   Generates AI images for a destination and returns their
   URLs to the frontend (virtual-tour.js calls this).

   IMPORTANT — READ BEFORE DEPLOYING:
   Anthropic's Claude API does not generate images — it only
   understands text/images as input. To actually GENERATE
   realistic destination images, this function calls an
   image-generation API. This example uses OpenAI's image
   API (DALL·E) since it's the most common and easy to set
   up, but you can swap the fetch call below for Stability AI,
   Google Imagen, or any other image-gen provider — the rest
   of your site (chatbot, virtual-tour.js) doesn't need to
   change either way.

   SETUP:
   1. Get an API key from https://platform.openai.com/api-keys
   2. In Vercel → Project → Settings → Environment Variables,
      add: OPENAI_API_KEY = your key
   3. Deploy. This file must live at /api/generate-tour-image.js
      in your repo root for Vercel to pick it up automatically.
   ========================================================= */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt, count = 3 } = req.body || {};

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Missing 'prompt' in request body" });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Server is missing OPENAI_API_KEY. Add it in Vercel project settings."
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt,
        n: 1, // dall-e-3 only supports n=1 per request
        size: "1024x1024"
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Image API error:", errText);
      return res.status(502).json({ error: "Image generation failed upstream" });
    }

    const data = await response.json();
    const images = (data.data || []).map((item) => item.url).filter(Boolean);

    return res.status(200).json({ images });
  } catch (err) {
    console.error("generate-tour-image error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
