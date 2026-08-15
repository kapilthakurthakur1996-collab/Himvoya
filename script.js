const form = document.querySelector("#search");
const result = document.querySelector("#result");
const cards = [...document.querySelectorAll(".card")];
const where = document.querySelector("#where");
const kind = document.querySelector("#kind");
const partnerBtn = document.querySelector("#partnerBtn");

const propertyModal = document.querySelector("#propertyModal");
const modalBackdrop = document.querySelector("#modalBackdrop");
const modalClose = document.querySelector("#modalClose");

const modalImage = document.querySelector("#modalImage");
const modalCategory = document.querySelector("#modalCategory");
const modalTitle = document.querySelector("#modalTitle");
const modalLocation = document.querySelector("#modalLocation");
const modalDescription = document.querySelector("#modalDescription");
const modalPrice = document.querySelector("#modalPrice");

const availabilityBtn = document.querySelector("#availabilityBtn");
const enquiryBtn = document.querySelector("#enquiryBtn");
const modalMessage = document.querySelector("#modalMessage");

let selectedProperty = null;


// ==============================
// SEARCH / EXPLORE
// ==============================

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const query = where.value.trim().toLowerCase();
  const type = kind.value;

  let matches = 0;

  cards.forEach((card) => {
    const place = card.dataset.place.toLowerCase();
    const cardType = card.dataset.type;

    const placeMatch =
      !query ||
      place.includes(query) ||
      (query.includes("himachal") && place === "himachal");

    const typeMatch =
      type === "all" || cardType === type;

    const show = placeMatch && typeMatch;

    card.style.display = show ? "block" : "none";

    if (show) {
      matches++;
    }
  });

  document.querySelector("#stays").scrollIntoView({
    behavior: "smooth"
  });

  if (matches) {
    result.textContent =
      `${matches} matching place${matches > 1 ? "s" : ""} found.`;
  } else {
    result.textContent =
      "No exact match yet — try Chamba or Himachal.";
  }
});


// ==============================
// RESET SEARCH
// ==============================

where.addEventListener("input", function () {
  if (!where.value.trim()) {
    cards.forEach((card) => {
      card.style.display = "block";
    });

    result.textContent = "";
  }
});


// ==============================
// PROPERTY INFORMATION
// ==============================

const propertyData = {

  "Mountain View Retreat": {
    category: "VALLEY VIEW STAY",
    location: "Himachal Pradesh",
    price: "From ₹2,499 / night",

    description:
      "Quiet mornings, panoramic peaks and warm local hospitality. A peaceful Himalayan base for travellers looking to slow down and reconnect with the mountains.",

    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85"
  },


  "Forest Edge Boutique": {
    category: "BOUTIQUE MOUNTAIN STAY",
    location: "Chamba, Himachal Pradesh",
    price: "From ₹2,999 / night",

    description:
      "A peaceful base for slow travel, hikes and stargazing. Discover quiet mountain mornings, forest trails and the beauty of Chamba at your own pace.",

    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85"
  },


  "Riverside Haven": {
    category: "RIVERSIDE STAY",
    location: "Himachal Pradesh",
    price: "From ₹2,299 / night",

    description:
      "Wake up beside the river and explore hidden Himalayan villages. Designed for travellers who want nature, calm surroundings and authentic local experiences.",

    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85"
  }

};


// ==============================
// OPEN PROPERTY DETAIL
// ==============================

cards.forEach((card) => {

  card.style.cursor = "pointer";

  card.addEventListener("click", function () {

    const name =
      card.querySelector("h3")?.textContent.trim() ||
      "HimVoya Stay";

    const data = propertyData[name];

    if (!data) {
      return;
    }

    selectedProperty = {
      name,
      ...data
    };


    modalCategory.textContent = data.category;

    modalTitle.textContent = name;

    modalLocation.textContent = data.location;

    modalDescription.textContent = data.description;

    modalPrice.textContent = data.price;

    modalImage.style.backgroundImage =
      `url("${data.image}")`;

    modalMessage.textContent = "";


    propertyModal.classList.add("active");

    propertyModal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("modal-open");

  });

});


// ==============================
// CLOSE PROPERTY DETAIL
// ==============================

function closePropertyModal() {

  propertyModal.classList.remove("active");

  propertyModal.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove("modal-open");

}


modalClose.addEventListener(
  "click",
  closePropertyModal
);


modalBackdrop.addEventListener(
  "click",
  closePropertyModal
);


document.addEventListener(
  "keydown",
  function (e) {

    if (e.key === "Escape") {
      closePropertyModal();
    }

  }
);


// ==============================
// CHECK AVAILABILITY
// ==============================

availabilityBtn.addEventListener(
  "click",
  function () {

    if (!selectedProperty) {
      return;
    }

    modalMessage.textContent =
      `Availability request for ${selectedProperty.name} will be available soon.`;

  }
);


// ==============================
// SEND ENQUIRY
// ==============================

enquiryBtn.addEventListener(
  "click",
  function () {

    if (!selectedProperty) {
      return;
    }

    modalMessage.textContent =
      `Enquiry started for ${selectedProperty.name}. Direct partner enquiries are coming next.`;

  }
);


// ==============================
// PARTNER BUTTON
// ==============================

partnerBtn.addEventListener(
  "click",
  function () {

    document.querySelector("#partner").scrollIntoView({
      behavior: "smooth"
    });

    setTimeout(() => {

      alert(
        "Welcome to HimVoya Partners!\n\nHotel, homestay or local experience owners will soon be able to submit their property directly."
      );

    }, 500);

  }
);
