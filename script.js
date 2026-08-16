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
          (card.dataset.type || "").toLowerCase();

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


      if (
        !searchText &&
        selectedType === "all"
      ) {

        if (result) {
          result.textContent = "";
        }

        document.querySelector("#stays")?.scrollIntoView({
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

        document.querySelector("#stays")?.scrollIntoView({
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

      if (
        where.value.trim() === ""
      ) {

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

      location:
        "Himachal Pradesh",

      price:
        "₹2,499 / night",

      description:
        "Quiet mornings, panoramic Himalayan peaks and warm local hospitality. A peaceful base for travellers who want to slow down and reconnect with the mountains.",

      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"

    },


    "Forest Edge Boutique": {

      category:
        "BOUTIQUE STAY",

      location:
        "Chamba, Himachal Pradesh",

      price:
        "₹2,999 / night",

      description:
        "A peaceful forest-edge retreat designed for slow travel, hiking, stargazing and discovering the quieter side of Chamba.",

      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85"

    },


    "Riverside Haven": {

      category:
        "RIVERSIDE STAY",

      location:
        "Himachal Pradesh",

      price:
        "₹2,299 / night",

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


    if (
      modalImage &&
      data.image
    ) {

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


  cards.forEach(card => {

    card.style.cursor = "pointer";

    card.addEventListener(
      "click",
      () => {
        openProperty(card);
      }
    );

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
            "Availability checking will be connected to the property partner in the next stage.";

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
            ?.value
            .trim();

        const property =
          document
            .querySelector("#propertyName")
            ?.value
            .trim();


        if (!name || !property) {
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
     HIMVOYA AI DESTINATION DATA
  ========================================================= */

  const destinations = {

    chamba: {

      name:
        "Chamba",

      subtitle:
        "Ancient temples, quiet valleys & authentic mountain life.",

      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1800&q=85",

      guide:
        "Namaste! I'm your HimVoya mountain guide for Chamba. I can help you discover places, food, experiences and build a trip around your travel style.",

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

      name:
        "Manali",

      subtitle:
        "Mountain adventures, cafés, forests & high-altitude escapes.",

      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85",

      guide:
        "Welcome to Manali. Tell me whether you want adventure, relaxation, nature, food or a mix — I'll shape the journey around you.",

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

      name:
        "Spiti Valley",

      subtitle:
        "High-altitude landscapes, monasteries & raw Himalayan wilderness.",

      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=85",

      guide:
        "Welcome to Spiti. This is a slower, more remote journey. I can help you balance monasteries, landscapes, villages and acclimatization.",

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
     CREATE AI DESTINATION EXPERIENCE
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

              <p id="guideMessage">
                Namaste! I'm your HimVoya mountain guide.
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
       DESTINATION ELEMENTS
    ========================================================= */

    const closeButton =
      modal.querySelector(
        ".destination-close"
      );

    const backdrop =
      modal.querySelector(
        ".destination-backdrop"
      );

    const destinationHero =
      modal.querySelector(
        "#destinationHero"
      );

    const destinationTitle =
      modal.querySelector(
        "#destinationTitle"
      );

    const destinationSubtitle =
      modal.querySelector(
        "#destinationSubtitle"
      );

    const guideMessage =
      modal.querySelector(
        "#guideMessage"
      );

    const aiResponse =
      modal.querySelector(
        "#aiResponse"
      );

    const aiQuestion =
      modal.querySelector(
        "#aiQuestion"
      );

    const askAI =
      modal.querySelector(
        "#askAI"
      );

    const itineraryResult =
      modal.querySelector(
        "#itineraryResult"
      );

    const buildTrip =
      modal.querySelector(
        "#buildTrip"
      );


    /* =========================================================
       CURRENT DESTINATION
    ========================================================= */

    let currentDestination =
      destinations.chamba;

    let selectedDays = 3;


    /* =========================================================
       SET DESTINATION
    ========================================================= */

    function setDestination(
      destination
    ) {

      currentDestination =
        destination;


      destinationTitle.textContent =
        destination.name;


      destinationSubtitle.textContent =
        destination.subtitle;


      guideMessage.textContent =
        destination.guide;


      destinationHero.style.backgroundImage =
        `url("${destination.image}")`;


      aiResponse.textContent =
        "Ask me anything about this destination.";


      itineraryResult.textContent =
        "Choose a duration to create your journey.";

    }


    /* =========================================================
       OPEN DESTINATION
    ========================================================= */

    function openDestination(
      destinationKey
    ) {

      const destination =
        destinations[destinationKey];


      if (!destination) {

        console.warn(
          "HimVoya destination not found:",
          destinationKey
        );

        return;

      }


      setDestination(
        destination
      );


      modal.classList.add(
        "active"
      );


      modal.setAttribute(
        "aria-hidden",
        "false"
      );


      lockBody();

    }


    /* =========================================================
       CLOSE DESTINATION
    ========================================================= */

    function closeDestination() {

      modal.classList.remove(
        "active"
      );


      modal.setAttribute(
        "aria-hidden",
        "true"
      );


      unlockBody();

    }


    closeButton.addEventListener(
      "click",
      closeDestination
    );


    backdrop.addEventListener(
      "click",
      closeDestination
    );


    /* =========================================================
       AI GUIDE ANSWERS
    ========================================================= */

    function answerQuestion(
      question
    ) {

      const q =
        question
          .toLowerCase()
          .trim();


      let response = "";


      if (
        q.includes("food") ||
        q.includes("eat") ||
        q.includes("restaurant")
      ) {

        response =
          `${currentDestination.name} is best explored through local food. Try traditional Himachali dishes, local cafés and small family-run places rather than only tourist restaurants.`;

      }

      else if (
        q.includes("hidden") ||
        q.includes("secret") ||
        q.includes("quiet")
      ) {

        response =
          `For a quieter side of ${currentDestination.name}, explore nearby villages, forest trails, local viewpoints and less-commercial mountain routes. I can help you create a slow-travel route.`;

      }

      else if (
        q.includes("best time") ||
        q.includes("when") ||
        q.includes("season")
      ) {

        response =
          `The best time depends on your experience. Spring and autumn are great for pleasant weather and landscapes, while summer is useful for higher-altitude escapes. Winter can offer snow experiences where conditions allow.`;

      }

      else if (
        q.includes("best places") ||
        q.includes("places") ||
        q.includes("visit") ||
        q.includes("see")
      ) {

        response =
          `For ${currentDestination.name}, I recommend combining the main attractions with one local village, one nature experience and one relaxed viewpoint. That gives you a more authentic HimVoya-style journey.`;

      }

      else if (
        q.includes("adventure") ||
        q.includes("trek") ||
        q.includes("hike")
      ) {

        response =
          `${currentDestination.name} can be experienced through nature walks, mountain viewpoints and suitable local trails. Tell me your fitness level and available days and I can shape the experience around you.`;

      }

      else if (
        q.includes("family") ||
        q.includes("kids")
      ) {

        response =
          `For a family trip to ${currentDestination.name}, I'd prioritize comfortable stays, shorter drives, scenic viewpoints, local food and easy nature experiences rather than an overly packed itinerary.`;

      }

      else if (
        q.includes("couple") ||
        q.includes("romantic") ||
        q.includes("honeymoon")
      ) {

        response =
          `For couples visiting ${currentDestination.name}, I'd combine a scenic stay, sunset viewpoint, slow local meals, a private nature experience and enough free time to enjoy the mountains without rushing.`;

      }

      else {

        response =
          `I'd suggest exploring ${currentDestination.name} through three layers: iconic places, local experiences and hidden nature spots. Tell me whether you prefer adventure, relaxation, food, culture or nature and I'll personalize it.`;

      }


      aiResponse.textContent =
        response;

    }


    /* =========================================================
       QUESTION BUTTONS
    ========================================================= */

    modal
      .querySelectorAll(
        "[data-question]"
      )
      .forEach(button => {

        button.addEventListener(
          "click",
          () => {

            answerQuestion(
              button.dataset.question
            );

          }
        );

      });


    /* =========================================================
       ASK AI
    ========================================================= */

    function askQuestion() {

      const question =
        aiQuestion.value.trim();


      if (!question) {

        aiResponse.textContent =
          "Ask me something about this destination first.";

        return;

      }


      answerQuestion(
        question
      );


      aiQuestion.value = "";

    }


    askAI.addEventListener(
      "click",
      askQuestion
    );


    aiQuestion.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter"
        ) {

          event.preventDefault();

          askQuestion();

        }

      }
    );


    /* =========================================================
       ITINERARY BUTTONS
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


            const itinerary =
              currentDestination
                .itinerary[
                  selectedDays
                ];


            itineraryResult.textContent =
              itinerary ||
              "I'll create a personalized journey for you.";

          }
        );

      });


    /* =========================================================
       BUILD MY TRIP
    ========================================================= */

    buildTrip.addEventListener(
      "click",
      () => {

        const itinerary =
          currentDestination
            .itinerary[
              selectedDays
            ];


        itineraryResult.textContent =
          itinerary ||
          "Your personalized HimVoya journey is being prepared.";

      }
    );


    /* =========================================================
       DESTINATION CLICK DETECTION
    ========================================================= */

    function bindDestinationElements() {

      document
        .querySelectorAll(
          "[data-destination]"
        )
        .forEach(element => {

          if (
            element.dataset.aiBound === "true"
          ) {
            return;
          }


          const rawKey =
            element.dataset.destination
              .toLowerCase()
              .trim();


          let key =
            rawKey;


          if (
            rawKey.includes("chamba")
          ) {
            key = "chamba";
          }

          else if (
            rawKey.includes("manali")
          ) {
            key = "manali";
          }

          else if (
            rawKey.includes("spiti")
          ) {
            key = "spiti";
          }


          if (
            !destinations[key]
          ) {
            return;
          }


          element.dataset.aiBound =
            "true";


          element.style.cursor =
            "pointer";


          element.addEventListener(
            "click",
            event => {

              event.preventDefault();

              openDestination(
                key
              );

            }
          );

        });


      /* ---------------------------------------------------------
         ALSO DETECT COMMON DESTINATION CARDS
      --------------------------------------------------------- */

      document
        .querySelectorAll(
          ".destination-card, .destination, .destination-item"
        )
        .forEach(element => {

          if (
            element.dataset.aiBound === "true"
          ) {
            return;
          }


          const text =
            element.textContent
              .toLowerCase();


          let key = null;


          if (
            text.includes("chamba")
          ) {

            key = "chamba";

          }

          else if (
            text.includes("manali")
          ) {

            key = "manali";

          }

          else if (
            text.includes("spiti")
          ) {

            key = "spiti";

          }


          if (!key) {
            return;
          }


          element.dataset.aiBound =
            "true";


          element.style.cursor =
            "pointer";


          element.addEventListener(
            "click",
            event => {

              event.preventDefault();

              openDestination(
                key
              );

            }
          );

        });

    }


    bindDestinationElements();


    /* =========================================================
       GLOBAL FUNCTION
       Can also be called from HTML:
       onclick="openHimVoyaDestination('chamba')"
    ========================================================= */

    window.openHimVoyaDestination =
      openDestination;

  }


  /* =========================================================
     CREATE AI EXPERIENCE IMMEDIATELY
  ========================================================= */

  createDestinationExperience();


  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key !== "Escape"
      ) {
        return;
      }


      if (
        propertyModal?.classList.contains(
          "active"
        )
      ) {

        closeProperty();

      }


      if (
        partnerModal?.classList.contains(
          "active"
        )
      ) {

        closePartner();

      }


      const destinationModal =
        document.querySelector(
          "#destinationExperience"
        );


      if (
        destinationModal?.classList.contains(
          "active"
        )
      ) {

        destinationModal.classList.remove(
          "active"
        );

        destinationModal.setAttribute(
          "aria-hidden",
          "true"
        );

        unlockBody();

      }

    }
  );

});
