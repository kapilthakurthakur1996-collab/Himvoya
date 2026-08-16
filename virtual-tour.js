/* =========================================================
   HIMVOYA — VIRTUAL TOUR FEATURE (UPGRADED)
   Shows a real video + interactive map + AI-generated
   realistic destination visuals, so travellers can explore
   before they visit.

   NEW IN THIS VERSION:
   - AI-generated realistic image carousel per destination
     (fetched from a Vercel serverless function that calls
     an image-generation API — see /api/generate-tour-image)
   - Loading + error states so the tour never breaks if the
     AI image call fails or is slow
   - Easy-to-extend tourData structure (add a destination by
     copying one block)
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     TOUR DATA — one entry per destination.
     To add a new destination later, just copy a block below
     and change the video ID, map location, and prompt.
     ========================================================= */
  const tourData = {
    chamba: {
      video: "IIORsROW9Hk",
      map: "Chamba, Himachal Pradesh, India",
      aiPrompt:
        "Ultra-realistic photograph of Chamba, Himachal Pradesh — Himalayan valley town, temples, river, golden hour light, 8k travel photography"
    },
    manali: {
      video: "7aJ7So4sI7U",
      map: "Manali, Himachal Pradesh, India",
      aiPrompt:
        "Ultra-realistic photograph of Manali, Himachal Pradesh — snow-capped peaks, pine forest, Beas river, dramatic natural light, 8k travel photography"
    },
    "spiti valley": {
      video: "1Dkp6ZLH1cA",
      map: "Spiti Valley, Himachal Pradesh, India",
      aiPrompt:
        "Ultra-realistic photograph of Spiti Valley — high-altitude cold desert, monasteries, rugged mountains, dramatic sky, 8k travel photography"
    },
    spiti: {
      video: "1Dkp6ZLH1cA",
      map: "Spiti Valley, Himachal Pradesh, India",
      aiPrompt:
        "Ultra-realistic photograph of Spiti Valley — high-altitude cold desert, monasteries, rugged mountains, dramatic sky, 8k travel photography"
    }
  };

  const tourButton = document.querySelector("#virtualTourButton");
  const tourSection = document.querySelector("#virtualTourSection");
  const tourVideoFrame = document.querySelector("#tourVideoFrame");
  const tourMapFrame = document.querySelector("#tourMapFrame");
  const destinationTitle = document.querySelector("#destinationTitle");

  // Gallery elements (add these to your HTML — see notes below)
  const tourGallery = document.querySelector("#tourGallery");

  // If the core button/section aren't on the page yet, do nothing.
  if (!tourButton || !tourSection) {
    return;
  }

  /* =========================================================
     AI IMAGE FETCH
     Calls your own Vercel serverless function so the API key
     never sits in frontend code. The function should return
     JSON like: { images: ["https://...jpg", "https://...jpg"] }
     ========================================================= */
  async function fetchAIImages(prompt) {
    try {
      const res = await fetch("/api/generate-tour-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, count: 3 })
      });

      if (!res.ok) throw new Error("AI image request failed");

      const data = await res.json();
      return Array.isArray(data.images) ? data.images : [];
    } catch (err) {
      console.warn("Virtual tour: AI image fetch failed:", err);
      return [];
    }
  }

  function renderGallery(images, destinationName) {
    if (!tourGallery) return;

    if (images.length === 0) {
      tourGallery.innerHTML =
        `<p class="tour-gallery-empty">Visuals for ${destinationName} coming soon.</p>`;
      return;
    }

    tourGallery.innerHTML = images
      .map(
        (url) =>
          `<img src="${url}" alt="AI-generated view of ${destinationName}" class="tour-gallery-img" loading="lazy" />`
      )
      .join("");
  }

  function renderGalleryLoading() {
    if (!tourGallery) return;
    tourGallery.innerHTML =
      `<p class="tour-gallery-loading">Generating realistic views…</p>`;
  }

  /* =========================================================
     OPEN TOUR
     ========================================================= */
  tourButton.addEventListener("click", async () => {
    const name =
      (destinationTitle?.textContent || "").trim().toLowerCase();
    const data = tourData[name] || tourData["chamba"];

    if (tourVideoFrame) {
      tourVideoFrame.src =
        `https://www.youtube.com/embed/${data.video}?rel=0`;
    }

    if (tourMapFrame) {
      tourMapFrame.src =
        `https://www.google.com/maps?q=${encodeURIComponent(data.map)}&output=embed`;
    }

    tourSection.classList.add("active");
    tourSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    // Kick off AI image generation without blocking the video/map
    renderGalleryLoading();
    const images = await fetchAIImages(data.aiPrompt);
    renderGallery(images, name || "chamba");
  });

  /* =========================================================
     STOP TOUR WHEN THE DESTINATION MODAL CLOSES
     (prevents the video from playing in the background)
     ========================================================= */
  function stopTour() {
    if (tourVideoFrame) {
      tourVideoFrame.src = "";
    }
    if (tourMapFrame) {
      tourMapFrame.src = "";
    }
    if (tourGallery) {
      tourGallery.innerHTML = "";
    }
    tourSection.classList.remove("active");
  }

  document
    .querySelector(".destination-close")
    ?.addEventListener("click", stopTour);

  document
    .querySelector("#destinationExperienceBackdrop")
    ?.addEventListener("click", stopTour);
});
