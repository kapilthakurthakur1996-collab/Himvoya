/* =========================================================
   HIMVOYA — AI VIRTUAL TOUR v3
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const tourData = {
    chamba: {
      name: "Chamba",
      video: "IIORsROW9Hk",
      map: "Chamba, Himachal Pradesh, India",

      prompt:
        "Ultra realistic cinematic travel photography of Chamba Himachal Pradesh India, Ravi river, Himalayan mountains, green valleys, ancient temples, traditional Himachali architecture, authentic Indian travel destination, photorealistic, natural daylight, 8k",

      fallbackImages: [
        "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85"
      ]
    },

    manali: {
      name: "Manali",
      video: "7aJ7So4sI7U",
      map: "Manali, Himachal Pradesh, India",

      prompt:
        "Ultra realistic cinematic travel photography of Manali Himachal Pradesh India, snow covered Himalayan peaks, pine forests, Beas river, mountain roads, traditional Himachali villages, authentic Indian travel destination, photorealistic, natural daylight, 8k",

      fallbackImages: [
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1622308644420-b20142dc993c?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1597074866923-dc0589150358?auto=format&fit=crop&w=1400&q=85"
      ]
    },

    spiti: {
      name: "Spiti Valley",
      video: "1Dkp6ZLH1cA",
      map: "Spiti Valley, Himachal Pradesh, India",

      prompt:
        "Ultra realistic cinematic travel photography of Spiti Valley Himachal Pradesh India, high altitude cold desert, rugged Himalayan mountains, ancient Buddhist monasteries, remote villages, winding mountain roads, blue sky, dramatic natural light, authentic Indian travel photography, photorealistic, 8k",

      fallbackImages: [
        "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1400&q=85",
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85"
      ]
    }
  };


  /* =========================================================
     FIND EXISTING HTML ELEMENTS
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


  if (!tourButton || !tourSection) {
    console.warn(
      "HimVoya Virtual Tour: required elements not found."
    );

    return;
  }


  /* =========================================================
     DESTINATION
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
     SAFE HTML
     ========================================================= */

  function escapeHTML(value) {

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }


  /* =========================================================
     AI IMAGE API
     ========================================================= */

  async function generateAIImages(destination) {

    try {

      const response = await fetch(
        "/api/generate-tour-image",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            prompt: destination.prompt,
            count: 3
          })
        }
      );


      if (!response.ok) {
        throw new Error(
          `AI image API error: ${response.status}`
        );
      }


      const data =
        await response.json();


      if (
        !data ||
        !Array.isArray(data.images)
      ) {
        throw new Error(
          "Invalid AI image response."
        );
      }


      return data.images.filter(
        image =>
          typeof image === "string" &&
          image.trim() !== ""
      );

    } catch (error) {

      console.warn(
        "HimVoya AI images unavailable:",
        error
      );

      return [];
    }
  }


  /* =========================================================
     LOADING
     ========================================================= */

  function showGalleryLoading(destination) {

    if (!tourGallery) return;

    tourGallery.innerHTML = `

      <div class="himvoya-tour-loading">

        <div class="himvoya-tour-spinner"></div>

        <h3>
          Creating your virtual experience
        </h3>

        <p>
          HimVoya AI is preparing ${escapeHTML(
            destination.name
          )} for you...
        </p>

      </div>

    `;
  }


  /* =========================================================
     RENDER GALLERY
     ========================================================= */

  function renderGallery(
    images,
    destination,
    isFallback = false
  ) {

    if (!tourGallery) return;


    if (!images.length) {

      tourGallery.innerHTML = `

        <div class="himvoya-tour-error">

          <h3>
            Visual experience unavailable
          </h3>

          <p>
            Please try the Virtual Tour again.
          </p>

        </div>

      `;

      return;
    }


    tourGallery.innerHTML = `

      <div class="himvoya-gallery-heading">

        <div>

          <small>
            ${isFallback
              ? "DESTINATION PREVIEW"
              : "AI DESTINATION EXPERIENCE"}
          </small>

          <h3>
            Explore ${escapeHTML(destination.name)}
          </h3>

        </div>

        <span>
          ${isFallback
            ? "HimVoya Preview"
            : "✦ AI"}
        </span>

      </div>


      <div class="himvoya-gallery-grid">

        ${images.map((image, index) => `

          <button
            type="button"
            class="himvoya-gallery-card"
            data-image="${escapeHTML(image)}"
            aria-label="Open ${escapeHTML(
              destination.name
            )} photo ${index + 1}"
          >

            <img
              src="${escapeHTML(image)}"
              alt="${escapeHTML(
                destination.name
              )} destination view"
              loading="lazy"
            />

            <div class="himvoya-gallery-overlay">
              <span>View photo</span>
            </div>

          </button>

        `).join("")}

      </div>

    `;


    attachPhotoClicks(destination);
  }


  /* =========================================================
     PHOTO CLICK
     ========================================================= */

  function attachPhotoClicks(destination) {

    const cards =
      tourGallery.querySelectorAll(
        ".himvoya-gallery-card"
      );


    cards.forEach(card => {

      card.addEventListener(
        "click",
        event => {

          event.preventDefault();
          event.stopPropagation();


          const image =
            card.getAttribute("data-image");


          if (!image) return;


          openPhotoViewer(
            image,
            destination.name
          );

        }
      );

    });

  }


  /* =========================================================
     FULLSCREEN PHOTO VIEWER
     ========================================================= */

  function openPhotoViewer(
    image,
    destinationName
  ) {

    const oldViewer =
      document.querySelector(
        "#himvoyaPhotoViewer"
      );


    if (oldViewer) {
      oldViewer.remove();
    }


    const viewer =
      document.createElement("div");


    viewer.id =
      "himvoyaPhotoViewer";


    viewer.innerHTML = `

      <div class="himvoya-photo-backdrop">

        <button
          type="button"
          class="himvoya-photo-close"
          aria-label="Close photo"
        >
          ×
        </button>


        <div class="himvoya-photo-content">

          <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(destinationName)}"
          />

          <div class="himvoya-photo-caption">

            ${escapeHTML(destinationName)}

          </div>

        </div>

      </div>

    `;


    document.body.appendChild(viewer);


    const closeButton =
      viewer.querySelector(
        ".himvoya-photo-close"
      );


    const backdrop =
      viewer.querySelector(
        ".himvoya-photo-backdrop"
      );


    closeButton.addEventListener(
      "click",
      () => viewer.remove()
    );


    backdrop.addEventListener(
      "click",
      event => {

        if (
          event.target === backdrop
        ) {
          viewer.remove();
        }

      }
    );


    function escapeKey(event) {

      if (event.key === "Escape") {

        viewer.remove();

        document.removeEventListener(
          "keydown",
          escapeKey
        );

      }

    }


    document.addEventListener(
      "keydown",
      escapeKey
    );

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

  async function openTour() {

    const destination =
      getCurrentDestination();


    tourSection.classList.add(
      "active"
    );


    loadVideo(destination);

    loadMap(destination);

    showGalleryLoading(
      destination
    );


    tourSection.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });


    const aiImages =
      await generateAIImages(
        destination
      );


    if (aiImages.length > 0) {

      renderGallery(
        aiImages,
        destination,
        false
      );

    } else {

      renderGallery(
        destination.fallbackImages,
        destination,
        true
      );

    }

  }


  /* =========================================================
     CLOSE TOUR
     ========================================================= */

  function closeTour() {

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
     OPEN BUTTON
     ========================================================= */

  tourButton.addEventListener(
    "click",
    event => {

      event.preventDefault();
      event.stopPropagation();

      openTour();

    }
  );


  /* =========================================================
     CLOSE EXISTING MODAL BUTTONS
     ========================================================= */

  document
    .querySelectorAll(
      ".destination-close"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        closeTour
      );

    });


  /* =========================================================
     BACKDROP
     ========================================================= */

  const backdrop =
    document.querySelector(
      "#destinationExperienceBackdrop"
    );


  backdrop?.addEventListener(
    "click",
    event => {

      if (
        event.target === backdrop
      ) {

        closeTour();

      }

    }
  );


  /* =========================================================
     GLOBAL API
     ========================================================= */

  window.HimVoyaVirtualTour = {

    open(destinationName) {

      const name =
        String(destinationName || "")
          .toLowerCase();


      if (
        name.includes("manali")
      ) {

        if (destinationTitle) {
          destinationTitle.textContent =
            "Manali";
        }

      } else if (
        name.includes("spiti")
      ) {

        if (destinationTitle) {
          destinationTitle.textContent =
            "Spiti Valley";
        }

      } else {

        if (destinationTitle) {
          destinationTitle.textContent =
            "Chamba";
        }

      }


      openTour();

    },


    close() {

      closeTour();

    }

  };


  /* =========================================================
     DYNAMIC CSS
     ---------------------------------------------------------
     No need to edit styles.css separately.
     ========================================================= */

  if (
    !document.querySelector(
      "#himvoyaVirtualTourStyles"
    )
  ) {

    const style =
      document.createElement("style");


    style.id =
      "himvoyaVirtualTourStyles";


    style.textContent = `

      .himvoya-gallery-grid {
        display: grid;
        grid-template-columns:
          repeat(3, minmax(0, 1fr));
        gap: 14px;
        margin-top: 18px;
      }


      .himvoya-gallery-card {
        position: relative;
        display: block;
        width: 100%;
        padding: 0;
        border: 0;
        background: transparent;
        cursor: pointer;
        overflow: hidden;
        border-radius: 14px;
      }


      .himvoya-gallery-card img {
        display: block;
        width: 100%;
        height: 220px;
        object-fit: cover;
        transition:
          transform 0.3s ease;
      }


      .himvoya-gallery-card:hover img {
        transform: scale(1.05);
      }


      .himvoya-gallery-overlay {
        position: absolute;
        inset: auto 0 0 0;
        padding: 28px 12px 12px;
        background:
          linear-gradient(
            transparent,
            rgba(0,0,0,.72)
          );
        color: white;
        text-align: left;
        opacity: 0;
        transition: opacity .25s ease;
      }


      .himvoya-gallery-card:hover
      .himvoya-gallery-overlay {
        opacity: 1;
      }


      .himvoya-gallery-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
      }


      .himvoya-gallery-heading small {
        display: block;
        font-size: 11px;
        letter-spacing: .12em;
        opacity: .65;
      }


      .himvoya-gallery-heading h3 {
        margin: 5px 0 0;
      }


      .himvoya-gallery-heading > span {
        font-size: 12px;
        padding: 7px 10px;
        border-radius: 20px;
        background: rgba(0,0,0,.07);
        white-space: nowrap;
      }


      .himvoya-tour-loading,
      .himvoya-tour-error {
        text-align: center;
        padding: 35px 20px;
      }


      .himvoya-tour-spinner {
        width: 34px;
        height: 34px;
        margin: 0 auto 15px;
        border: 3px solid rgba(0,0,0,.12);
        border-top-color: currentColor;
        border-radius: 50%;
        animation:
          himvoyaSpin .8s linear infinite;
      }


      @keyframes himvoyaSpin {
        to {
          transform: rotate(360deg);
        }
      }


      #himvoyaPhotoViewer {
        position: fixed;
        inset: 0;
        z-index: 999999;
      }


      .himvoya-photo-backdrop {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 25px;
        background: rgba(0,0,0,.92);
      }


      .himvoya-photo-content {
        max-width: 95vw;
        max-height: 92vh;
        text-align: center;
      }


      .himvoya-photo-content img {
        display: block;
        max-width: 95vw;
        max-height: 84vh;
        width: auto;
        height: auto;
        object-fit: contain;
        border-radius: 12px;
      }


      .himvoya-photo-caption {
        margin-top: 12px;
        color: white;
        font-size: 14px;
      }


      .himvoya-photo-close {
        position: absolute;
        top: 18px;
        right: 20px;
        width: 46px;
        height: 46px;
        border: 0;
        border-radius: 50%;
        background: white;
        color: #111;
        font-size: 30px;
        line-height: 1;
        cursor: pointer;
        z-index: 2;
      }


      @media (max-width: 700px) {

        .himvoya-gallery-grid {
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 10px;
        }


        .himvoya-gallery-card img {
          height: 170px;
        }


        .himvoya-gallery-heading {
          align-items: flex-start;
          flex-direction: column;
        }


        .himvoya-photo-backdrop {
          padding: 12px;
        }

      }

    `;


    document.head.appendChild(style);

  }


  console.log(
    "HimVoya Virtual Tour v3 loaded successfully."
  );

});
