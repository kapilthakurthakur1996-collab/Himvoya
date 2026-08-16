/* =========================================================
   HIMVOYA — COMPLETE MAIN JAVASCRIPT
   Search
   Property Modal
   Partner Modal
   AI Destination Experience
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const form = document.querySelector("#search");
  const result = document.querySelector("#result");
  const cards = [...document.querySelectorAll(".card")];
  const where = document.querySelector("#where");
  const kind = document.querySelector("#kind");

  const listPlaceBtn = document.querySelector("#listPlaceBtn");
  const partnerBtn = document.querySelector("#partnerBtn");

  const partnerModal = document.querySelector("#partnerModal");
  const partnerBackdrop = document.querySelector("#partnerBackdrop");
  const partnerClose = document.querySelector("#partnerClose");
  const partnerForm = document.querySelector("#partnerForm");
  const partnerMessage = document.querySelector("#partnerMessage");

  const propertyModal = document.querySelector("#propertyModal");
  const modalBackdrop = document.querySelector("#modalBackdrop");
  const modalClose = document.querySelector("#modalClose");

  const modalImage = document.querySelector("#modalImage");
  const modalCategory = document.querySelector("#modalCategory");
  const modalTitle = document.querySelector("#modalTitle");
  const modalLocation = document.querySelector("#modalLocation");
  const modalDescription = document.querySelector("#modalDescription");
  const modalPrice = document.querySelector("#modalPrice");
  const modalMessage = document.querySelector("#modalMessage");

  const availabilityBtn = document.querySelector("#availabilityBtn");
  const enquiryBtn = document.querySelector("#enquiryBtn");


  /* =========================================================
     HELPERS
  ========================================================= */

  function lockBody() {
    document.body.classList.add("modal-open");
  }

  function unlockBody() {
    document.body.classList.remove("modal-open");
  }


  /* =========================================================
     SEARCH
  ========================================================= */

  if (form && where && kind) {

    form.addEventListener("submit", (event) => {

      event.preventDefault();

      const searchText =
        where.value.trim().toLowerCase();

      const selectedType =
        kind.value;

      let visibleCount = 0;

      cards.forEach((card) => {

        const place =
          (card.dataset.place || "").toLowerCase();

        const type =
          card.dataset.type || "";

        const placeMatch =
          !searchText ||
          place.includes(searchText) ||
          searchText.includes(place) ||
          (
            searchText.includes("himachal") &&
            place.includes("himachal")
          );

        const typeMatch =
          selectedType === "all" ||
          type === selectedType;

        const show =
          placeMatch && typeMatch;

        card.style.display =
          show ? "" : "none";

        if (show) {
          visibleCount++;
        }

      });


      if (!searchText && selectedType === "all") {

        if (result) {
          result.textContent = "";
        }

        document
          .querySelector("#stays")
          ?.scrollIntoView({
            behavior: "smooth"
          });

        return;
      }


      if (visibleCount > 0) {

        if (result) {

          result.textContent =
            `${visibleCount} ${
              visibleCount === 1
                ? "place"
                : "places"
            } found.`;

        }

        document
          .querySelector("#stays")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      } else {

        if (result) {

          result.textContent =
            "We couldn't find that yet. Try Chamba, Himachal or another destination.";

        }

      }

    });

  }


  /* =========================================================
     RESET SEARCH
  ========================================================= */

  if (where) {

    where.addEventListener("input", () => {

      if (where.value.trim() === "") {

        cards.forEach(card => {
          card.style.display = "";
        });

        if (result) {
          result.textContent = "";
        }

      }

    });

  }


  /* =========================================================
     PROPERTY DATA
  ========================================================= */

  const propertyData = {

    "Mountain View Retreat": {

      category: "MOUNTAIN STAY",

      location: "Himachal Pradesh",

      price: "₹2,499 / night",

      description:
        "Quiet mornings, panoramic Himalayan peaks and warm local hospitality. A peaceful base for travellers who want to slow down and reconnect with the mountains.",

      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"

    },


    "Forest Edge Boutique": {

      category: "BOUTIQUE STAY",

      location: "Chamba, Himachal Pradesh",

      price: "₹2,999 / night",

      description:
        "A peaceful forest-edge retreat designed for slow travel, hiking, stargazing and discovering the quieter side of Chamba.",

      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85"

    },


    "Riverside Haven": {

      category: "RIVERSIDE STAY",

      location: "Himachal Pradesh",

      price: "₹2,299 / night",

      description:
        "Wake up beside the river and explore hidden Himalayan villages, local food and peaceful mountain landscapes.",

      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85"

    }

  };


  /* =========================================================
     OPEN PROPERTY
  ========================================================= */

  function openProperty(card) {

    if (!propertyModal) {
      return;
    }

    const title =
      card.querySelector("h3")?.textContent.trim() ||
      "Himalayan Stay";

    const fallbackLocation =
      card.querySelector("footer span")?.textContent.trim() ||
      "Himachal Pradesh";

    const fallbackPrice =
      card.querySelector("footer strong")?.textContent.trim() ||
      "Price on request";

    const fallbackDescription =
      card.querySelector(".body p")?.textContent.trim() ||
      "A beautiful Himalayan stay.";

    const data =
      propertyData[title] || {

        category:
          card.querySelector(".photo span")
            ?.textContent.trim() ||
          "HIMALAYAN STAY",

        location:
          fallbackLocation,

        price:
          fallbackPrice,

        description:
          fallbackDescription,

        image:
          ""

      };


    if (modalCategory) {
      modalCategory.textContent =
        data.category;
    }

    if (modalTitle) {
      modalTitle.textContent =
        title;
    }

    if (modalLocation) {
      modalLocation.textContent =
        data.location;
    }

    if (modalDescription) {
      modalDescription.textContent =
        data.description;
    }

    if (modalPrice) {
      modalPrice.textContent =
        data.price;
    }

    if (modalMessage) {
      modalMessage.textContent = "";
    }


    if (modalImage && data.image) {

      modalImage.style.backgroundImage =
        `url("${data.image}")`;

      modalImage.style.backgroundSize =
        "cover";

      modalImage.style.backgroundPosition =
        "center";

    }


    propertyModal.classList.add("active");

    propertyModal.setAttribute(
      "aria-hidden",
      "false"
    );

    lockBody();

  }


  /* =========================================================
     CLOSE PROPERTY
  ========================================================= */

  function closeProperty() {

    if (!propertyModal) {
      return;
    }

    propertyModal.classList.remove(
      "active"
    );

    propertyModal.setAttribute(
      "aria-hidden",
      "true"
    );

    unlockBody();

  }


  /* =========================================================
     PROPERTY CARD EVENTS
  ========================================================= */

  cards.forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener("click", (event) => {

      /*
       * If user clicks AI Explore button,
       * do NOT open property modal.
       */

      if (
        event.target.closest(
          ".ai-explore-button"
        )
      ) {
        return;
      }

      openProperty(card);

    });

  });


  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeProperty
    );

  }


  if (modalBackdrop) {

    modalBackdrop.addEventListener(
      "click",
      closeProperty
    );

  }


  /* =========================================================
     PROPERTY ACTIONS
  ========================================================= */

  if (availabilityBtn) {

    availabilityBtn.addEventListener(
      "click",
      () => {

        if (modalMessage) {

          modalMessage.textContent =
            "Availability checking will be connected directly with the property partner in the next stage.";

        }

      }
    );

  }


  if (enquiryBtn) {

    enquiryBtn.addEventListener(
      "click",
      () => {

        if (modalMessage) {

          modalMessage.textContent =
            "Your enquiry flow is ready. Direct partner messaging will be connected next.";

        }

      }
    );

  }


  /* =========================================================
     PARTNER MODAL
  ========================================================= */

  function openPartner() {

    if (!partnerModal) {
      return;
    }

    partnerModal.classList.add(
      "active"
    );

    partnerModal.setAttribute(
      "aria-hidden",
      "false"
    );

    lockBody();

    setTimeout(() => {

      document
        .querySelector("#partnerName")
        ?.focus();

    }, 150);

  }


  function closePartner() {

    if (!partnerModal) {
      return;
    }

    partnerModal.classList.remove(
      "active"
    );

    partnerModal.setAttribute(
      "aria-hidden",
      "true"
    );

    unlockBody();

  }


  if (listPlaceBtn) {

    listPlaceBtn.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        openPartner();

      }
    );

  }


  if (partnerBtn) {

    partnerBtn.addEventListener(
      "click",
      openPartner
    );

  }


  if (partnerClose) {

    partnerClose.addEventListener(
      "click",
      closePartner
    );

  }


  if (partnerBackdrop) {

    partnerBackdrop.addEventListener(
      "click",
      closePartner
    );

  }


  /* =========================================================
     PARTNER FORM
  ========================================================= */

  if (partnerForm) {

    partnerForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();

        const name =
          document
            .querySelector("#partnerName")
            ?.value.trim();

        const property =
          document
            .querySelector("#propertyName")
            ?.value.trim();


        if (!name || !property) {

          if (partnerMessage) {

            partnerMessage.textContent =
              "Please enter your name and property name.";

            partnerMessage.style.color =
              "#9b3d32";

          }

          return;

        }


        if (partnerMessage) {

          partnerMessage.textContent =
            `Thank you, ${name}. Your listing "${property}" has been received. We'll connect with you soon.`;

          partnerMessage.style.color =
            "#315c43";

        }


        partnerForm.reset();

      }
    );

  }


  /* =========================================================
     DESTINATION DATABASE
  ========================================================= */

  const destinations = {

    chamba: {

      name: "Chamba",

      subtitle:
        "Ancient temples, quiet valleys & authentic mountain life.",

      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",

      guide:
        "Namaste! I'm your HimVoya AI mountain guide for Chamba. I can help you discover places, local food, hidden experiences and build a trip around your travel style.",

      answers: {

        "best places":
          "For a first Chamba trip, explore the historic Chamba town, Lakshmi Narayan Temple, Chaugan, nearby viewpoints and Khajjiar.",

        "local food":
          "Try traditional Himachali food such as dham-style meals, rajma, madra and local snacks. Ask your host for an authentic home-cooked experience.",

        "hidden places":
          "For a quieter experience, explore village trails, lesser-known viewpoints and forest routes away from the main tourist areas.",

        "best time":
          "Spring and autumn are excellent for comfortable weather and mountain views. Summer is pleasant in higher areas, while winter brings a different snowy Himalayan atmosphere."

      },

      itinerary: {

        2:
          "Day 1: Chamba town, Lakshmi Narayan Temple, local market and sunset viewpoint.\n\nDay 2: Khajjiar excursion, forest walk, local food and return to Chamba.",

        3:
          "Day 1: Explore Chamba town and ancient temples.\n\nDay 2: Khajjiar, forest walk and sunset.\n\nDay 3: Local village experience, traditional food and a relaxed mountain morning.",

        5:
          "Day 1: Chamba arrival and town exploration.\n\nDay 2: Khajjiar and forest trails.\n\nDay 3: Local village and cultural experience.\n\nDay 4: Hiking and hidden viewpoints.\n\nDay 5: Slow morning, local food and departure.",

        7:
          "A relaxed 7-day Chamba journey combining temples, villages, forests, hikes, local food, viewpoints and slow Himalayan mornings."

      }

    },


    manali: {

      name: "Manali",

      subtitle:
        "Mountain adventures, cafés, forests & high-altitude escapes.",

      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85",

      guide:
        "Welcome to Manali. Tell me whether you want adventure, relaxation, nature, food or a mix — I'll shape the journey around you.",

      answers: {

        "best places":
          "Explore Old Manali, Hadimba Temple, Manu Temple, Solang Valley, Vashisht and the Beas riverside.",

        "local food":
          "Try Himachali dishes, local cafés, trout where available, siddu and traditional mountain meals.",

        "hidden places":
          "For a quieter side of Manali, explore village walks, forest trails and less crowded areas around Old Manali and nearby villages.",

        "best time":
          "March to June is popular for pleasant weather. September to November is excellent for clearer mountain landscapes and quieter travel."

      },

      itinerary: {

        2:
          "Day 1: Old Manali, cafés, local market and riverside walk.\n\nDay 2: Solang Valley and mountain activities.",

        3:
          "Day 1: Old Manali and riverside exploration.\n\nDay 2: Solang Valley adventure.\n\nDay 3: Hadimba Temple, forest walk and local cafés.",

        5:
          "Day 1: Old Manali.\n\nDay 2: Solang Valley.\n\nDay 3: Local village and café trail.\n\nDay 4: Nature excursion.\n\nDay 5: Relaxed mountain morning.",

        7:
          "A 7-day Manali experience combining adventure, forests, cafés, villages, scenic drives and relaxed Himalayan evenings."

      }

    },


    spiti: {

      name: "Spiti Valley",

      subtitle:
        "High-altitude landscapes, monasteries & raw Himalayan wilderness.",

      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=85",

      guide:
        "Welcome to Spiti. This is a slower, more remote journey. I can help you balance monasteries, landscapes, villages and acclimatization.",

      answers: {

        "best places":
          "Key Monastery, Kibber, Langza, Hikkim, Komik and the Kaza region are some of the highlights.",

        "local food":
          "Try simple local mountain food, thukpa, momos and traditional dishes available in local homestays.",

        "hidden places":
          "Explore smaller villages, monastery surroundings and quiet viewpoints rather than rushing between major tourist stops.",

        "best time":
          "The main road-access season is generally during the warmer months. Always check current road and weather conditions before travelling because high-altitude conditions can change quickly."

      },

      itinerary: {

        2:
          "Day 1: Kaza exploration and local monastery visit.\n\nDay 2: Key Monastery, high-altitude villages and scenic viewpoints.",

        3:
          "Day 1: Kaza and acclimatization.\n\nDay 2: Key Monastery and Kibber.\n\nDay 3: Langza, Hikkim and Komik.",

        5:
          "Day 1: Kaza and acclimatization.\n\nDay 2: Key and Kibber.\n\nDay 3: Langza, Hikkim and Komik.\n\nDay 4: Dhankar region.\n\nDay 5: Local village experience and departure.",

        7:
          "A 7-day slow Spiti journey covering monasteries, high-altitude villages, landscapes, local food and remote Himalayan experiences."

      }

    }

  };


  /* =========================================================
     DESTINATION DETECTION
  ========================================================= */

  function detectDestination(text) {

    const value =
      (text || "").toLowerCase();

    if (
      value.includes("manali")
    ) {
      return "manali";
    }

    if (
      value.includes("spiti")
    ) {
      return "spiti";
    }

    if (
      value.includes("chamba")
    ) {
      return "chamba";
    }

    return "chamba";

  }


  /* =========================================================
     CREATE DESTINATION EXPERIENCE
  ========================================================= */

  function createDestinationExperience() {

    if (
      document.querySelector(
        "#destinationExperience"
      )
    ) {
      return;
    }


    const modal =
      document.createElement("div");

    modal.id =
      "destinationExperience";


    modal.innerHTML = `

      <div class="destination-backdrop"></div>

      <div class="destination-dialog">

        <button
          class="destination-close"
          type="button"
          aria-label="Close"
        >
          ×
        </button>


        <div
          class="destination-hero"
          id="destinationHero"
        >

          <div class="destination-overlay"></div>

          <div class="destination-hero-content">

            <p class="eyebrow">
              HIMVOYA AI DESTINATION EXPERIENCE
            </p>

            <h2 id="destinationTitle">
              Chamba
            </h2>

            <p id="destinationSubtitle">
              Discover the Himalayas differently.
            </p>

          </div>

        </div>


        <div class="destination-content">


          <div class="ai-guide">

            <div class="ai-guide-icon">
              H
            </div>

            <div>

              <small>
                HIMVOYA AI GUIDE
              </small>

              <p id="guideMessage">
                Namaste! I'm your HimVoya AI mountain guide.
              </p>

            </div>

          </div>


          <div class="destination-grid">


            <section>

              <p class="eyebrow dark">
                ASK YOUR GUIDE
              </p>

              <h3>
                What do you want to discover?
              </h3>


              <div class="question-buttons">

                <button
                  type="button"
                  data-question="best places"
                >
                  Best places to visit
                </button>

                <button
                  type="button"
                  data-question="local food"
                >
                  Local food
                </button>

                <button
                  type="button"
                  data-question="hidden places"
                >
                  Hidden places
                </button>

                <button
                  type="button"
                  data-question="best time"
                >
                  Best time to visit
                </button>

              </div>


              <div class="ai-chat">

                <div
                  id="aiResponse"
                  class="ai-response"
                >
                  Ask me anything about this destination.
                </div>


                <div class="ai-input">

                  <input
                    id="aiQuestion"
                    type="text"
                    placeholder="Ask your HimVoya guide..."
                  >

                  <button
                    id="askAI"
                    type="button"
                  >
                    Ask →
                  </button>

                </div>

              </div>

            </section>


            <section class="trip-builder">

              <p class="eyebrow dark">
                BUILD YOUR JOURNEY
              </p>

              <h3>
                How long are you staying?
              </h3>


              <div class="duration-buttons">

                <button
                  type="button"
                  data-days="2"
                >
                  2 Days
                </button>

                <button
                  type="button"
                  data-days="3"
                >
                  3 Days
                </button>

                <button
                  type="button"
                  data-days="5"
                >
                  5 Days
                </button>

                <button
                  type="button"
                  data-days="7"
                >
                  7 Days
                </button>

              </div>


              <div
                id="itineraryResult"
                class="itinerary-result"
              >
                Choose a duration to create your journey.
              </div>


              <button
                class="build-trip"
                id="buildTrip"
                type="button"
              >
                Build My Trip →
              </button>

            </section>

          </div>

        </div>

      </div>

    `;


    document.body.appendChild(modal);


    /* =========================================================
       DESTINATION MODAL ELEMENTS
    ========================================================= */

    const closeButton =
      modal.querySelector(
        ".destination-close"
      );

    const backdrop =
      modal.querySelector(
        ".destination-backdrop"
      );

    const title =
      modal.querySelector(
        "#destinationTitle"
      );

    const subtitle =
      modal.querySelector(
        "#destinationSubtitle"
      );

    const guide =
      modal.querySelector(
        "#guideMessage"
      );

    const hero =
      modal.querySelector(
        "#destinationHero"
      );

    const response =
      modal.querySelector(
        "#aiResponse"
      );

    const questionInput =
      modal.querySelector(
        "#aiQuestion"
      );

    const askButton =
      modal.querySelector(
        "#askAI"
      );

    const itinerary =
      modal.querySelector(
        "#itineraryResult"
      );

    const buildTrip =
      modal.querySelector(
        "#buildTrip"
      );


    let currentDestination =
      destinations.chamba;

    let selectedDays = 3;


    /* =========================================================
       SET DESTINATION
    ========================================================= */

    function setDestination(
      destinationKey
    ) {

      const destination =
        destinations[destinationKey];

      if (!destination) {
        return;
      }

      currentDestination =
        destination;


      if (title) {
        title.textContent =
          destination.name;
      }

      if (subtitle) {
        subtitle.textContent =
          destination.subtitle;
      }

      if (guide) {
        guide.textContent =
          destination.guide;
      }

      if (hero) {

        hero.style.backgroundImage =
          `url("${destination.image}")`;

      }

      if (response) {

        response.textContent =
          "Ask me anything about this destination.";

      }

      if (itinerary) {

        itinerary.textContent =
          "Choose a duration to create your journey.";

      }

      selectedDays = 3;

    }


    /* =========================================================
       CLOSE DESTINATION
    ========================================================= */

    function closeDestination() {

      modal.classList.remove(
        "active"
      );

      unlockBody();

    }


    if (closeButton) {

      closeButton.addEventListener(
        "click",
        closeDestination
      );

    }


    if (backdrop) {

      backdrop.addEventListener(
        "click",
        closeDestination
      );

    }


    /* =========================================================
       ANSWER AI QUESTION
    ========================================================= */

    function answerQuestion(question) {

      const q =
        (question || "")
          .toLowerCase()
          .trim();


      let answer =
        "I can help you with places, food, hidden experiences, weather, timing and itinerary planning.";


      const answers =
        currentDestination.answers;


      if (
        q.includes("food") ||
        q.includes("eat") ||
        q.includes("restaurant")
      ) {

        answer =
          answers["local food"];

      }


      else if (
        q.includes("hidden") ||
        q.includes("secret") ||
        q.includes("offbeat")
      ) {

        answer =
          answers["hidden places"];

      }


      else if (
        q.includes("best time") ||
        q.includes("when") ||
        q.includes("season")
      ) {

        answer =
          answers["best time"];

      }


      else if (
        q.includes("place") ||
        q.includes("visit") ||
        q.includes("see") ||
        q.includes("where")
      ) {

        answer =
          answers["best places"];

      }


      else if (
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("namaste")
      ) {

        answer =
          currentDestination.guide;

      }


      if (response) {

        response.textContent =
          answer;

      }

    }


    /* =========================================================
       QUICK QUESTIONS
    ========================================================= */

    modal
      .querySelectorAll(
        "[data-question]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            const question =
              button.dataset.question;

            answerQuestion(
              question
            );

          }
        );

      });


    /* =========================================================
       ASK BUTTON
    ========================================================= */

    if (askButton) {

      askButton.addEventListener(
        "click",
        () => {

          const question =
            questionInput?.value.trim();

          if (!question) {

            if (response) {

              response.textContent =
                "Ask me something first — for example, 'What are the best places to visit?'";

            }

            return;

          }

          answerQuestion(
            question
          );

          if (questionInput) {
            questionInput.value = "";
          }

        }
      );

    }


    /* =========================================================
       ENTER TO ASK
    ========================================================= */

    if (questionInput) {

      questionInput.addEventListener(
        "keydown",
        (event) => {

          if (
            event.key === "Enter"
          ) {

            event.preventDefault();

            askButton?.click();

          }

        }
      );

    }


    /* =========================================================
       DURATION BUTTONS
    ========================================================= */

    modal
      .querySelectorAll(
        "[data-days]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            selectedDays =
              Number(
                button.dataset.days
              );

            const plan =
              currentDestination
                .itinerary[
                  selectedDays
                ];


            if (itinerary) {

              itinerary.textContent =
                plan ||
                "I can create a personalized itinerary for this duration.";

            }

          }
        );

      });


    /* =========================================================
       BUILD MY TRIP
    ========================================================= */

    if (buildTrip) {

      buildTrip.addEventListener(
        "click",
        () => {

          const plan =
            currentDestination
              .itinerary[
                selectedDays
              ];


          if (itinerary) {

            itinerary.textContent =
              plan ||
              `Your ${selectedDays}-day ${currentDestination.name} journey is ready.`;

          }


          if (response) {

            response.textContent =
              `Perfect. I've started building your ${selectedDays}-day ${currentDestination.name} journey. Next, HimVoya can connect stays, experiences and local partners to this plan.`;

          }

        }
      );

    }


    /* =========================================================
       GLOBAL OPEN FUNCTION
    ========================================================= */

    window.openHimVoyaDestination =
      function(destinationKey) {

        const key =
          destinationKey || "chamba";

        setDestination(key);

        modal.classList.add(
          "active"
        );

        lockBody();

      };


    /* =========================================================
       INITIAL DESTINATION
    ========================================================= */

    setDestination("chamba");

  }


  /* =========================================================
     CREATE AI EXPERIENCE
  ========================================================= */

  createDestinationExperience();


  /* =========================================================
     ADD AI EXPLORE BUTTONS TO CARDS
  ========================================================= */

  cards.forEach(card => {

    if (
      card.querySelector(
        ".ai-explore-button"
      )
    ) {
      return;
    }


    const place =
      (card.dataset.place || "")
        .toLowerCase();


    let destination =
      "chamba";


    if (
      place.includes("manali")
    ) {

      destination =
        "manali";

    }


    else if (
      place.includes("spiti")
    ) {

      destination =
        "spiti";

    }


    else if (
      place.includes("chamba")
    ) {

      destination =
        "chamba";

    }


    else {

      destination =
        "chamba";

    }


    const body =
      card.querySelector(".body");


    if (!body) {
      return;
    }


    const button =
      document.createElement("button");


    button.type =
      "button";

    button.className =
      "ai-explore-button";

    button.textContent =
      "✨ Explore with AI";


    button.style.cssText = `
      width: 100%;
      margin-top: 16px;
      padding: 13px 16px;
      border: 0;
      border-radius: 11px;
      background: #1d392a;
      color: white;
      font-family: inherit;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      transition: transform .2s ease, background .2s ease;
    `;


    button.addEventListener(
      "mouseenter",
      () => {

        button.style.background =
          "#254936";

        button.style.transform =
          "translateY(-2px)";

      }
    );


    button.addEventListener(
      "mouseleave",
      () => {

        button.style.background =
          "#1d392a";

        button.style.transform =
          "translateY(0)";

      }
    );


    button.addEventListener(
      "click",
      (event) => {

        event.stopPropagation();

        if (
          window.openHimVoyaDestination
        ) {

          window.openHimVoyaDestination(
            destination
          );

        }

      }
    );


    body.appendChild(button);

  });


  /* =========================================================
     HERO SEARCH → AI DESTINATION EXPERIENCE
  ========================================================= */

  if (form && where) {

    const originalSubmit =
      form.onsubmit;


    form.addEventListener(
      "dblclick",
      () => {

        const text =
          where.value.trim();

        if (!text) {
          return;
        }


        const destination =
          detectDestination(text);


        if (
          window.openHimVoyaDestination
        ) {

          window.openHimVoyaDestination(
            destination
          );

        }

      }
    );

  }


  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key !== "Escape"
      ) {
        return;
      }


      if (
        propertyModal?.classList
          .contains("active")
      ) {

        closeProperty();

      }


      if (
        partnerModal?.classList
          .contains("active")
      ) {

        closePartner();

      }


      const destinationModal =
        document.querySelector(
          "#destinationExperience"
        );


      if (
        destinationModal?.classList
          .contains("active")
      ) {

        destinationModal.classList.remove(
          "active"
        );

        unlockBody();

      }

    }
  );


});
/* =========================================================
   HIMVOYA AI DESTINATION EXPERIENCE
========================================================= */

#destinationExperience {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: .25s ease;
}

#destinationExperience.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.destination-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(5, 15, 10, .78);
  backdrop-filter: blur(10px);
}

.destination-dialog {
  position: relative;
  z-index: 2;
  width: min(1100px, 100%);
  max-height: 94vh;
  overflow-y: auto;
  background: #f8f7f1;
  color: #18251e;
  border-radius: 26px;
  box-shadow: 0 35px 100px rgba(0,0,0,.35);
  transform: translateY(20px) scale(.97);
  transition: .3s ease;
}

#destinationExperience.active .destination-dialog {
  transform: translateY(0) scale(1);
}

.destination-close {
  position: absolute;
  z-index: 5;
  top: 18px;
  right: 18px;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(255,255,255,.5);
  border-radius: 50%;
  background: rgba(0,0,0,.35);
  color: white;
  font-size: 28px;
  cursor: pointer;
}

.destination-hero {
  position: relative;
  height: 360px;
  background-size: cover;
  background-position: center;
  color: white;
  border-radius: 26px 26px 0 0;
}

.destination-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(5,15,10,.82),
    rgba(5,15,10,.25)
  );
  border-radius: inherit;
}

.destination-hero-content {
  position: relative;
  z-index: 2;
  padding: 120px 55px 40px;
}

.destination-hero h2 {
  font-family: 'Playfair Display', serif;
  font-size: clamp(48px, 7vw, 76px);
  line-height: .95;
  margin: 0 0 15px;
  letter-spacing: -2px;
}

.destination-hero-content > p:last-child {
  max-width: 600px;
  font-size: 17px;
  line-height: 1.6;
  color: #e5ece7;
}

.destination-content {
  padding: 38px 45px 48px;
}

.ai-guide {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding: 20px;
  background: #eaf1eb;
  border: 1px solid #dce6de;
  border-radius: 18px;
  margin-bottom: 35px;
}

.ai-guide-icon {
  flex: 0 0 44px;
  width: 44px;
  height: 44px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #1d392a;
  color: white;
  font-weight: 700;
}

.ai-guide small {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #557060;
}

.ai-guide p {
  margin: 6px 0 0;
  line-height: 1.6;
  color: #526059;
}

.destination-grid {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 30px;
}

.destination-grid section {
  background: white;
  border: 1px solid #e5e2d9;
  border-radius: 20px;
  padding: 28px;
}

.destination-grid h3 {
  font-size: 25px;
  margin: 0 0 20px;
}

.question-buttons,
.duration-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.question-buttons button,
.duration-buttons button {
  padding: 13px;
  border: 1px solid #d8ded9;
  border-radius: 11px;
  background: #f8faf8;
  color: #26382e;
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.question-buttons button:hover,
.duration-buttons button:hover {
  background: #eaf1eb;
  border-color: #aebeb2;
}

.ai-chat {
  margin-top: 20px;
  border-top: 1px solid #e5e3dc;
  padding-top: 20px;
}

.ai-response {
  min-height: 100px;
  padding: 16px;
  border-radius: 13px;
  background: #f4f6f2;
  color: #526059;
  line-height: 1.65;
  font-size: 14px;
}

.ai-input {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.ai-input input {
  flex: 1;
  min-width: 0;
  height: 48px;
  border: 1px solid #d8ded9;
  border-radius: 11px;
  padding: 0 14px;
  outline: none;
  font: inherit;
}

.ai-input input:focus {
  border-color: #426650;
}

.ai-input button,
.build-trip {
  border: 0;
  border-radius: 11px;
  background: #1d392a;
  color: white;
  padding: 0 18px;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
}

.itinerary-result {
  margin-top: 18px;
  padding: 18px;
  min-height: 170px;
  white-space: pre-line;
  background: #f4f6f2;
  border-radius: 13px;
  color: #526059;
  line-height: 1.65;
  font-size: 14px;
}

.build-trip {
  width: 100%;
  min-height: 52px;
  margin-top: 15px;
}

@media (max-width: 700px) {

  #destinationExperience {
    padding: 10px;
    align-items: flex-end;
  }

  .destination-dialog {
    max-height: 95vh;
    border-radius: 22px 22px 14px 14px;
  }

  .destination-hero {
    height: 300px;
    border-radius: 22px 22px 0 0;
  }

  .destination-hero-content {
    padding: 100px 25px 30px;
  }

  .destination-hero h2 {
    font-size: 48px;
  }

  .destination-content {
    padding: 22px 15px 25px;
  }

  .destination-grid {
    grid-template-columns: 1fr;
  }

  .destination-grid section {
    padding: 20px;
  }

  .question-buttons,
  .duration-buttons {
    grid-template-columns: 1fr;
  }

  .ai-input {
    flex-direction: column;
  }

  .ai-input button {
    min-height: 48px;
  }

}
