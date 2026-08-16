/* =========================================================
   /api/generate-tour-image.js
   Vercel Serverless Function — FREE VERSION (Unsplash)

   Fetches real, high-quality destination photos from Unsplash
   instead of AI-generating them. No billing/credit card needed —
   Unsplash's free tier gives 50 requests/hour, which is plenty
   for a travel site.

   This keeps the SAME function name and response shape
   ({ images: [...] }) as the OpenAI version, so virtual-tour.js
   does not need to change at all.

   SETUP:
   1. Go to https://unsplash.com/developers
   2. Sign up (free) → "Your apps" → "New Application"
   3. Copy the "Access Key"
   4. In Vercel → Project → Settings → Environment Variables,
      add: UNSPLASH_ACCESS_KEY = your access key
   5. Deploy. This file must live at /api/generate-tour-image.js
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

  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (!accessKey) {
    return res.status(500).json({
      error: "Server is missing UNSPLASH_ACCESS_KEY. Add it in Vercel project settings."
    });
  }

  try {
    const searchUrl =
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(prompt)}` +
      `&per_page=${count}&orientation=landscape`;

    const response = await fetch(searchUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Unsplash API error:", errText);
      return res.status(502).json({ error: "Image fetch failed upstream" });
    }

    const data = await response.json();
    const images = (data.results || [])
      .map((item) => item.urls?.regular)
      .filter(Boolean);

    return res.status(200).json({ images });
  } catch (err) {
    console.error("generate-tour-image error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
