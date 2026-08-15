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

const partnerModal = document.querySelector("#partnerModal");
const partnerBackdrop = document.querySelector("#partnerBackdrop");
const partnerClose = document.querySelector("#partnerClose");

const partnerForm = document.querySelector("#partnerForm");
const partnerMessage = document.querySelector("#partnerMessage");


// =========================
// PROPERTY SEARCH
// =========================

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const location = where.value.trim().toLowerCase();
  const type = kind.value;

  let visible = 0;

  cards.forEach(card => {
    const place = card.dataset.place.toLowerCase();
    const cardType = card.dataset.type;

    const locationMatch =
      !location ||
      place.includes(location) ||
      location.includes(place);

    const typeMatch =
      type === "all" ||
      cardType === type;

    if (locationMatch && typeMatch) {
      card.style.display = "";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  if (!location && type === "all") {
    result.textContent = "";
    return;
  }

  result.textContent =
    visible > 0
      ? `${visible} result${visible > 1 ? "s" : ""} found`
      : "No matching stays or experiences found.";
});


// =========================
// PARTNER MODAL
// =========================

function openPartnerModal() {
  if (!partnerModal) return;

  partnerModal.classList.add("open");
  partnerModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closePartnerModal() {
  if (!partnerModal) return;

  partnerModal.classList.remove("open");
  partnerModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

if (listPlaceBtn) {
  listPlaceBtn.addEventListener("click", function (e) {
    e.preventDefault();
    openPartnerModal();
  });
}

if (partnerBtn) {
  partnerBtn.addEventListener("click", function () {
    openPartnerModal();
  });
}

if (partnerBackdrop) {
  partnerBackdrop.addEventListener("click", closePartnerModal);
}

if (partnerClose) {
  partnerClose.addEventListener("click", closePartnerModal);
}


// =========================
// PARTNER FORM
// =========================

if (partnerForm) {
  partnerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#partnerName").value.trim();
    const property = document.querySelector("#propertyName").value.trim();

    if (!name || !property) {
      partnerMessage.textContent =
        "Please complete all required details.";
      return;
    }

    partnerMessage.textContent =
      `Thanks ${name}! Your listing request for "${property}" has been received.`;

    partnerForm.reset();
  });
}


// =========================
// PROPERTY DETAIL MODAL
// =========================

function openPropertyModal(card) {
  if (!propertyModal) return;

  const title = card.querySelector("h3")?.textContent || "";
  const description = card.querySelector("p")?.textContent || "";
  const location =
    card.querySelector("footer span")?.textContent || "";
  const price =
    card.querySelector("footer strong")?.textContent || "";
  const category =
    card.querySelector("small")?.textContent || "Mountain Stay";

  const photo = card.querySelector(".photo");

  const modalTitle = document.querySelector("#modalTitle");
  const modalDescription =
    document.querySelector("#modalDescription");
  const modalLocation =
    document.querySelector("#modalLocation");
  const modalPrice =
    document.querySelector("#modalPrice");
  const modalCategory =
    document.querySelector("#modalCategory");
  const modalImage =
    document.querySelector("#modalImage");

  modalTitle.textContent = title;
  modalDescription.textContent = description;
  modalLocation.textContent = location;
  modalPrice.textContent = price;
  modalCategory.textContent = category;

  if (photo && modalImage) {
    modalImage.className = "modal-image";
    modalImage.classList.add(
      ...[...photo.classList].filter(
        className => className !== "photo"
      )
    );
  }

  propertyModal.classList.add("open");
  propertyModal.setAttribute("aria-hidden", "false");

  document.body.style.overflow = "hidden";
}

function closePropertyModal() {
  if (!propertyModal) return;

  propertyModal.classList.remove("open");
  propertyModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";
}

cards.forEach(card => {
  card.addEventListener("click", function () {
    openPropertyModal(card);
  });
});

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closePropertyModal);
}

if (modalClose) {
  modalClose.addEventListener("click", closePropertyModal);
}


// =========================
// ESC KEY
// =========================

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePropertyModal();
    closePartnerModal();
  }
});


// =========================
// MODAL ACTIONS
// =========================

const availabilityBtn =
  document.querySelector("#availabilityBtn");

const enquiryBtn =
  document.querySelector("#enquiryBtn");

const modalMessage =
  document.querySelector("#modalMessage");

if (availabilityBtn) {
  availabilityBtn.addEventListener("click", function () {
    modalMessage.textContent =
      "Availability requests will be connected to the property partner soon.";
  });
}

if (enquiryBtn) {
  enquiryBtn.addEventListener("click", function () {
    modalMessage.textContent =
      "Enquiry feature is coming soon.";
  });
});
