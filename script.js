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

  padding: 24px;

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

  background: rgba(7, 19, 13, .82);

  backdrop-filter: blur(10px);
}

.destination-dialog {
  position: relative;
  z-index: 1;

  width: min(1100px, 100%);
  max-height: 92vh;

  overflow-y: auto;

  background: #fdfcf8;
  color: #18251e;

  border-radius: 26px;

  box-shadow:
    0 40px 120px rgba(0,0,0,.35);

  transform:
    translateY(20px)
    scale(.98);

  transition: .25s ease;
}

#destinationExperience.active
.destination-dialog {
  transform:
    translateY(0)
    scale(1);
}


/* CLOSE */

.destination-close {
  position: absolute;

  top: 18px;
  right: 18px;

  z-index: 10;

  width: 44px;
  height: 44px;

  border: 1px solid rgba(255,255,255,.5);

  border-radius: 50%;

  background: rgba(255,255,255,.9);

  color: #18251e;

  font-size: 26px;

  cursor: pointer;
}

.destination-close:hover {
  background: #18251e;
  color: white;
}


/* HERO */

.destination-hero {
  position: relative;

  min-height: 400px;

  background-size: cover;
  background-position: center;

  display: flex;
  align-items: flex-end;

  color: white;
}

.destination-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      0deg,
      rgba(7,19,13,.9),
      rgba(7,19,13,.05)
    );
}

.destination-hero-content {
  position: relative;
  z-index: 1;

  padding: 55px;

  max-width: 750px;
}

.destination-hero-content h2 {
  margin: 0 0 12px;

  font-size:
    clamp(52px, 8vw, 90px);

  line-height: .95;

  letter-spacing: -3px;
}

.destination-hero-content p:last-child {
  font-size: 18px;

  color: #e5ece7;

  margin: 0;

  line-height: 1.5;
}


/* CONTENT */

.destination-content {
  padding: 42px;
}


/* AI GUIDE */

.ai-guide {
  display: flex;

  gap: 15px;

  padding: 20px;

  background: #eef1eb;

  border: 1px solid #dfe4dc;

  border-radius: 18px;

  margin-bottom: 35px;
}

.ai-guide-icon {
  flex: 0 0 46px;

  width: 46px;
  height: 46px;

  display: grid;
  place-items: center;

  border-radius: 50%;

  background: #1d392a;

  color: white;

  font-family: Georgia;
  font-size: 20px;
}

.ai-guide small {
  display: block;

  font-size: 9px;

  letter-spacing: 1.5px;

  font-weight: 700;

  color: #68736d;

  margin-bottom: 6px;
}

.ai-guide p {
  margin: 0;

  line-height: 1.6;

  color: #405047;
}


/* GRID */

.destination-grid {
  display: grid;

  grid-template-columns:
    minmax(0, 1.1fr)
    minmax(0, .9fr);

  gap: 45px;
}

.destination-grid h3 {
  font-size: 28px;

  margin: 0 0 20px;

  letter-spacing: -.5px;
}


/* QUESTION BUTTONS */

.question-buttons {
  display: flex;

  flex-wrap: wrap;

  gap: 10px;

  margin-bottom: 20px;
}

.question-buttons button,
.duration-buttons button {
  border: 1px solid #d9ddd7;

  background: white;

  color: #26352c;

  padding: 11px 15px;

  border-radius: 30px;

  font: inherit;

  font-size: 13px;

  cursor: pointer;

  transition: .2s;
}

.question-buttons button:hover,
.duration-buttons button:hover {
  background: #1d392a;

  border-color: #1d392a;

  color: white;
}


/* AI CHAT */

.ai-chat {
  border: 1px solid #dedfd8;

  border-radius: 18px;

  overflow: hidden;

  background: white;
}

.ai-response {
  min-height: 130px;

  padding: 20px;

  color: #536058;

  line-height: 1.7;

  white-space: pre-line;
}

.ai-input {
  display: flex;

  border-top: 1px solid #e6e5df;

  padding: 8px;
}

.ai-input input {
  flex: 1;

  border: 0;

  outline: 0;

  padding: 12px;

  font: inherit;
}

.ai-input button {
  border: 0;

  background: #1d392a;

  color: white;

  border-radius: 11px;

  padding: 0 18px;

  font-weight: 700;

  cursor: pointer;
}


/* ITINERARY */

.trip-builder {
  background: #f5f3eb;

  padding: 28px;

  border-radius: 20px;

  border: 1px solid #e5e2d9;
}

.duration-buttons {
  display: flex;

  flex-wrap: wrap;

  gap: 9px;

  margin-bottom: 20px;
}

.itinerary-result {
  background: white;

  border: 1px solid #e2e1da;

  border-radius: 15px;

  padding: 20px;

  min-height: 180px;

  line-height: 1.7;

  color: #536058;

  white-space: pre-line;
}

.build-trip {
  width: 100%;

  margin-top: 15px;

  min-height: 52px;

  border: 0;

  border-radius: 12px;

  background: #1d392a;

  color: white;

  font: inherit;

  font-weight: 700;

  cursor: pointer;
}

.build-trip:hover {
  background: #254936;
}


/* MOBILE */

@media (max-width: 700px) {

  #destinationExperience {
    padding: 10px;

    align-items: flex-end;
  }

  .destination-dialog {
    width: 100%;

    max-height: 95vh;

    border-radius:
      22px 22px 15px 15px;
  }

  .destination-hero {
    min-height: 330px;
  }

  .destination-hero-content {
    padding: 30px 22px;
  }

  .destination-hero-content h2 {
    font-size: 54px;
  }

  .destination-content {
    padding: 25px 18px;
  }

  .destination-grid {
    grid-template-columns: 1fr;

    gap: 28px;
  }

  .ai-guide {
    padding: 16px;
  }

  .destination-grid h3 {
    font-size: 24px;
  }

  .ai-input {
    flex-direction: column;

    gap: 7px;
  }

  .ai-input button {
    min-height: 48px;
  }

  }
