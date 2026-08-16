/* =========================================================
   HIMVOYA — VIRTUAL TOUR FEATURE
   Shows a real video + interactive map for each destination
   so travellers can explore before they visit.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     TOUR DATA — one entry per destination.
     To add a new destination later, just copy a block below
     and change the video ID + map location name.
     ========================================================= */
  const tourData = {
    chamba: {
      video: "IIORsROW9Hk",
      map: "Chamba, Himachal Pradesh, India"
    },
    manali: {
      video: "7aJ7So4sI7U",
      map: "Manali, Himachal Pradesh, India"
    },
    "spiti valley": {
      video: "1Dkp6ZLH1cA",
      map: "Spiti Valley, Himachal Pradesh, India"
    },
    spiti: {
      video: "1Dkp6ZLH1cA",
      map: "Spiti Valley, Himachal Pradesh, India"
    }
  };

  const tourButton      = document.querySelector("#virtualTourButton");
  const tourSection     = document.querySelector("#virtualTourSection");
  const tourVideoFrame  = document.querySelector("#tourVideoFrame");
  const tourMapFrame    = document.querySelector("#tourMapFrame");
  const destinationTitle = document.querySelector("#destinationTitle");

  // If the button/section aren't on the page yet, do nothing.
  if (!tourButton || !tourSection) {
    return;
  }

  /* =========================================================
     OPEN TOUR
     ========================================================= */
  tourButton.addEventListener("click", () => {
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
  });

  /* =========================================================
     STOP VIDEO WHEN THE DESTINATION MODAL CLOSES
     (prevents the video from playing in the background)
     ========================================================= */
  function stopTour() {
    if (tourVideoFrame) {
      tourVideoFrame.src = "";
    }
    if (tourMapFrame) {
      tourMapFrame.src = "";
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
