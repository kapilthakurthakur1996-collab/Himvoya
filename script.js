@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: #f6f4ed;
  color: #18251e;
  font-family: 'DM Sans', sans-serif;
}

body.modal-open {
  overflow: hidden;
}


/* =========================
   NAVIGATION
========================= */

.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 76px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 6%;
  color: #fff;
}

.logo {
  font-size: 23px;
  font-weight: 700;
}

.logo i {
  display: inline-grid;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-family: Georgia;
  margin-right: 8px;
}

.nav nav {
  display: flex;
  gap: 28px;
  font-size: 14px;
}

.nav a {
  text-decoration: none;
  color: inherit;
}

.outline {
  border: 1px solid #ffffff80;
  padding: 11px 17px;
  border-radius: 30px;
  font-size: 13px;
  cursor: pointer;
}


/* =========================
   HERO
========================= */

.hero {
  height: 88vh;
  min-height: 700px;
  position: relative;
  color: white;
  background: url('https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=85') center/cover;
}

.shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    #07130ddd,
    #07130d70,
    #07130d20
  );
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: 88%;
  max-width: 1120px;
  margin: auto;
  padding-top: 190px;
}

.eyebrow {
  font-size: 11px;
  letter-spacing: 2.4px;
  font-weight: 700;
  margin: 0 0 18px;
}

.hero h1 {
  font-size: clamp(52px, 7vw, 88px);
  line-height: .95;
  letter-spacing: -3px;
  margin: 0 0 24px;
}

.hero em,
h2 em {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

.lead {
  max-width: 570px;
  font-size: 17px;
  line-height: 1.6;
  color: #e5ece7;
}


/* =========================
   SEARCH
========================= */

.search {
  margin-top: 32px;
  background: white;
  color: #18251e;
  border-radius: 16px;
  padding: 8px;
  max-width: 800px;
  display: flex;
  box-shadow: 0 20px 50px #0004;
}

.search > div {
  flex: 1;
  padding: 7px 18px;
  border-right: 1px solid #ddd;
}

.search label {
  display: block;
  font-size: 9px;
  letter-spacing: 1.5px;
  font-weight: 700;
  color: #6b756e;
}

.search input,
.search select {
  border: 0;
  outline: 0;
  width: 100%;
  font: inherit;
  margin-top: 5px;
  background: white;
}

.search button,
#partner button {
  border: 0;
  border-radius: 11px;
  background: #1d392a;
  color: white;
  padding: 0 24px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
}

.hero-inner > #result {
  font-size: 13px;
  min-height: 18px;
}

.scroll {
  position: absolute;
  bottom: 28px;
  left: 6%;
  font-size: 10px;
  letter-spacing: 2px;
}


/* =========================
   GENERAL SECTIONS
========================= */

.section {
  padding: 100px 7%;
  max-width: 1400px;
  margin: auto;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 50px;
  margin-bottom: 48px;
}

.head > p {
  max-width: 430px;
  color: #68736d;
  line-height: 1.7;
}

.dark {
  color: #69766e;
}

.section h2,
.dark-section h2,
.partner h2 {
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1.02;
  letter-spacing: -2px;
  margin: 0;
}


/* =========================
   PROPERTY CARDS
========================= */

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.card {
  background: white;
  border: 1px solid #e4e1d8;
  border-radius: 16px;
  overflow: hidden;
  transition: .25s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 40px #17201916;
}

.photo {
  height: 320px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.photo span {
  position: absolute;
  top: 15px;
  left: 15px;
  background: white;
  border-radius: 20px;
  padding: 7px 10px;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 1px;
}

.p1 {
  background-image: url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80');
}

.p2 {
  background-image: url('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80');
}

.p3 {
  background-image: url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=80');
}

.body {
  padding: 23px;
}

.body small {
  color: #718077;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.body h3 {
  font-size: 23px;
  margin: 8px 0;
}

.body p {
  color: #68736d;
  line-height: 1.6;
  font-size: 14px;
  min-height: 45px;
}

.body footer {
  border-top: 1px solid #e7e4db;
  padding-top: 15px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #69756d;
}

.body strong {
  color: #1c2d23;
}


/* =========================
   DARK SECTION
========================= */

.dark-section {
  background: #18251e;
  color: white;
  max-width: none;
  padding: 100px 7%;
}

.dark-section p {
  color: #b9c4bd;
  line-height: 1.7;
}

.dark-section h2 {
  color: white;
}


/* =========================
   PARTNER MODAL
========================= */

.partner-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;

  opacity: 0;
  visibility: hidden;
  pointer-events: none;

  transition:
    opacity 0.25s ease,
    visibility 0.25s ease;
}

.partner-modal.active {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.partner-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(7, 19, 13, 0.72);
  backdrop-filter: blur(8px);
}

.partner-dialog {
  position: relative;
  z-index: 1;

  width: min(720px, 100%);
  max-height: 92vh;
  overflow-y: auto;

  background: #fdfcf8;
  color: #18251e;

  border-radius: 24px;
  border: 1px solid #ffffff;

  box-shadow:
    0 30px 90px rgba(0, 0, 0, 0.28);

  transform: translateY(18px) scale(.98);

  transition:
    transform 0.25s ease;
}

.partner-modal.active .partner-dialog {
  transform: translateY(0) scale(1);
}

.partner-close {
  position: absolute;
  top: 18px;
  right: 18px;

  width: 42px;
  height: 42px;

  border: 1px solid #deddd5;
  border-radius: 50%;

  background: rgba(255, 255, 255, .92);
  color: #18251e;

  font-size: 25px;
  line-height: 1;

  cursor: pointer;
  z-index: 3;

  transition: .2s;
}

.partner-close:hover {
  background: #18251e;
  color: white;
}

.partner-content {
  padding: 48px;
}

.partner-content .eyebrow {
  margin-bottom: 12px;
}

.partner-content h2 {
  font-family: 'Playfair Display', serif;

  font-size: clamp(38px, 6vw, 58px);
  line-height: 1;

  letter-spacing: -1.8px;

  margin: 0 55px 14px 0;
}

.partner-content > p:not(.eyebrow) {
  color: #68736d;

  line-height: 1.65;

  max-width: 560px;

  margin: 0 0 30px;
}


/* =========================
   PARTNER FORM
========================= */

#partnerForm {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 18px 16px;
}

#partnerForm label {
  display: block;

  grid-column: span 2;

  margin: 3px 0 -8px;

  color: #66736b;

  font-size: 10px;

  font-weight: 700;

  letter-spacing: 1.5px;
}

#partnerForm input,
#partnerForm select,
#partnerForm textarea {
  width: 100%;

  border: 1px solid #dcdcd3;

  border-radius: 12px;

  background: #fff;

  color: #18251e;

  font: inherit;

  outline: none;

  transition:
    border-color .2s,
    box-shadow .2s;
}

#partnerForm input,
#partnerForm select {
  height: 52px;

  padding: 0 15px;
}

#partnerForm textarea {
  min-height: 130px;

  padding: 14px 15px;

  resize: vertical;

  line-height: 1.55;
}

#partnerForm input::placeholder,
#partnerForm textarea::placeholder {
  color: #9aa19c;
}

#partnerForm input:focus,
#partnerForm select:focus,
#partnerForm textarea:focus {
  border-color: #426650;

  box-shadow:
    0 0 0 4px rgba(66, 102, 80, .10);
}


/* TWO COLUMN FIELDS */

#partnerName,
#propertyName,
#propertyLocation,
#propertyType,
#propertyPrice,
#partnerPhone {
  grid-column: span 1;
}


/* DESCRIPTION */

#propertyDescription {
  grid-column: span 2;
}


/* =========================
   SUBMIT BUTTON
========================= */

#partnerForm .primary-action {
  grid-column: span 2;

  min-height: 54px;

  margin-top: 4px;

  border: 0;

  border-radius: 13px;

  background: #1d392a;

  color: white;

  font: inherit;

  font-weight: 700;

  font-size: 14px;

  cursor: pointer;

  box-shadow:
    0 10px 25px rgba(29, 57, 42, .18);

  transition:
    transform .2s,
    background .2s,
    box-shadow .2s;
}

#partnerForm .primary-action:hover {
  background: #254936;

  transform: translateY(-2px);

  box-shadow:
    0 14px 30px rgba(29, 57, 42, .24);
}

#partnerForm .primary-action:active {
  transform: translateY(0);
}


/* FORM MESSAGE */

#partnerMessage {
  grid-column: span 2;

  margin: 0;

  text-align: center;
}


/* FORM NOTE */

#partnerForm::after {
  content:
    "By submitting, you agree to let HimVoya contact you about your listing.";

  grid-column: span 2;

  text-align: center;

  color: #8a928d;

  font-size: 11px;

  line-height: 1.5;

  margin-top: -6px;
}


/* =========================
   RESPONSIVE
========================= */

@media (max-width: 900px) {

  .cards {
    grid-template-columns: repeat(2, 1fr);
  }

  .photo {
    height: 260px;
  }

}


@media (max-width: 600px) {

  .nav {
    padding: 0 5%;
  }

  .nav nav {
    display: none;
  }

  .outline {
    padding: 10px 14px;
  }

  .hero {
    min-height: 650px;
  }

  .hero-inner {
    width: 90%;
    padding-top: 150px;
  }

  .hero h1 {
    font-size: 52px;
  }

  .search {
    flex-direction: column;
    gap: 6px;
  }

  .search > div {
    border-right: 0;
    border-bottom: 1px solid #ddd;
    padding: 12px 14px;
  }

  .search button {
    min-height: 50px;
  }

  .section {
    padding: 70px 5%;
  }

  .head {
    display: block;
  }

  .head > p {
    margin-top: 25px;
  }

  .cards {
    grid-template-columns: 1fr;
    gap: 18px;
  }

  .photo {
    height: 240px;
  }

  .body {
    padding: 19px;
  }

  .body h3 {
    font-size: 21px;
  }

  .body p {
    min-height: auto;
  }


  /* PARTNER MODAL MOBILE */

  .partner-modal {
    padding: 12px;

    align-items: flex-end;
  }

  .partner-dialog {
    width: 100%;

    max-height: 94vh;

    border-radius:
      22px 22px 16px 16px;
  }

  .partner-content {
    padding: 34px 20px 24px;
  }

  .partner-close {
    top: 13px;
    right: 13px;

    width: 38px;
    height: 38px;

    font-size: 22px;
  }

  .partner-content h2 {
    font-size: 40px;

    margin-right: 45px;
  }

  .partner-content > p:not(.eyebrow) {
    font-size: 14px;

    margin-bottom: 25px;
  }

  #partnerForm {
    grid-template-columns: 1fr;

    gap: 15px;
  }

  #partnerForm label,
  #partnerName,
  #propertyName,
  #propertyLocation,
  #propertyType,
  #propertyPrice,
  #partnerPhone,
  #propertyDescription,
  #partnerForm .primary-action,
  #partnerMessage,
  #partnerForm::after {
    grid-column: span 1;
  }

  #partnerForm label {
    margin-bottom: -7px;
  }

  #partnerForm input,
  #partnerForm select {
    height: 50px;
  }

  #propertyDescription {
    min-height: 120px;
  }

}
