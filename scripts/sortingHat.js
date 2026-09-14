/**
 * Interactive Sorting Hat Ceremony Controller
 * Manages question flow, score accumulation, dramatic sorting deliberation,
 * and house reveal with theme switching & sound fanfare.
 */

import { SORTING_HAT_QUESTIONS, HOUSES_DATA } from "./data.js";
import { soundEngine } from "./audio.js";
import { particleSystem } from "./particles.js";

class SortingHatCeremony {
  constructor() {
    this.currentStep = 0;
    this.scores = { gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 };
    this.container = null;
    this.isDeliberating = false;
  }

  init() {
    this.container = document.getElementById("sorting-hat-stage");
    if (!this.container) return;
    this.renderIntro();
  }

  renderIntro() {
    this.currentStep = 0;
    this.scores = { gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 };

    this.container.innerHTML = `
      <div class="sorting-intro-card glass-panel">
        <div class="sorting-hat-icon-wrapper">
          <div class="sorting-hat-symbol">🧙‍♂️</div>
          <div class="sorting-sparkles">✨</div>
        </div>
        <h3 class="cinzel-title">The Sorting Ceremony Awaits</h3>
        <p class="sorting-lore-text">
          "There's nothing hidden in your head the Sorting Hat can't see...<br>
          So try me on and I will tell you where you ought to be!"
        </p>
        <p class="sorting-instruction">
          Answer five soul-searching questions to discover your rightful Hogwarts house.
        </p>
        <button id="start-sorting-btn" class="btn-magical-gold">
          <span class="btn-sparkle">✦</span> Place Hat Upon Your Head <span class="btn-sparkle">✦</span>
        </button>
      </div>
    `;

    const startBtn = document.getElementById("start-sorting-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        soundEngine.playWandSwoosh();
        this.startQuiz();
      });
    }
  }

  startQuiz() {
    this.currentStep = 0;
    this.renderQuestion();
  }

  renderQuestion() {
    const q = SORTING_HAT_QUESTIONS[this.currentStep];
    if (!q) {
      this.deliberate();
      return;
    }

    const progressPct = ((this.currentStep + 1) / SORTING_HAT_QUESTIONS.length) * 100;

    this.container.innerHTML = `
      <div class="sorting-question-card glass-panel fade-in-up">
        <div class="quiz-header">
          <span class="quiz-step-badge">Inquiry ${this.currentStep + 1} of ${SORTING_HAT_QUESTIONS.length}</span>
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progressPct}%"></div>
          </div>
        </div>
        <h4 class="question-prompt">${q.prompt}</h4>
        <div class="options-grid">
          ${q.options.map((opt, idx) => `
            <button class="quiz-option-btn glass-hover" data-house="${opt.house}" data-score="${opt.score}">
              <span class="option-index">${String.fromCharCode(65 + idx)}</span>
              <span class="option-text">${opt.text}</span>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    const optionBtns = this.container.querySelectorAll(".quiz-option-btn");
    optionBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const targetBtn = e.currentTarget;
        const house = targetBtn.dataset.house;
        const score = parseInt(targetBtn.dataset.score, 10) || 3;

        soundEngine.playChime(440 + this.currentStep * 80, 0.4);
        this.scores[house] += score;

        targetBtn.classList.add("selected-option");
        setTimeout(() => {
          this.currentStep++;
          this.renderQuestion();
        }, 320);
      });
    });
  }

  deliberate() {
    this.isDeliberating = true;
    soundEngine.playChime(320, 1.0);

    const quotes = [
      "Hmm... difficult, very difficult...",
      "Plenty of courage, I see. Not a bad mind either...",
      "There's talent, oh my goodness, yes — and a nice thirst to prove yourself...",
      "Now, where shall I put you...?"
    ];

    let quoteIdx = 0;
    this.container.innerHTML = `
      <div class="sorting-deliberation glass-panel pulse-glow">
        <div class="hat-thinking-orb">
          <div class="spinning-runes">⚡ ✦ ⚯ ͛ ⚡ ✦</div>
          <div class="deliberation-hat">🧙‍♂️</div>
        </div>
        <h3 class="deliberating-title cinzel-title">The Sorting Hat is Pondering...</h3>
        <p id="hat-thought-text" class="hat-quote">"${quotes[0]}"</p>
      </div>
    `;

    const quoteElem = document.getElementById("hat-thought-text");
    const interval = setInterval(() => {
      quoteIdx++;
      if (quoteIdx < quotes.length) {
        if (quoteElem) {
          quoteElem.style.opacity = "0";
          setTimeout(() => {
            quoteElem.textContent = `"${quotes[quoteIdx]}"`;
            quoteElem.style.opacity = "1";
            soundEngine.playChime(350 + quoteIdx * 60, 0.5);
          }, 200);
        }
      } else {
        clearInterval(interval);
        this.revealVerdict();
      }
    }, 1100);
  }

  revealVerdict() {
    // Find highest scoring house
    let bestHouse = "gryffindor";
    let highestScore = -1;
    for (const [house, score] of Object.entries(this.scores)) {
      if (score > highestScore) {
        highestScore = score;
        bestHouse = house;
      }
    }

    const houseData = HOUSES_DATA[bestHouse];

    // Play victory fanfare and sound
    soundEngine.playSortingFanfare();

    // Trigger celebratory particle explosion
    particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, bestHouse, 70);
    particleSystem.setThemeColor(bestHouse);

    // Save statistic to localStorage for Admin / Owner poll tracking
    this.recordHouseStat(bestHouse);

    this.container.innerHTML = `
      <div class="sorting-result-card glass-panel ${bestHouse}-theme-card pop-in">
        <div class="result-crest-wrapper">
          <img src="${houseData.crestImage}" alt="${houseData.name} Crest" class="verdict-crest" />
        </div>
        <div class="result-content">
          <span class="verdict-tag">Sorted By Destiny</span>
          <h2 class="verdict-house-name cinzel-title">${houseData.name.toUpperCase()}!</h2>
          <p class="verdict-motto">"${houseData.motto}"</p>
          
          <div class="verdict-details-grid">
            <div class="detail-box">
              <span class="detail-label">Founder</span>
              <span class="detail-val">${houseData.founder}</span>
            </div>
            <div class="detail-box">
              <span class="detail-label">House Relic</span>
              <span class="detail-val">${houseData.relic}</span>
            </div>
            <div class="detail-box">
              <span class="detail-label">House Ghost</span>
              <span class="detail-val">${houseData.ghost}</span>
            </div>
            <div class="detail-box">
              <span class="detail-label">Signature Animal</span>
              <span class="detail-val">${houseData.animal}</span>
            </div>
          </div>

          <div class="verdict-actions">
            <button id="apply-house-theme-btn" class="btn-magical-gold" data-house="${bestHouse}">
              ⚡ Don ${houseData.name} Robes (Apply Theme)
            </button>
            <button id="retake-sorting-btn" class="btn-magical-secondary">
              ↺ Try on Hat Again
            </button>
          </div>
        </div>
      </div>
    `;

    // Apply House Theme Button
    const applyBtn = document.getElementById("apply-house-theme-btn");
    if (applyBtn) {
      applyBtn.addEventListener("click", () => {
        soundEngine.playPatronusSound();
        if (window.setSortedHouse) window.setSortedHouse(bestHouse);
        if (window.switchSiteTheme) window.switchSiteTheme(bestHouse);
        applyBtn.textContent = `✓ ${houseData.name} Theme Active`;
      });
    }

    // Retake Button
    const retakeBtn = document.getElementById("retake-sorting-btn");
    if (retakeBtn) {
      retakeBtn.addEventListener("click", () => {
        soundEngine.playWandSwoosh();
        this.renderIntro();
      });
    }

    // Automatically trigger house allegiance update
    if (window.setSortedHouse) window.setSortedHouse(bestHouse);
    if (window.switchSiteTheme) window.switchSiteTheme(bestHouse);
  }

  recordHouseStat(houseId) {
    try {
      const stats = JSON.parse(localStorage.getItem("hogwarts_house_stats") || "{}");
      stats[houseId] = (stats[houseId] || 0) + 1;
      localStorage.setItem("hogwarts_house_stats", JSON.stringify(stats));
    } catch (e) {}
  }
}

export const sortingHat = new SortingHatCeremony();
