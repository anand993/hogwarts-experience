/**
 * Spell Grimoire & Interactive Spellcasting Arena
 * Handles spell catalog filters, live incantation input, and rich visual screen FX
 * (Lumos spotlight, Expecto Patronum silver mist, Wingardium Leviosa levitation, Alohomora unlock).
 */

import { SPELLS_DATA } from "./data.js";
import { soundEngine } from "./audio.js";
import { particleSystem } from "./particles.js";

class SpellcasterEngine {
  constructor() {
    this.isLumosActive = false;
    this.lumosOverlay = null;
    this.container = null;
    this.currentCategory = "all";
  }

  init() {
    this.container = document.getElementById("spells-catalog-grid");
    this.lumosOverlay = document.getElementById("lumos-overlay");
    this.initLumosMouseTracker();
    this.renderSpells();
    this.setupCategoryFilters();
    this.setupIncantationInput();
  }

  initLumosMouseTracker() {
    window.addEventListener("mousemove", (e) => {
      if (this.isLumosActive && this.lumosOverlay) {
        this.lumosOverlay.style.setProperty("--cursor-x", `${e.clientX}px`);
        this.lumosOverlay.style.setProperty("--cursor-y", `${e.clientY}px`);
      }
    });
  }

  setupCategoryFilters() {
    const filterBtns = document.querySelectorAll(".spell-filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");
        this.currentCategory = btn.dataset.category;
        soundEngine.playWandSwoosh();
        this.renderSpells();
      });
    });
  }

  setupIncantationInput() {
    const input = document.getElementById("incantation-input");
    const castBtn = document.getElementById("cast-incantation-btn");

    const handleCast = () => {
      if (!input) return;
      const text = input.value.trim().toLowerCase();
      if (!text) return;

      const spell = SPELLS_DATA.find(s => 
        s.incantation.toLowerCase() === text || 
        s.name.toLowerCase() === text
      );

      if (spell) {
        this.castSpell(spell.id);
        input.value = "";
      } else {
        // Unknown spell fizzle
        soundEngine.playChime(150, 0.4);
        input.classList.add("spell-fizzle");
        setTimeout(() => input.classList.remove("spell-fizzle"), 400);
      }
    };

    if (castBtn) {
      castBtn.addEventListener("click", handleCast);
    }
    if (input) {
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleCast();
      });
    }
  }

  renderSpells() {
    if (!this.container) return;

    const filtered = this.currentCategory === "all" 
      ? SPELLS_DATA 
      : SPELLS_DATA.filter(s => s.category.toLowerCase().includes(this.currentCategory.toLowerCase()));

    this.container.innerHTML = filtered.map(spell => `
      <div class="spell-card glass-panel glass-hover" data-spell-id="${spell.id}">
        <div class="spell-card-header">
          <span class="spell-type-tag">${spell.category}</span>
          <span class="spell-incantation-badge">/${spell.pronunciation}/</span>
        </div>
        <h4 class="spell-title cinzel-title" style="color: ${spell.color}">${spell.name}</h4>
        <p class="spell-effect-text">${spell.effect}</p>
        <p class="spell-desc">${spell.description}</p>
        
        <div class="spell-card-footer">
          <button class="btn-cast-spell" data-spell-id="${spell.id}">
            ⚡ Cast Spell
          </button>
        </div>
      </div>
    `).join("");

    const castBtns = this.container.querySelectorAll(".btn-cast-spell");
    castBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const spellId = e.currentTarget.dataset.spellId;
        this.castSpell(spellId);
      });
    });
  }

  castSpell(spellId) {
    const spell = SPELLS_DATA.find(s => s.id === spellId);
    if (!spell) return;

    soundEngine.playWandSwoosh();
    this.showCastBanner(spell.incantation, spell.color);

    // Burst particles at screen center
    particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, spell.fxType, 50);

    switch (spell.fxType) {
      case "lumos":
        this.fxLumos();
        break;
      case "nox":
        this.fxNox();
        break;
      case "patronus":
        this.fxPatronus();
        break;
      case "levitate":
        this.fxLevitate();
        break;
      case "alohomora":
        this.fxAlohomora();
        break;
      case "stupefy":
        this.fxStupefy();
        break;
      case "curse":
        this.fxCurse();
        break;
      case "riddikulus":
        this.fxRiddikulus();
        break;
      case "sectumsempra":
        this.fxSectumsempra();
        break;
      case "petrificus":
        this.fxPetrificus();
        break;
      default:
        soundEngine.playChime(600, 0.8);
        break;
    }
  }

  showCastBanner(incantation, color) {
    let banner = document.getElementById("spell-announcement-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "spell-announcement-banner";
      banner.className = "spell-announcement-banner";
      document.body.appendChild(banner);
    }

    banner.innerHTML = `
      <div class="banner-inner" style="border-color: ${color}; box-shadow: 0 0 35px ${color}">
        <span class="banner-rune">✦ ⚡ ✦</span>
        <span class="banner-incantation" style="color: ${color}">${incantation.toUpperCase()}!</span>
        <span class="banner-rune">✦ ⚡ ✦</span>
      </div>
    `;

    banner.classList.add("banner-active");
    setTimeout(() => {
      banner.classList.remove("banner-active");
    }, 1800);
  }

  fxLumos() {
    this.isLumosActive = true;
    soundEngine.playLumosSound();
    if (this.lumosOverlay) {
      this.lumosOverlay.classList.add("lumos-on");
    }
    document.body.classList.add("lumos-glow-active");
  }

  fxNox() {
    this.isLumosActive = false;
    soundEngine.playWandSwoosh();
    if (this.lumosOverlay) {
      this.lumosOverlay.classList.remove("lumos-on");
    }
    document.body.classList.remove("lumos-glow-active");
  }

  fxPatronus() {
    soundEngine.playPatronusSound();
    const overlay = document.getElementById("patronus-overlay");
    if (overlay) {
      overlay.classList.add("patronus-active");
      setTimeout(() => {
        overlay.classList.remove("patronus-active");
      }, 3500);
    }
  }

  fxLevitate() {
    soundEngine.playChime(750, 1.5);
    const cards = document.querySelectorAll(".spell-card, .character-card");
    cards.forEach(card => card.classList.add("floating-levitation"));

    setTimeout(() => {
      cards.forEach(card => card.classList.remove("floating-levitation"));
    }, 6000);
  }

  fxAlohomora() {
    soundEngine.playAlohomoraSound();
    // Reveal Owner / Admin Portal
    setTimeout(() => {
      if (window.openAdminPortal) {
        window.openAdminPortal();
      }
    }, 600);
  }

  fxStupefy() {
    soundEngine.playChime(200, 0.4);
    const flash = document.getElementById("spell-screen-flash");
    if (flash) {
      flash.style.backgroundColor = "rgba(231, 76, 60, 0.65)";
      flash.classList.add("flash-active");
      document.body.classList.add("camera-shake");
      setTimeout(() => {
        flash.classList.remove("flash-active");
        document.body.classList.remove("camera-shake");
      }, 450);
    }
  }

  fxCurse() {
    soundEngine.playChime(130, 0.9);
    const flash = document.getElementById("spell-screen-flash");
    if (flash) {
      flash.style.backgroundColor = "rgba(46, 204, 113, 0.75)";
      flash.classList.add("flash-active");
      setTimeout(() => {
        flash.classList.remove("flash-active");
      }, 600);
    }
  }

  fxRiddikulus() {
    // Playful, comical chime arpeggio
    soundEngine.playChime(659, 0.2);
    setTimeout(() => soundEngine.playChime(880, 0.2), 90);
    setTimeout(() => soundEngine.playChime(1046, 0.35), 180);

    // Cards wobble and chuckle with laughter
    const cards = document.querySelectorAll(".spell-card, .character-card");
    cards.forEach(card => card.classList.add("riddikulus-wobble"));
    setTimeout(() => {
      cards.forEach(card => card.classList.remove("riddikulus-wobble"));
    }, 2400);

    // Cheerful golden burst
    particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, "gold", 45);
  }

  fxSectumsempra() {
    soundEngine.playWandSwoosh();
    soundEngine.playChime(110, 0.6);
    
    // Crimson slash overlay & violent camera tremor
    const flash = document.getElementById("spell-screen-flash");
    let slash = document.getElementById("sectumsempra-slash");
    if (!slash) {
      slash = document.createElement("div");
      slash.id = "sectumsempra-slash";
      slash.className = "sectumsempra-slash-fx";
      document.body.appendChild(slash);
    }

    if (flash) {
      flash.style.backgroundColor = "rgba(192, 57, 43, 0.75)";
      flash.classList.add("flash-active");
    }

    slash.classList.add("slash-active");
    document.body.classList.add("camera-shake");

    setTimeout(() => {
      if (flash) flash.classList.remove("flash-active");
      slash.classList.remove("slash-active");
      document.body.classList.remove("camera-shake");
    }, 650);
  }

  fxPetrificus() {
    soundEngine.playChime(180, 0.7);

    // Freeze effect: rigid stone vignette overlay
    let frost = document.getElementById("petrificus-overlay");
    if (!frost) {
      frost = document.createElement("div");
      frost.id = "petrificus-overlay";
      frost.className = "petrificus-freeze-overlay";
      document.body.appendChild(frost);
    }

    frost.classList.add("freeze-active");
    const cards = document.querySelectorAll(".spell-card, .character-card");
    cards.forEach(c => c.classList.add("petrificus-locked"));

    setTimeout(() => {
      frost.classList.remove("freeze-active");
      cards.forEach(c => c.classList.remove("petrificus-locked"));
    }, 3200);
  }
}

export const spellcaster = new SpellcasterEngine();
