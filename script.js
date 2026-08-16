/* =========================================================
   HIMVOYA — MAIN JAVASCRIPT
   Search + Property Modal + Partner Modal
   + AI Destination Experience
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
     DESTINATION DATA
  ========================================================= */

  const destinations = {

    chamba: {
      name: "Chamba",
      subtitle:
        "Ancient temples, quiet valleys & authentic Himalayan life.",

      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",

      guide:
        "Namaste! I'm your HimVoya AI Guide for Chamba. Tell me what kind of journey you want — nature, culture, food, adventure or slow travel.",

      answers: {
        places:
          "Start with Chamba town and the historic Lakshmi Narayan Temple. Then explore Khajjiar, scenic viewpoints and nearby villages for a quieter Himalayan experience.",

        food:
          "Try traditional Himachali food, especially rajma, madra, dham-style meals and local seasonal dishes. Ask your local host about authentic home-cooked meals.",

        hidden:
          "For a quieter experience, explore village trails, lesser-known viewpoints and forest paths around the Chamba valley rather than staying only around the main tourist spots.",

        time:
          "Spring and summer are excellent for comfortable exploration, while autumn offers clear mountain views. Winter brings a very different snow-covered Himalayan experience."
      },

      itinerary: {
        2:
          "Day 1 — Explore Chamba town, Lakshmi Narayan Temple, local market and sunset viewpoint.\n\nDay 2 — Khajjiar excursion, forest walk, local food and return to Chamba.",

        3:
          "Day 1 — Chamba town, temples and local market.\n\nDay 2 — Khajjiar, forest walk and sunset.\n\nDay 3 — Local village experience, traditional food and a relaxed mountain morning.",

        5:
          "Day 1 — Chamba arrival and town exploration.\n\nDay 2 — Khajjiar and forest trails.\n\nDay 3 — Local village and cultural experience.\n\nDay 4 — Hiking and hidden viewpoints.\n\nDay 5 — Slow morning, local food and departure.",

        7:
          "Day 1 — Chamba arrival and town exploration.\n\nDay 2 — Temples and local culture.\n\nDay 3 — Khajjiar and forest trails.\n\nDay 4 — Village and local food experience.\n\nDay 5 — Hiking and viewpoints.\n\nDay 6 — Slow mountain day and hidden places.\n\nDay 7 — Relaxed morning and departure."
      }
    },


    manali: {
      name: "Manali",
      subtitle:
        "Mountain adventures, cafés, forests & high-altitude escapes.",

      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85",

      guide:
        "Welcome to Manali! I can help you build an adventure, relaxation, food, nature or mixed Himalayan journey.",

      answers: {
        places:
          "Explore Old Manali, Hadimba Temple, the riverside, Solang Valley and nearby mountain villages.",

        food:
          "Manali is great for cafés, Himachali food and local mountain dishes. Try traditional siddu and local meals along with the café scene.",

        hidden:
          "Move beyond the busiest tourist areas and explore village roads, forest walks and quieter riverside locations around the valley.",

        time:
          "For pleasant weather and outdoor activities, spring through early summer is popular. Autumn offers beautiful landscapes, while winter is ideal if you want snow."
      },

      itinerary: {
        2:
          "Day 1 — Old Manali, cafés, local market and riverside walk.\n\nDay 2 — Solang Valley and mountain activities.",

        3:
          "Day 1 — Old Manali and riverside exploration.\n\nDay 2 — Solang Valley adventure.\n\nDay 3 — Hadimba Temple, forest walk and local cafés.",

        5:
          "Day 1 — Old Manali.\n\nDay 2 — Solang Valley.\n\nDay 3 — Local village and café trail.\n\nDay 4 — Nature excursion.\n\nDay 5 — Relaxed mountain morning.",

        7:
          "Day 1 — Old Manali.\n\nDay 2 — Solang Valley.\n\nDay 3 — Hadimba Temple and forest walk.\n\nDay 4 — Village experience.\n\nDay 5 — Nature and scenic drive.\n\nDay 6 — Café and riverside day.\n\nDay 7 — Slow morning and departure."
      }
    },


    spiti: {
      name: "Spiti Valley",
      subtitle:
        "High-altitude landscapes, monasteries & raw Himalayan wilderness.",

      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=85",

      guide:
        "Welcome to Spiti. This is a slower, remote Himalayan journey. I can help you balance monasteries, villages, landscapes and acclimatization.",

      answers: {
        places:
          "Key Monastery, Kibber, Langza, Hikkim, Komik, Dhankar and Kaza are among the major places to explore.",

        food:
          "Try simple local Himalayan food, momos, thukpa and traditional meals in local homestays. Eating with a host can become part of the experience itself.",

        hidden:
          "Spiti's real magic is often found away from the main viewpoints — small villages, monastery surroundings, local roads and quiet landscapes.",

        time:
          "The traditional Spiti travel season is mainly during the warmer months when roads are more accessible. Always check current road and weather conditions before travelling."
      },

      itinerary: {
        2:
          "Day 1 — Kaza exploration and local monastery visit.\n\nDay 2 — Key Monastery, high-altitude villages and scenic viewpoints.",

        3:
          "Day 1 — Kaza and acclimatization.\n\nDay 2 — Key Monastery and Kibber.\n\nDay 3 — Langza, Hikkim and Komik.",

        5:
          "Day 1 — Kaza and acclimatization.\n\nDay 2 — Key and Kibber.\n\nDay 3 — Langza, Hikkim and Komik.\n\nDay 4 — Dhankar region.\n\nDay 5 — Local village experience and departure.",

        7:
          "Day 1 — Kaza and acclimatization.\n\nDay 2 — Key Monastery and Kibber.\n\nDay 3 — Langza, Hikkim and Komik.\n\nDay 4 — Dhankar region.\n\nDay 5 — Village exploration.\n\nDay 6 — Scenic landscapes and local experiences.\n\nDay 7 — Relaxed morning and departure."
      }
    }

  };


  /* =========================================================
     DESTINATION EXPERIENCE MODAL
  ========================================================= */

  let destinationModal = null;
  let currentDestination = destinations.chamba;
  let selectedDays = 3;


  function createDestinationExperience() {

    if (document.querySelector("#destinationExperience")) {
      destinationModal =
        document.querySelector("#destinationExperience");
      return;
    }


    destinationModal = document.createElement("div");

    destinationModal.id = "destinationExperience";

    destinationModal.innerHTML = `

      <div class="destination-backdrop"></div>

      <div class="destination-dialog">

        <button
          class="destination-close"
          type="button"
          aria-label="Close destination experience"
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
              Discover the mountains differently.
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

              <p id="guideMessage"></p>

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

                <button data-question="places">
                  Best places to visit
                </button>

                <button data-question="food">
                  Local food
                </button>

                <button data-question="hidden">
                  Hidden places
                </button>

                <button data-question="time">
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

                <button data-days="2">
                  2 Days
                </button>

                <button data-days="3">
                  3 Days
                </button>

                <button data-days="5">
                  5 Days
                </button>

                <button data-days="7">
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


    document.body.appendChild(destinationModal);


    /* =========================================================
       EVENTS
    ========================================================= */

    const closeButton =
      destinationModal.querySelector(".destination-close");

    const backdrop =
      destinationModal.querySelector(".destination-backdrop");


    closeButton.addEventListener("click", closeDestination);

    backdrop.addEventListener("click", closeDestination);


    destinationModal
      .querySelectorAll(".question-buttons button")
      .forEach(button => {

        button.addEventListener("click", () => {

          answerQuestion(button.dataset.question);

        });

      });


    destinationModal
      .querySelectorAll(".duration-buttons button")
      .forEach(button => {

        button.addEventListener("click", () => {

          selectedDays =
            Number(button.dataset.days);

          showItinerary();

        });

      });


    const askButton =
      destinationModal.querySelector("#askAI");

    const questionInput =
      destinationModal.querySelector("#aiQuestion");


    askButton.addEventListener("click", askCustomQuestion);


    questionInput.addEventListener("keydown", event => {

      if (event.key === "Enter") {
        event.preventDefault();
        askCustomQuestion();
      }

    });


    destinationModal
      .querySelector("#buildTrip")
      .addEventListener("click", () => {

        showItinerary();

        const resultBox =
          destinationModal.querySelector("#itineraryResult");

        resultBox.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      });


    setDestination(destinations.chamba);
  }


  /* =========================================================
     SET DESTINATION
  ========================================================= */

  function setDestination(destination) {

    currentDestination = destination;

    if (!destinationModal) {
      return;
    }


    destinationModal.querySelector("#destinationTitle").textContent =
      destination.name;

    destinationModal.querySelector("#destinationSubtitle").textContent =
      destination.subtitle;

    destinationModal.querySelector("#guideMessage").textContent =
      destination.guide;

    destinationModal.querySelector("#destinationHero").style.backgroundImage =
      `url("${destination.image}")`;

    destinationModal.querySelector("#aiResponse").textContent =
      "Ask me anything about this destination.";

    destinationModal.querySelector("#itineraryResult").textContent =
      "Choose a duration to create your journey.";

    selectedDays = 3;

  }


  /* =========================================================
     OPEN DESTINATION
  ========================================================= */

  function openDestination(destination) {

    createDestinationExperience();

    setDestination(destination);

    destinationModal.classList.add("active");

    lockBody();

  }


  function closeDestination() {

    if (!destinationModal) {
      return;
    }

    destinationModal.classList.remove("active");

    unlockBody();

  }


  /* =========================================================
     DESTINATION SEARCH
  ========================================================= */

  function findDestination(searchText) {

    const q = searchText
      .toLowerCase()
      .trim();


    if (
      q.includes("chamba") ||
      q.includes("khajjiar")
    ) {
      return destinations.chamba;
    }


    if (
      q.includes("manali") ||
      q.includes("solang")
    ) {
      return destinations.manali;
    }


    if (
      q.includes("spiti") ||
      q.includes("kaza")
    ) {
      return destinations.spiti;
    }


    return null;

  }


  /* =========================================================
     SEARCH
  ========================================================= */

  if (form) {

    form.addEventListener("submit", event => {

      event.preventDefault();


      const searchText =
        where.value.trim().toLowerCase();

      const selectedType =
        kind.value;


      /* -----------------------------------------
         AI DESTINATION EXPERIENCE
      ----------------------------------------- */

      const destination =
        findDestination(searchText);


      if (destination && selectedType !== "experience") {

        result.textContent =
          `Opening your ${destination.name} AI experience...`;

        createDestinationExperience();

        setTimeout(() => {
          openDestination(destination);
        }, 250);

        return;

      }


      /* -----------------------------------------
         NORMAL CARD SEARCH
      ----------------------------------------- */

      let visibleCount = 0;


      cards.forEach(card => {

        const place =
          card.dataset.place || "";

        const type =
          card.dataset.type || "";


        const placeMatch =
          !searchText ||
          place.includes(searchText) ||
          searchText.includes(place);


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

        result.textContent = "";

        document.querySelector("#stays")?.scrollIntoView({
          behavior: "smooth"
        });

        return;

      }


      if (visibleCount > 0) {

        result.textContent =
          `${visibleCount} ${
            visibleCount === 1
              ? "place"
              : "places"
          } found.`;

        document.querySelector("#stays")?.scrollIntoView({
          behavior: "smooth"
        });

      } else {

        result.textContent =
          "We couldn't find that yet. Try Chamba, Manali or Spiti.";

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
     AI GUIDE ANSWERS
  ========================================================= */

  function answerQuestion(question) {

    const responseBox =
      destinationModal.querySelector("#aiResponse");


    const response =
      currentDestination.answers[question];


    if (response) {

      responseBox.textContent =
        response;

    } else {

      responseBox.textContent =
        "Tell me what you want to know about this destination and I'll help you plan it.";

    }

  }


  /* =========================================================
     CUSTOM AI QUESTION
  ========================================================= */

  function askCustomQuestion() {

    const input =
      destinationModal.querySelector("#aiQuestion");

    const responseBox =
      destinationModal.querySelector("#aiResponse");


    const question =
      input.value.trim().toLowerCase();


    if (!question) {
      return;
    }


    let response =
      `For ${currentDestination.name}, I'd recommend building your journey around local experiences, nature and enough time to explore without rushing.`;


    if (
      question.includes("food") ||
      question.includes("eat") ||
      question.includes("restaurant")
    ) {

      response =
        currentDestination.answers.food;

    }


    else if (
      question.includes("place") ||
      question.includes("visit") ||
      question.includes("see")
    ) {

      response =
        currentDestination.answers.places;

    }


    else if (
      question.includes("hidden") ||
      question.includes("secret") ||
      question.includes("offbeat")
    ) {

      response =
        currentDestination.answers.hidden;

    }


    else if (
      question.includes("time") ||
      question.includes("season") ||
      question.includes("month") ||
      question.includes("weather")
    ) {

      response =
        currentDestination.answers.time;

    }


    else if (
      question.includes("budget") ||
      question.includes("cost") ||
      question.includes("price")
    ) {

      response =
        `Your ${currentDestination.name} budget will depend on your stay, transport and experiences. HimVoya can eventually build a personalized trip budget around your preferences.`;

    }


    else if (
      question.includes("hotel") ||
      question.includes("stay") ||
      question.includes("where to stay")
    ) {

      response =
        `For ${currentDestination.name}, I'd recommend choosing a stay based on the experience you want — valley views, local hospitality, riverside locations or easy access to activities.`;

    }


    responseBox.textContent =
      response;


    input.value = "";

  }


  /* =========================================================
     ITINERARY
  ========================================================= */

  function showItinerary() {

    const resultBox =
      destinationModal.querySelector("#itineraryResult");


    const itinerary =
      currentDestination.itinerary[selectedDays];


    if (itinerary) {

      resultBox.textContent =
        itinerary;

    } else {

      resultBox.textContent =
        `I'll create a personalized ${selectedDays}-day journey for ${currentDestination.name}.`;

    }

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
     PROPERTY MODAL
  ========================================================= */

  function openProperty(card) {

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
          card.querySelector(".photo span")?.textContent.trim() ||
          "HIMALAYAN STAY",

        location:
          fallbackLocation,

        price:
          fallbackPrice,

        description:
          fallbackDescription,

        image: ""

      };


    modalCategory.textContent =
      data.category;

    modalTitle.textContent =
      title;

    modalLocation.textContent =
      data.location;

    modalDescription.textContent =
      data.description;

    modalPrice.textContent =
      data.price;

    modalMessage.textContent = "";


    if (modalImage) {

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


  function closeProperty() {

    propertyModal.classList.remove("active");

    propertyModal.setAttribute(
      "aria-hidden",
      "true"
    );

    unlockBody();

  }


  cards.forEach(card => {

    card.style.cursor =
      "pointer";


    card.addEventListener("click", () => {

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

    availabilityBtn.addEventListener("click", () => {

      modalMessage.textContent =
        "Availability checking will be connected to the property partner in the next stage.";

    });

  }


  if (enquiryBtn) {

    enquiryBtn.addEventListener("click", () => {

      modalMessage.textContent =
        "Your enquiry flow is ready. Direct partner messaging will be connected next.";

    });

  }


  /* =========================================================
     PARTNER MODAL
  ========================================================= */

  function openPartner() {

    partnerModal.classList.add("active");

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

    partnerModal.classList.remove("active");

    partnerModal.setAttribute(
      "aria-hidden",
      "true"
    );

    unlockBody();

  }


  if (listPlaceBtn) {

    listPlaceBtn.addEventListener(
      "click",
      event => {

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
      event => {

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
          return;
        }


        partnerMessage.textContent =
          `Thank you, ${name}. Your listing "${property}" has been received. We'll connect with you soon.`;


        partnerMessage.style.color =
          "#315c43";


        partnerForm.reset();

      }
    );

  }


  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") {
        return;
      }


      if (
        destinationModal?.classList.contains("active")
      ) {

        closeDestination();

      }


      if (
        propertyModal?.classList.contains("active")
      ) {

        closeProperty();

      }


      if (
        partnerModal?.classList.contains("active")
      ) {

        closePartner();

      }

    }
  );


  /* =========================================================
     INITIALIZE
  ========================================================= */

  createDestinationExperience();

});
