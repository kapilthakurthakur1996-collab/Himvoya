                    const form = document.querySelector("#search");
const result = document.querySelector("#result");
const cards = [...document.querySelectorAll(".card")];
const where = document.querySelector("#where");
const kind = document.querySelector("#kind");
const partnerBtn = document.querySelector("#partnerBtn");

// ===============================
// HIMVOYA SEARCH
// ===============================

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const query = where.value.trim().toLowerCase();
  const type = kind.value;

  let matches = 0;

  cards.forEach((card) => {
    const place = (card.dataset.place || "").toLowerCase();
    const cardType = card.dataset.type || "";

    const placeMatch =
      !query ||
      place.includes(query) ||
      (query.includes("himachal") && place === "himachal");

    const typeMatch =
      type === "all" || cardType === type;

    const show = placeMatch && typeMatch;

    card.style.display = show ? "" : "none";

    if (show) matches++;
  });

  document.querySelector("#stays").scrollIntoView({
    behavior: "smooth"
  });

  if (matches) {
    result.textContent =
      `${matches} matching ${matches === 1 ? "place" : "places"} found.`;
  } else {
    result.textContent =
      "No exact match yet — try Chamba or Himachal.";
  }
});

// ===============================
// RESET SEARCH
// ===============================

where.addEventListener("input", function () {
  if (!where.value.trim()) {
    cards.forEach((card) => {
      card.style.display = "";
    });

    result.textContent = "";
  }
});

// ===============================
// PROPERTY DETAILS
// ===============================

cards.forEach((card) => {
  card.style.cursor = "pointer";

  card.addEventListener("click", function () {
    const name =
      card.querySelector("h3")?.textContent ||
      "HimVoya Stay";

    const description =
      card.querySelector(".body p")?.textContent ||
      "A beautiful Himalayan stay.";

    const location =
      card.querySelector("footer span")?.textContent ||
      "Himachal Pradesh";

    const price =
      card.querySelector("footer strong")?.textContent ||
      "Contact for price";

    openPropertyModal({
      name,
      description,
      location,
      price
    });
  });
});

// ===============================
// PROPERTY MODAL
// ===============================

function openPropertyModal(property) {
  const existing = document.querySelector(".himvoya-modal");

  if (existing) {
    existing.remove();
  }

  const modal = document.createElement("div");

  modal.className = "himvoya-modal";

  modal.innerHTML = `
    <div class="modal-overlay"></div>

    <div class="modal-box">
      <button class="modal-close" aria-label="Close">×</button>

      <p class="eyebrow dark">HIMVOYA PROPERTY</p>

      <h2>${property.name}</h2>

      <p class="modal-location">
        ${property.location}
      </p>

      <p class="modal-description">
        ${property.description}
      </p>

      <div class="modal-price">
        ${property.price}
      </div>

      <div class="modal-actions">
        <button class="modal-enquire">
          Enquire Now →
        </button>
      </div>

      <p class="modal-note">
        Direct enquiries with Himalayan hosts are coming to HimVoya.
      </p>
    </div>
  `;

  document.body.appendChild(modal);

  document.body.style.overflow = "hidden";

  const closeModal = () => {
    modal.remove();
    document.body.style.overflow = "";
  };

  modal
    .querySelector(".modal-close")
    .addEventListener("click", closeModal);

  modal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeModal);

  modal
    .querySelector(".modal-enquire")
    .addEventListener("click", function () {
      openEnquiryModal(property);
    });
}

// ===============================
// ENQUIRY FORM
// ===============================

function openEnquiryModal(property) {
  const oldModal = document.querySelector(".himvoya-modal");

  if (oldModal) {
    oldModal.remove();
  }

  const modal = document.createElement("div");

  modal.className = "himvoya-modal";

  modal.innerHTML = `
    <div class="modal-overlay"></div>

    <div class="modal-box">
      <button class="modal-close" aria-label="Close">×</button>

      <p class="eyebrow dark">SEND AN ENQUIRY</p>

      <h2>${property.name}</h2>

      <form class="enquiry-form">

        <input
          type="text"
          name="name"
          placeholder="Your name"
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile number"
          required
        />

        <div class="form-row">

          <input
            type="date"
            name="checkin"
            required
          />

          <input
            type="date"
            name="checkout"
            required
          />

        </div>

        <select name="guests" required>
          <option value="">Number of guests</option>
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4">4 guests</option>
          <option value="5+">5+ guests</option>
        </select>

        <textarea
          name="message"
          placeholder="Tell the host anything important..."
          rows="4"
        ></textarea>

        <button type="submit">
          Send Enquiry →
        </button>

      </form>
    </div>
  `;

  document.body.appendChild(modal);

  document.body.style.overflow = "hidden";

  const closeModal = () => {
    modal.remove();
    document.body.style.overflow = "";
  };

  modal
    .querySelector(".modal-close")
    .addEventListener("click", closeModal);

  modal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeModal);

  modal
    .querySelector(".enquiry-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this);

      const name = formData.get("name");

      modal.querySelector(".modal-box").innerHTML = `
        <div class="success-message">

          <div class="success-icon">✓</div>

          <p class="eyebrow dark">
            ENQUIRY RECEIVED
          </p>

          <h2>Thanks, ${name}.</h2>

          <p>
            Your enquiry for
            <strong>${property.name}</strong>
            has been prepared successfully.
          </p>

          <p class="modal-note">
            The live partner notification system will be connected in the next stage.
          </p>

          <button class="modal-enquire close-success">
            Done
          </button>

        </div>
      `;

      modal
        .querySelector(".close-success")
        .addEventListener("click", closeModal);
    });
}

// ===============================
// PARTNER BUTTON
// ===============================

partnerBtn.addEventListener("click", function () {
  openPartnerModal();
});

// ===============================
// PARTNER FORM
// ===============================

function openPartnerModal() {
  const existing = document.querySelector(".himvoya-modal");

  if (existing) {
    existing.remove();
  }

  const modal = document.createElement("div");

  modal.className = "himvoya-modal";

  modal.innerHTML = `
    <div class="modal-overlay"></div>

    <div class="modal-box">

      <button class="modal-close" aria-label="Close">
        ×
      </button>

      <p class="eyebrow dark">
        HIMVOYA PARTNERS
      </p>

      <h2>List your place.</h2>

      <p class="modal-description">
        Tell us about your hotel, homestay or Himalayan experience.
      </p>

      <form class="partner-form">

        <input
          type="text"
          placeholder="Property / business name"
          required
        />

        <input
          type="text"
          placeholder="Owner / contact person"
          required
        />

        <input
          type="tel"
          placeholder="Mobile number"
          required
        />

        <input
          type="text"
          placeholder="Location"
          required
        />

        <select required>
          <option value="">Business type</option>
          <option>Hotel</option>
          <option>Homestay</option>
          <option>Resort</option>
          <option>Camp / Glamping</option>
          <option>Local Experience</option>
          <option>Travel Company</option>
        </select>

        <textarea
          placeholder="Tell us about your property or experience..."
          rows="4"
          required
        ></textarea>

        <button type="submit">
          Submit Partnership Request →
        </button>

      </form>

    </div>
  `;

  document.body.appendChild(modal);

  document.body.style.overflow = "hidden";

  const closeModal = () => {
    modal.remove();
    document.body.style.overflow = "";
  };

  modal
    .querySelector(".modal-close")
    .addEventListener("click", closeModal);

  modal
    .querySelector(".modal-overlay")
    .addEventListener("click", closeModal);

  modal
    .querySelector(".partner-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      modal.querySelector(".modal-box").innerHTML = `
        <div class="success-message">

          <div class="success-icon">✓</div>

          <p class="eyebrow dark">
            THANK YOU
          </p>

          <h2>You're on the list.</h2>

          <p>
            Your partnership request has been captured successfully.
          </p>

          <p class="modal-note">
            The partner dashboard and direct onboarding system will be connected next.
          </p>

          <button class="modal-enquire close-success">
            Done
          </button>

        </div>
      `;

      modal
        .querySelector(".close-success")
        .addEventListener("click", closeModal);
    });
}                                                                                              });

                                                                                                                      const stays = document.querySelector("#stays");

                                                                                                                          if (stays) {
                                                                                                                                stays.scrollIntoView({
                                                                                                                                        behavior: "smooth"
                                                                                                                                              });
                                                                                                                                                  }

                                                                                                                                                      if (result) {
                                                                                                                                                            if (matches) {
                                                                                                                                                                    result.textContent =
                                                                                                                                                                              `${matches} matching place${matches > 1 ? "s" : ""} found.`;
                                                                                                                                                                                    } else {
                                                                                                                                                                                            result.textContent =
                                                                                                                                                                                                      "No exact match yet — try Chamba or Himachal.";
                                                                                                                                                                                                            }
                                                                                                                                                                                                                }
                                                                                                                                                                                                                  });
                                                                                                                                                                                                                  }

                                                                                                                                                                                                                  // Reset when search box is cleared
                                                                                                                                                                                                                  if (where) {
                                                                                                                                                                                                                    where.addEventListener("input", function () {
                                                                                                                                                                                                                        if (!where.value.trim()) {
                                                                                                                                                                                                                              cards.forEach((card) => {
                                                                                                                                                                                                                                      card.style.display = "block";
                                                                                                                                                                                                                                            });

                                                                                                                                                                                                                                                  if (result) {
                                                                                                                                                                                                                                                          result.textContent = "";
                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                      });
                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                      // Property card interaction
                                                                                                                                                                                                                                                                      cards.forEach((card) => {
                                                                                                                                                                                                                                                                        card.style.cursor = "pointer";

                                                                                                                                                                                                                                                                          card.addEventListener("click", function () {
                                                                                                                                                                                                                                                                              const name =
                                                                                                                                                                                                                                                                                    card.querySelector("h3")?.textContent ||
                                                                                                                                                                                                                                                                                          "HimVoya Stay";

                                                                                                                                                                                                                                                                                              const description =
                                                                                                                                                                                                                                                                                                    card.querySelector(".body p")?.textContent ||
                                                                                                                                                                                                                                                                                                          "A beautiful Himalayan stay.";

                                                                                                                                                                                                                                                                                                              const location =
                                                                                                                                                                                                                                                                                                                    card.querySelector("footer span")?.textContent ||
                                                                                                                                                                                                                                                                                                                          "Himachal Pradesh";

                                                                                                                                                                                                                                                                                                                              const price =
                                                                                                                                                                                                                                                                                                                                    card.querySelector("footer strong")?.textContent ||
                                                                                                                                                                                                                                                                                                                                          "Contact for price";

                                                                                                                                                                                                                                                                                                                                              alert(
                                                                                                                                                                                                                                                                                                                                                    `${name}\n\n${description}\n\nLocation: ${location}\n${price}\n\nHimVoya enquiry system is coming next.`
                                                                                                                                                                                                                                                                                                                                                        );
                                                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                                                          });

                                                                                                                                                                                                                                                                                                                                                          // Partner button
                                                                                                                                                                                                                                                                                                                                                          if (partnerBtn) {
                                                                                                                                                                                                                                                                                                                                                            partnerBtn.addEventListener("click", function () {
                                                                                                                                                                                                                                                                                                                                                                const partner = document.querySelector("#partner");

                                                                                                                                                                                                                                                                                                                                                                    if (partner) {
                                                                                                                                                                                                                                                                                                                                                                          partner.scrollIntoView({
                                                                                                                                                                                                                                                                                                                                                                                  behavior: "smooth"
                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                setTimeout(() => {
                                                                                                                                                                                                                                                                                                                                                                                                      alert(
                                                                                                                                                                                                                                                                                                                                                                                                              "Welcome to HimVoya Partners!\n\nHotel, homestay or local experience owners will soon be able to submit their property directly."
                                                                                                                                                                                                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                                                                                                                                                                                                        }, 500);
                                                                                                                                                                                                                                                                                                                                                                                                                          });
                                                                                                                                                                                                                                                                                                                                                                                                                          });
