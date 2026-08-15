const form = document.querySelector("#search");
const result = document.querySelector("#result");
const cards = [...document.querySelectorAll(".card")];
const where = document.querySelector("#where");
const kind = document.querySelector("#kind");
const partnerBtn = document.querySelector("#partnerBtn");

// Explore / Search
if (form) {
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

                                                                                          card.style.display = show ? "block" : "none";

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
