const form = document.querySelector("#search");
const result = document.querySelector("#result");
const cards = [...document.querySelectorAll(".card")];
const where = document.querySelector("#where");
const kind = document.querySelector("#kind");

const listPlaceBtn = document.querySelector("#listPlaceBtn");
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

const partnerModal = document.querySelector("#partnerModal");
const partnerBackdrop = document.querySelector("#partnerBackdrop");
const partnerClose = document.querySelector("#partnerClose");
const partnerForm = document.querySelector("#partnerForm");
const partnerFormMessage = document.querySelector("#partnerFormMessage");

let selectedProperty = null;


// ==============================
// SEARCH / EXPLORE
// ==============================

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const query = where.value.trim().toLowerCase();
    const type = kind.value;

    let matches = 0;

    cards.forEach((card) => {
      const place = (card.dataset.place || "").toLowerCase();
      const cardType = card.dataset.type || "all";

      const placeMatch =
        !query ||
        place.includes(query) ||
        (query.includes("himachal") && place === "himachal");

      const typeMatch =
        type === "all" || cardType === type;

      const show = placeMatch && typeMatch;

      card.style.display = show ? "" : "none";

      if (show) {
        matches++;
      }
    });

    const stays = document.querySelector("#stays");

    if (stays) {
      stays.scrollIntoView({
        behavior: "smooth"
      });
    }

    if (matches) {
      result.textContent =
        `${matches} matching place${matches > 1 ? "s" : ""} found.`;
    } else {
      result.textContent =
        "No exact match yet — try Chamba or Himachal.";
    }
  });
}


// ==============================
// RESET SEARCH
// ==============================

if (where) {
  where.addEventListener("input", function () {
    if (!where.value.trim()) {
      cards.forEach((card) => {
        card.style.display = "";
      });

      if (result) {
        result.textContent = "";
      }
    }
  });
}


// ==============================
// PROPERTY DATA
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

    if (modalCategory) {
      modalCategory.textContent = data.category;
    }

    if (modalTitle) {
      modalTitle.textContent = name;
    }

    if (modalLocation) {
      modalLocation.textContent = data.location;
    }

    if (modalDescription) {
      modalDescription.textContent = data.description;
    }

    if (modalPrice) {
      modalPrice.textContent = data.price;
    }

    if (modalImage) {
      modalImage.style.backgroundImage =
        `url("${data.image}")`;
    }

    if (modalMessage) {
      modalMessage.textContent = "";
    }

    if (propertyModal) {
      propertyModal.classList.add("active");

      propertyModal.setAttribute(
        "aria-hidden",
        "false"
      );
    }

    document.body.classList.add("modal-open");

  });

});


// ==============================
// CLOSE PROPERTY MODAL
// ==============================

function closePropertyModal() {

  if (propertyModal) {
    propertyModal.classList.remove("active");

    propertyModal.setAttribute(
      "aria-hidden",
      "true"
    );
  }

  document.body.classList.remove("modal-open");
}


if (modalClose) {
  modalClose.addEventListener(
    "click",
    closePropertyModal
  );
}


if (modalBackdrop) {
  modalBackdrop.addEventListener(
    "click",
    closePropertyModal
  );
}


// ==============================
// ESCAPE KEY
// ==============================

document.addEventListener(
  "keydown",
  function (e) {

    if (e.key !== "Escape") {
      return;
    }

    if (
      propertyModal &&
      propertyModal.classList.contains("active")
    ) {
      closePropertyModal();
    }

    if (
      partnerModal &&
      partnerModal.classList.contains("active")
    ) {
      closePartnerModal();
    }

  }
);


// ==============================
// CHECK AVAILABILITY
// ==============================

if (availabilityBtn) {

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

}


// ==============================
// SEND ENQUIRY
// ==============================

if (enquiryBtn) {

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

}


// ==============================
// PARTNER MODAL
// ==============================

function openPartnerModal() {

  if (!partnerModal) {
    return;
  }

  partnerModal.classList.add("active");

  partnerModal.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add("modal-open");

  if (partnerFormMessage) {
    partnerFormMessage.textContent = "";
  }

  setTimeout(() => {
    document.querySelector("#partnerName")?.focus();
  }, 100);

}


function closePartnerModal() {

  if (partnerModal) {
    partnerModal.classList.remove("active");

    partnerModal.setAttribute(
      "aria-hidden",
      "true"
    );
  }

  document.body.classList.remove("modal-open");

}


// ==============================
// LIST YOUR PLACE
// ==============================

if (listPlaceBtn) {

  listPlaceBtn.addEventListener(
    "click",
    function (e) {

      e.preventDefault();

      openPartnerModal();

    }
  );

}


// ==============================
// BECOME A PARTNER
// ==============================

if (partnerBtn) {

  partnerBtn.addEventListener(
    "click",
    function () {

      openPartnerModal();

    }
  );

}


// ==============================
// CLOSE PARTNER MODAL
// ==============================

if (partnerClose) {

  partnerClose.addEventListener(
    "click",
    closePartnerModal
  );

}


if (partnerBackdrop) {

  partnerBackdrop.addEventListener(
    "click",
    closePartnerModal
  );

}


// ==============================
// PARTNER FORM SUBMIT
// ==============================

if (partnerForm) {

  partnerForm.addEventListener(
    "submit",
    function (e) {

      e.preventDefault();

      const formData = new FormData(partnerForm);

      const getValue = (name) => {
        const value = formData.get(name);
        return value ? String(value).trim() : "";
      };

      const propertyName = getValue("propertyName");
      const ownerName = getValue("ownerName");
      const location = getValue("location");
      const type = getValue("type");
      const price = getValue("price");
      const phone = getValue("phone");
      const email = getValue("email");
      const description = getValue("description");


      // ==========================
      // VALIDATION
      // ==========================

      if (
        !propertyName ||
        !ownerName ||
        !location ||
        !type ||
        !price ||
        !phone ||
        !email ||
        !description
      ) {

        partnerFormMessage.textContent =
          "Please complete all fields before submitting.";

        return;
      }


      // ==========================
      // EMAIL VALIDATION
      // ==========================

      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {

        partnerFormMessage.textContent =
          "Please enter a valid email address.";

        return;
      }


      // ==========================
      // PHONE VALIDATION
      // ==========================

      const phoneDigits =
        phone.replace(/\D/g, "");

      if (phoneDigits.length < 10) {

        partnerFormMessage.textContent =
          "Please enter a valid phone number.";

        return;
      }


      // ==========================
      // SAVE LISTING LOCALLY
      // ==========================

      const listing = {
        propertyName,
        ownerName,
        location,
        type,
        price,
        phone,
        email,
        description,
        submittedAt: new Date().toISOString()
      };

      const existingListings =
        JSON.parse(
          localStorage.getItem("himvoyaListings") || "[]"
        );

      existingListings.push(listing);

      localStorage.setItem(
        "himvoyaListings",
        JSON.stringify(existingListings)
      );


      // ==========================
      // SUCCESS MESSAGE
      // ==========================

      partnerFormMessage.textContent =
        "Thank you! Your place has been submitted to HimVoya. Our team will review your listing and contact you soon.";

      partnerForm.reset();

    }
  );

}


// ==============================
// MODAL BACKDROP CLICK
// ==============================

document.addEventListener(
  "click",
  function (e) {

    if (
      propertyModal &&
      e.target === propertyModal
    ) {
      closePropertyModal();
    }

    if (
      partnerModal &&
      e.target === partnerModal
    ) {
      closePartnerModal();
    }

  }
);


// ==============================
// PREVENT MODAL CONTENT CLICKS
// ==============================

document.querySelectorAll(
  ".modal-content"
).forEach((content) => {

  content.addEventListener(
    "click",
    function (e) {
      e.stopPropagation();
    }
  );

});


// ==============================
// PAGE READY
// ==============================

console.log(
  "HimVoya platform loaded successfully."
);
