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
    const place = (card.dataset.place || "").toLowerCase();
    const cardType = (card.dataset.type || "").toLowerCase();

    const locationMatch =
      !location ||
      place.includes(location) ||
      location.includes(place);

    const typeMatch =
      !type ||
      type === "all" ||
      cardType === type.toLowerCase();

    if (locationMatch && typeMatch) {
      card.style.display = "";
      visible++;
    } else {
      card.style.display = "none";
    }
  });

  if (visible === 0) {
    result.textContent =
      "No places found. Try another Himalayan destination.";
  } else {
    result.textContent =
      `${visible} ${visible === 1 ? "place" : "places"} found`;
  }

  result.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});


// =========================
// RESET SEARCH WHEN INPUTS CHANGE
// =========================

where.addEventListener("input", resetSearch);
kind.addEventListener("change", resetSearch);

function resetSearch() {
  cards.forEach(card => {
    card.style.display = "";
  });

  result.textContent = "";
}


// =========================
// PROPERTY MODAL
// =========================

function openPropertyModal() {
  if (!propertyModal) return;

  propertyModal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closePropertyModal() {
  if (!propertyModal) return;

  propertyModal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

cards.forEach(card => {
  card.addEventListener("click", function () {
    openPropertyModal();
  });
});

if (modalClose) {
  modalClose.addEventListener("click", closePropertyModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closePropertyModal);
}


// =========================
// PARTNER MODAL
// =========================

function openPartnerModal() {
  if (!partnerModal) return;

  partnerModal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closePartnerModal() {
  if (!partnerModal) return;

  partnerModal.classList.remove("active");
  document.body.classList.remove("modal-open");
}

if (listPlaceBtn) {
  listPlaceBtn.addEventListener("click", openPartnerModal);
}

if (partnerBtn) {
  partnerBtn.addEventListener("click", openPartnerModal);
}

if (partnerClose) {
  partnerClose.addEventListener("click", closePartnerModal);
}

if (partnerBackdrop) {
  partnerBackdrop.addEventListener("click", closePartnerModal);
}


// =========================
// PARTNER FORM
// =========================

if (partnerForm) {
  partnerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (partnerMessage) {
      partnerMessage.textContent =
        "Thank you! Your listing request has been received. The HimVoya team will contact you soon.";
    }

    partnerForm.reset();
  });
}


// =========================
// ESC KEY CLOSES MODALS
// =========================

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePropertyModal();
    closePartnerModal();
  }
});


// =========================
// PROPERTY ACTION BUTTONS
// =========================

document.addEventListener("click", function (e) {

  if (e.target.matches("#checkAvailability")) {
    alert(
      "Availability enquiries will be connected to the property partner soon."
    );
  }

  if (e.target.matches("#sendEnquiry")) {
    openPartnerModal();
  }

});


// =========================
// INITIAL STATE
// =========================

cards.forEach(card => {
  card.style.cursor = "pointer";
});
