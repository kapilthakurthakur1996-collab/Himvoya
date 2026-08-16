/* =========================================================
   HIMVOYA — AI VIRTUAL TOUR v2
   ---------------------------------------------------------
   Destination experience:
   • YouTube destination video
   • Google Maps
   • AI-generated realistic visuals
   • Real fallback destination images
   • Gallery lightbox
   • Loading / error states
   • Safe destination matching
   • Video cleanup on close
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const tourData = {

    chamba: {
      name: "Chamba",
      video: "IIORsROW9Hk",
      map: "Chamba, Himachal Pradesh, India",

      prompt:
        "Ultra realistic cinematic travel photography of Chamba Himachal Pradesh India, ancient temples, Ravi river, Himalayan mountains, green valleys, traditional Himachali architecture, natural daylight, authentic Indian travel destination, photorealistic, 8k",

      fallbackImages: [
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85"
      ]
    },

    manali: {
      name: "Manali",
      video: "7aJ7So4sI7U",
      map: "Manali, Himachal Pradesh, India",

      prompt:
        "Ultra realistic cinematic travel photography of Manali Himachal Pradesh India, snow covered Himalayan peaks, pine forests, Beas river, mountain roads, traditional Himachali villages, dramatic natural light, authentic Indian travel destination, photorealistic, 8k",

      fallbackImages: [
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1200&q=85"
      ]
    },

    spiti: {
      name: "Spiti Valley",
      video: "1Dkp6ZLH1cA",
      map: "Spiti Valley, Himachal Pradesh, India",

      prompt:
        "Ultra realistic cinematic travel photography of Spiti Valley Himachal Pradesh India, high altitude cold desert, rugged Himalayan mountains, ancient Buddhist monasteries, remote villages, winding mountain roads, blue sky, dramatic natural light, authentic travel photography, photorealistic, 8k",

      fallbackImages: [
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=85",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85"
      ]
    }

  };


  /* =========================================================
     ELEMENTS
     ========================================================= */

  const tourButton =
    document.querySelector("#virtualTourButton");

  const tourSection =
    document.querySelector("#virtualTourSection");

  const tourVideoFrame =
    document.querySelector("#tourVideoFrame");

  const tourMapFrame =
    document.querySelector("#tourMapFrame");

  const tourGallery =
    document.querySelector("#tourGallery");

  const destinationTitle =
    document.querySelector("#destinationTitle");

  const destinationClose =
    document.querySelector(".destination-close");

  const destinationBackdrop =
    document.querySelector("#destinationExperienceBackdrop");


  if (!tourButton || !tourSection) {
    console.warn("HimVoya Virtual Tour: required elements not found.");
    return;
  }


  /* =========================================================
     DESTINATION DETECTION
     ========================================================= */

  function getCurrentDestination() {

    const title =
      (destinationTitle?.textContent || "")
        .trim()
        .toLowerCase();

    if (title.includes("manali")) {
      return tourData.manali;
    }

    if (title.includes("spiti")) {
      return tourData.spiti;
    }

    return tourData.chamba;
  }


  /* =========================================================
     AI IMAGE GENERATION
     ========================================================= */

  async function fetchAIImages(prompt) {

    try {

      const response = await fetch(
        "/api/generate-tour-image",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            prompt: prompt,
            count: 3
          })
        }
      );


      if (!response.ok) {
        throw new Error(
          `AI image request failed: ${response.status}`
        );
      }


      const data =
        await response.json();


      if (
        !data ||
        !Array.isArray(data.images)
      ) {
        throw new Error("Invalid AI image response.");
      }


      return data.images.filter(Boolean);

    } catch (error) {

      console.warn(
        "HimVoya AI visuals unavailable:",
        error
      );

      return [];

    }

  }


  /* =========================================================
     GALLERY LOADING
     ========================================================= */

  function renderGalleryLoading(destination) {

    if (!tourGallery) return;

    tourGallery.innerHTML = `

      <div class="tour-gallery-status">

        <div class="tour-loader"></div>

        <strong>
          Creating your virtual experience...
        </strong>

        <p>
          HimVoya AI is preparing realistic views of
          ${destination.name}.
        </p>

      </div>

    `;

  }


  /* =========================================================
     GALLERY ERROR / FALLBACK
     ========================================================= */

  function renderGalleryFallback(
    destination
  ) {

    if (!tourGallery) return;

    renderGallery(
      destination.fallbackImages,
      destination.name,
      true
    );

  }


  /* =========================================================
     GALLERY RENDER
     ========================================================= */

  function renderGallery(
    images,
    destinationName,
    fallback = false
  ) {

    if (!tourGallery) return;


    if (!images || !images.length) {

      tourGallery.innerHTML = `

        <div class="tour-gallery-status">

          <strong>
            Visual experience unavailable
          </strong>

          <p>
            Please try the virtual tour again.
          </p>

        </div>

      `;

      return;
    }


    tourGallery.innerHTML = `

      <div class="tour-gallery-header">

        <div>

          <p class="eyebrow dark">
            ${fallback ? "DESTINATION VISUALS" : "AI EXPERIENCE"}
          </p>

          <h4>
            Explore ${destinationName}
          </h4>

        </div>

        ${
          fallback
            ? `<span class="tour-gallery-badge">
                 Destination Preview
               </span>`
            : `<span class="tour-gallery-badge">
                 ✦ AI Generated
               </span>`
        }

      </div>


      <div class="tour-gallery-grid">

        ${images.map((url, index) => `

          <button
            type="button"
            class="tour-gallery-item"
            data-image="${escapeAttribute(url)}"
            aria-label="View ${destinationName} image ${index + 1}"
          >

            <img
              src="${escapeAttribute(url)}"
              alt="${escapeAttribute(destinationName)} Himalayan view"
              loading="lazy"
            />

            <span>
              View
            </span>

          </button>

        `).join("")}

      </div>

    `;


    attachGalleryEvents();

  }


  /* =========================================================
     HTML ATTRIBUTE SAFETY
     ========================================================= */

  function escapeAttribute(value) {

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  }


  /* =========================================================
     IMAGE LIGHTBOX
     ========================================================= */

  function openImageViewer(
    imageUrl,
    destinationName
  ) {

    const existing =
      document.querySelector("#himvoyaImageViewer");

    if (existing) {
      existing.remove();
    }


    const viewer =
      document.createElement("div");

    viewer.id =
      "himvoyaImageViewer";

    viewer.innerHTML = `

      <div class="himvoya-image-viewer-backdrop">

        <button
          type="button"
          class="himvoya-image-close"
          aria-label="Close image"
        >
          ×
        </button>

        <div class="himvoya-image-viewer-content">

          <img
            src="${escapeAttribute(imageUrl)}"
            alt="${escapeAttribute(destinationName)}"
          />

          <p>
            ${escapeAttribute(destinationName)}
          </p>

        </div>

      </div>

    `;


    document.body.appendChild(viewer);


    const close =
      viewer.querySelector(
        ".himvoya-image-close"
      );

    const backdrop =
      viewer.querySelector(
        ".himvoya-image-viewer-backdrop"
      );


    close?.addEventListener(
      "click",
      () => viewer.remove()
    );


    backdrop?.addEventListener(
      "click",
      (event) => {

        if (
          event.target === backdrop
        ) {
          viewer.remove();
        }

      }
    );


    document.addEventListener(
      "keydown",
      function escapeHandler(event) {

        if (event.key === "Escape") {

          viewer.remove();

          document.removeEventListener(
            "keydown",
            escapeHandler
          );

        }

      }
    );

  }


  /* =========================================================
     GALLERY EVENTS
     ========================================================= */

  function attachGalleryEvents() {

    const items =
      tourGallery.querySelectorAll(
        ".tour-gallery-item"
      );


    items.forEach(item => {

      item.addEventListener(
        "click",
        () => {

          const image =
            item.dataset.image;

          const destination =
            getCurrentDestination();


          if (image) {

            openImageViewer(
              image,
              destination.name
            );

          }

        }
      );

    });

  }


  /* =========================================================
     VIDEO
     ========================================================= */

  function loadVideo(destination) {

    if (!tourVideoFrame) return;


    tourVideoFrame.src =
      `https://www.youtube.com/embed/${destination.video}?rel=0&modestbranding=1`;

  }


  /* =========================================================
     MAP
     ========================================================= */

  function loadMap(destination) {

    if (!tourMapFrame) return;


    tourMapFrame.src =
      `https://www.google.com/maps?q=${encodeURIComponent(
        destination.map
      )}&output=embed`;

  }


  /* =========================================================
     OPEN TOUR
     ========================================================= */

  tourButton.addEventListener(
    "click",
    async () => {

      const destination =
        getCurrentDestination();


      /* Show section */

      tourSection.classList.add(
        "active"
      );


      /* Load video */

      loadVideo(destination);


      /* Load map */

      loadMap(destination);


      /* Loading state */

      renderGalleryLoading(
        destination
      );


      /* Scroll */

      tourSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });


      /* AI generation */

      const aiImages =
        await fetchAIImages(
          destination.prompt
        );


      /* AI successful */

      if (aiImages.length) {

        renderGallery(
          aiImages,
          destination.name,
          false
        );

      }

      /* AI failed → fallback */

      else {

        renderGalleryFallback(
          destination
        );

      }

    }
  );


  /* =========================================================
     STOP TOUR
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


    tourSection.classList.remove(
      "active"
    );

  }


  /* =========================================================
     CLOSE EVENTS
     ========================================================= */

  destinationClose?.addEventListener(
    "click",
    stopTour
  );


  destinationBackdrop?.addEventListener(
    "click",
    stopTour
  );


  /* =========================================================
     OPTIONAL GLOBAL ACCESS
     Useful later for AI / itinerary integration.
     ========================================================= */

  window.HimVoyaVirtualTour = {

    open(destinationName) {

      const normalized =
        String(destinationName || "")
          .toLowerCase();


      const destination =
        normalized.includes("manali")
          ? tourData.manali
          : normalized.includes("spiti")
            ? tourData.spiti
            : tourData.chamba;


      if (destinationTitle) {
        destinationTitle.textContent =
          destination.name;
      }


      tourButton.click();

    },

    stop() {
      stopTour();
    }

  };


  console.log(
    "HimVoya Virtual Tour v2 loaded successfully."
  );

});
