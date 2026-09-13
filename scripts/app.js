/**
 * Main Application Coordinator
 * Initializes all modules, manages character vault filters, 3D card tilt,
 * Marauder's Map interactions, House theming, and the Owner/Admin Portal.
 */

import { HOUSES_DATA, CHARACTERS_DATA, BEASTS_DATA, HOGWARTS_MAP_LOCATIONS, SPELLS_DATA } from "./data.js";
import { soundEngine } from "./audio.js";
import { particleSystem } from "./particles.js";
import { sortingHat } from "./sortingHat.js";
import { spellcaster } from "./spellcaster.js";
import { goldenSnitch } from "./snitch.js";

// Expose switchSiteTheme globally for sortingHat & theme buttons
window.switchSiteTheme = function(houseKey) {
  const house = HOUSES_DATA[houseKey];
  if (!house) return;

  document.documentElement.style.setProperty("--house-primary", house.primaryColor);
  document.documentElement.style.setProperty("--house-accent", house.accentColor);
  document.documentElement.style.setProperty("--house-glow", house.glowColor);
  document.documentElement.setAttribute("data-active-house", houseKey);

  // Update active crest badge in navbar
  const activeBadge = document.getElementById("active-house-badge");
  if (activeBadge) {
    activeBadge.innerHTML = `<img src="${house.crestImage}" alt="${house.name}" class="nav-house-crest" /> <span class="badge-house-name">${house.name}</span>`;
  }

  particleSystem.setThemeColor(houseKey);
};

class WizardingApp {
  constructor() {
    this.characters = [...CHARACTERS_DATA];
    this.activeCharacterFilter = "all";
    this.activeModalCharacter = null;
  }

  init() {
    // 1. Initialize Canvas Particles
    particleSystem.init();

    // 2. Initialize Sorting Hat Ceremony
    sortingHat.init();

    // 3. Initialize Spellcaster
    spellcaster.init();

    // 4. Initialize Golden Snitch
    goldenSnitch.init();

    // 5. Render Dynamic Content
    this.renderHousePavilion();
    this.renderCharacters();
    this.renderBeasts();
    this.renderMaraudersMap();
    this.setupCharacterFilters();
    this.setupAudioToggle();
    this.setupAdminPortal();
    this.setupNavSmoothScroll();
    this.setupQuotesRotator();
    this.setupFooterInteractions();

    // Default theme: Gryffindor
    window.switchSiteTheme("gryffindor");

    // Expose openAdminPortal globally for Alohomora spell
    window.openAdminPortal = () => this.showAdminModal();
  }

  setupAudioToggle() {
    const btn = document.getElementById("audio-toggle-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isEnabled = soundEngine.toggleSound();
      if (isEnabled) {
        btn.classList.add("audio-active");
        btn.innerHTML = `<span class="audio-icon">🔊</span> <span class="audio-label">Atmosphere: ON</span>`;
      } else {
        btn.classList.remove("audio-active");
        btn.innerHTML = `<span class="audio-icon">🔇</span> <span class="audio-label">Atmosphere</span>`;
      }
    });
  }

  setupNavSmoothScroll() {
    const links = document.querySelectorAll(".nav-link");
    links.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href")?.substring(1);
        const targetElem = document.getElementById(targetId);
        if (targetElem) {
          soundEngine.playWandSwoosh();
          targetElem.scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  }

  renderHousePavilion() {
    const container = document.getElementById("houses-grid");
    if (!container) return;

    container.innerHTML = Object.values(HOUSES_DATA).map(h => `
      <div class="house-card glass-panel glass-hover house-${h.id}" data-house-id="${h.id}">
        <div class="house-crest-frame">
          <img src="${h.crestImage}" alt="${h.name} Crest" class="house-card-crest" />
        </div>
        <div class="house-card-content">
          <span class="house-element-tag">Element: ${h.element}</span>
          <h3 class="cinzel-title house-title" style="color: ${h.accentColor}">${h.name}</h3>
          <p class="house-card-motto">"${h.motto}"</p>
          
          <div class="house-traits-chips">
            ${h.traits.map(t => `<span class="trait-chip">${t}</span>`).join("")}
          </div>

          <div class="house-mini-meta">
            <div><strong>Founder:</strong> ${h.founder}</div>
            <div><strong>Ghost:</strong> ${h.ghost}</div>
          </div>

          <button class="btn-wear-colors" data-house="${h.id}">
            Don House Robes
          </button>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".btn-wear-colors").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const houseId = btn.dataset.house;
        soundEngine.playPatronusSound();
        window.switchSiteTheme(houseId);
      });
    });

    container.querySelectorAll(".house-card").forEach(card => {
      card.addEventListener("click", () => {
        const houseId = card.dataset.houseId;
        window.switchSiteTheme(houseId);
      });
    });
  }

  setupCharacterFilters() {
    const btns = document.querySelectorAll(".char-filter-btn");
    btns.forEach(btn => {
      btn.addEventListener("click", () => {
        btns.forEach(b => b.classList.remove("active-filter"));
        btn.classList.add("active-filter");
        this.activeCharacterFilter = btn.dataset.filter;
        soundEngine.playWandSwoosh();
        this.renderCharacters();
      });
    });
  }

  renderCharacters() {
    const container = document.getElementById("characters-grid");
    if (!container) return;

    let list = this.characters;
    if (this.activeCharacterFilter !== "all") {
      list = list.filter(c => 
        c.house === this.activeCharacterFilter || 
        c.role === this.activeCharacterFilter
      );
    }

    container.innerHTML = list.map(c => `
      <div class="character-card glass-panel glass-hover" data-char-id="${c.id}">
        <div class="char-image-wrapper">
          <img src="${c.image}" alt="${c.name}" class="char-portrait" loading="lazy" />
          <span class="char-house-badge house-${c.house}">${c.house.toUpperCase()}</span>
        </div>
        <div class="char-summary">
          <h4 class="char-name cinzel-title">${c.name}</h4>
          <span class="char-title-tag">${c.title}</span>
          <p class="char-wand"><strong>Wand:</strong> ${c.wand}</p>
          <p class="char-patronus"><strong>Patronus:</strong> ${c.patronus}</p>
          <button class="btn-inspect-character" data-char-id="${c.id}">
            Inspect Lore 📜
          </button>
        </div>
      </div>
    `).join("");

    // Attach 3D tilt and modal click events
    container.querySelectorAll(".character-card").forEach(card => {
      this.attach3DTilt(card);

      const inspectBtn = card.querySelector(".btn-inspect-character");
      if (inspectBtn) {
        inspectBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          const charId = inspectBtn.dataset.charId;
          this.openCharacterModal(charId);
        });
      }

      card.addEventListener("click", () => {
        const charId = card.dataset.charId;
        this.openCharacterModal(charId);
      });
    });
  }

  attach3DTilt(card) {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
  }

  openCharacterModal(charId) {
    const character = this.characters.find(c => c.id === charId);
    if (!character) return;

    try {
      soundEngine.playChime(600, 0.4);
    } catch (err) {
      console.warn("Sound engine error:", err);
    }

    const modal = document.getElementById("character-modal");
    const body = document.getElementById("modal-char-body");
    if (!modal || !body) return;

    const skills = character.skills || [];
    const house = character.house || "gryffindor";

    body.innerHTML = `
      <div class="modal-char-layout">
        <div class="modal-char-image-col">
          <img src="${character.image || 'assets/images/crest-gryffindor.jpg'}" alt="${character.name || 'Wizard'}" class="modal-char-portrait" />
          <div class="modal-char-house-banner house-${house}">
            <span>${house.toUpperCase()}</span>
          </div>
        </div>
        <div class="modal-char-info-col">
          <h2 class="cinzel-title modal-char-title">${character.name || 'Wizard'}</h2>
          <p class="modal-char-subtitle">${character.title || ''}</p>
          
          <blockquote class="modal-quote">
            "${character.quote || 'Mischief Managed.'}"
          </blockquote>

          <div class="modal-specs-grid">
            <div class="spec-row">
              <span class="spec-name">🪄 Wand Specification:</span>
              <span class="spec-val">${character.wand || 'Unknown Wand'}</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">🦌 Corporeal Patronus:</span>
              <span class="spec-val">${character.patronus || 'Unknown'}</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">🕷️ Boggart (Deepest Fear):</span>
              <span class="spec-val">${character.boggart || 'Unknown'}</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">🏆 Notable Feat:</span>
              <span class="spec-val">${character.iconicAchievement || 'Distinguished magical feats'}</span>
            </div>
          </div>

          <div class="modal-bio-text">
            <h4 class="cinzel-title">Magical Biography</h4>
            <p>${character.bio || ''}</p>
          </div>

          <div class="modal-skills-list">
            <strong>Key Magical Disciplines:</strong>
            <div class="skill-tags">
              ${skills.map(s => `<span class="skill-pill">⚡ ${s}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("modal-visible");

    const closeModal = () => {
      try {
        soundEngine.playWandSwoosh();
      } catch (err) {}
      modal.classList.remove("modal-visible");
      document.removeEventListener("keydown", handleKey);
      modal.onclick = null;
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    const closeBtn = document.getElementById("modal-close-btn");
    if (closeBtn) {
      closeBtn.onclick = closeModal;
    }

    modal.onclick = (e) => {
      if (e.target === modal) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKey);
  }

  renderBeasts() {
    const container = document.getElementById("beasts-grid");
    if (!container) return;

    container.innerHTML = BEASTS_DATA.map(b => `
      <div class="beast-card glass-panel glass-hover">
        <div class="beast-image-wrapper">
          <img src="${b.image}" alt="${b.name}" class="beast-portrait" loading="lazy" />
          <span class="beast-class-badge">${b.classification}</span>
        </div>
        <div class="beast-info">
          <h4 class="beast-title cinzel-title">${b.name}</h4>
          <span class="beast-species">${b.species}</span>
          <p class="beast-habitat"><strong>Habitat:</strong> ${b.habitat}</p>
          <div class="beast-abilities">
            <strong>Known Abilities:</strong>
            <ul>
              ${b.abilities.map(a => `<li>✦ ${a}</li>`).join("")}
            </ul>
          </div>
          <p class="beast-lore">${b.lore}</p>
        </div>
      </div>
    `).join("");
  }

  renderMaraudersMap() {
    const board = document.getElementById("marauders-board");
    const hotspotsLayer = document.getElementById("marauder-hotspots-layer");
    const display = document.getElementById("map-secret-display");
    const pillsContainer = document.getElementById("map-locations-list");
    const revealBtn = document.getElementById("btn-marauder-reveal");
    const hideBtn = document.getElementById("btn-marauder-hide");
    if (!display) return;

    let isMapAwake = true;

    // 1. Render Bottom Chamber Quick-Select Pills
    if (pillsContainer) {
      pillsContainer.innerHTML = HOGWARTS_MAP_LOCATIONS.map((loc, idx) => `
        <button class="map-pill-btn ${idx === 0 ? 'active-map-pill' : ''}" data-loc-id="${loc.id}">
          👣 ${loc.name}
        </button>
      `).join("");
    }

    // 2. Render Interactive Hotspot Pins & Walking Footsteps on Blueprint
    if (hotspotsLayer) {
      hotspotsLayer.innerHTML = `
        ${HOGWARTS_MAP_LOCATIONS.map((loc, idx) => `
          <div class="marauder-hotspot-pin ${idx === 0 ? 'active-pin' : ''}" style="left: ${loc.mapX}%; top: ${loc.mapY}%;" data-loc-id="${loc.id}">
            <div class="hotspot-pulse-ring">
              <span class="hotspot-icon">👣</span>
            </div>
            <span class="hotspot-tooltip-tag">${loc.name}</span>
          </div>
        `).join("")}

        <!-- Active Walking Footsteps in Castle Corridors -->
        ${HOGWARTS_MAP_LOCATIONS.slice(0, 5).map((loc, i) => `
          <div class="marauder-walker" id="walker-${loc.id}" style="left: ${loc.mapX + (i % 2 === 0 ? 5 : -5)}%; top: ${loc.mapY + 7}%;">
            <span class="footsteps-icon">👣</span>
            <span class="walker-tag">${loc.walker}</span>
          </div>
        `).join("")}
      `;

      // Gently drift walking footsteps around their zones every 2.5s
      setInterval(() => {
        if (!isMapAwake) return;
        HOGWARTS_MAP_LOCATIONS.slice(0, 5).forEach((loc) => {
          const walkerElem = document.getElementById(`walker-${loc.id}`);
          if (walkerElem) {
            const offsetX = (Math.random() - 0.5) * 6;
            const offsetY = (Math.random() - 0.5) * 6;
            walkerElem.style.left = `${loc.mapX + offsetX}%`;
            walkerElem.style.top = `${loc.mapY + 7 + offsetY}%`;
          }
        });
      }, 2500);
    }

    // 3. Render Parchment Dossier
    const updateDossier = (loc) => {
      display.innerHTML = `
        <div class="parchment-scroll-dossier pop-in">
          <div class="dossier-header">
            <span class="dossier-runes">⚡ Marauder's Confidential Dispatch ⚡</span>
            <h3 class="dossier-title">${loc.name}</h3>
            <span class="dossier-coords">📍 Castle Elevation: ${loc.coordinates}</span>
          </div>
          <div class="dossier-content">
            <p class="dossier-desc">${loc.description}</p>
            <div class="dossier-passage-box">
              <strong>🚪 Secret Passageway:</strong>
              <p>${loc.passage}</p>
            </div>
            <div class="dossier-secret-box">
              <strong>🗝️ Chamber Secret & Password:</strong>
              <p>${loc.secret}</p>
            </div>
          </div>
          <div class="dossier-walker-badge">
            <span>👣 <strong>Currently Sensed in Vicinity:</strong> ${loc.walker}</span>
          </div>
        </div>
      `;
    };

    // Set initial display
    updateDossier(HOGWARTS_MAP_LOCATIONS[0]);

    // 4. Click handlers for Bottom Pills & Blueprint Pins
    const selectChamber = (locId) => {
      const loc = HOGWARTS_MAP_LOCATIONS.find(l => l.id === locId);
      if (!loc) return;

      soundEngine.playChime(520, 0.35);

      // Update pills
      if (pillsContainer) {
        pillsContainer.querySelectorAll(".map-pill-btn").forEach(b => {
          b.classList.toggle("active-map-pill", b.dataset.locId === locId);
        });
      }

      // Update map pins
      if (hotspotsLayer) {
        hotspotsLayer.querySelectorAll(".marauder-hotspot-pin").forEach(p => {
          p.classList.toggle("active-pin", p.dataset.locId === locId);
        });
      }

      updateDossier(loc);
    };

    if (pillsContainer) {
      pillsContainer.querySelectorAll(".map-pill-btn").forEach(btn => {
        btn.addEventListener("click", () => selectChamber(btn.dataset.locId));
      });
    }

    if (hotspotsLayer) {
      hotspotsLayer.querySelectorAll(".marauder-hotspot-pin").forEach(pin => {
        pin.addEventListener("click", () => selectChamber(pin.dataset.locId));
      });
    }

    // 5. Incantation Tap Buttons
    if (revealBtn) {
      revealBtn.addEventListener("click", () => {
        isMapAwake = true;
        if (board) board.classList.remove("map-asleep");
        revealBtn.classList.add("active");
        soundEngine.playWandSwoosh();
        soundEngine.playChime(750, 0.4);
        particleSystem.createBurst(window.innerWidth / 2, window.innerHeight / 2, "gold", 35);
        selectChamber(HOGWARTS_MAP_LOCATIONS[0].id);
      });
    }

    if (hideBtn) {
      hideBtn.addEventListener("click", () => {
        isMapAwake = false;
        if (board) board.classList.add("map-asleep");
        if (revealBtn) revealBtn.classList.remove("active");
        soundEngine.playWandSwoosh();

        display.innerHTML = `
          <div class="parchment-scroll-dossier pop-in" style="text-align: center; justify-content: center; min-height: 280px;">
            <div style="font-size: 38px; margin-bottom: 12px;">📜</div>
            <h4 class="cinzel-title" style="color: #6d4423; font-size: 1.45rem; margin-bottom: 8px;">"Mischief Managed"</h4>
            <p style="color: #784824; font-size: 0.95rem; font-style: italic; line-height: 1.6;">
              The enchanted ink recedes softly into the parchment fibres. The footprints fade, and the castle guards suspect nothing.<br/><br/>
              <em>Tap "I solemnly swear that I am up to no good" above to reveal the map again.</em>
            </p>
          </div>
        `;
      });
    }
  }

  setupQuotesRotator() {
    const quoteElem = document.getElementById("daily-prophet-quote");
    if (!quoteElem) return;

    const quotes = [
      "\"Words are, in my not-so-humble opinion, our most inexhaustible source of magic.\" — Albus Dumbledore",
      "\"It matters not what someone is born, but what they grow to be.\" — Albus Dumbledore",
      "\"It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.\" — Neville Longbottom",
      "\"We've all got both light and dark inside us. What matters is the part we choose to act on.\" — Sirius Black",
      "\"I solemnly swear that I am up to no good.\" — The Marauders"
    ];

    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % quotes.length;
      quoteElem.style.opacity = "0";
      setTimeout(() => {
        quoteElem.textContent = quotes[idx];
        quoteElem.style.opacity = "1";
      }, 300);
    }, 7000);
  }

  setupAdminPortal() {
    const adminBtn = document.getElementById("admin-portal-nav-btn");
    const adminModal = document.getElementById("admin-modal");
    const closeBtn = document.getElementById("admin-close-btn");

    if (adminBtn) {
      adminBtn.addEventListener("click", () => this.showAdminModal());
    }
    const footerAdminLink = document.getElementById("footer-admin-link");
    if (footerAdminLink) {
      footerAdminLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.showAdminModal();
      });
    }
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        soundEngine.playWandSwoosh();
        adminModal.classList.remove("modal-visible");
      });
    }

    if (adminModal) {
      adminModal.addEventListener("click", (e) => {
        if (e.target === adminModal) {
          soundEngine.playWandSwoosh();
          adminModal.classList.remove("modal-visible");
        }
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && adminModal.classList.contains("modal-visible")) {
          soundEngine.playWandSwoosh();
          adminModal.classList.remove("modal-visible");
        }
      });
    }

    // Passcode unlock form
    const loginForm = document.getElementById("admin-login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const codeInput = document.getElementById("admin-passcode-input");
        const code = codeInput.value.trim().toLowerCase();
        
        // Allowed magical passcodes
        if (code === "alohomora" || code === "lumos" || code === "admin123") {
          soundEngine.playAlohomoraSound();
          document.getElementById("admin-login-view").style.display = "none";
          document.getElementById("admin-dashboard-view").style.display = "block";
          this.loadAdminStats();
        } else {
          soundEngine.playChime(150, 0.4);
          codeInput.classList.add("spell-fizzle");
          setTimeout(() => codeInput.classList.remove("spell-fizzle"), 400);
        }
      });
    }

    // Add Character Form
    const addCharForm = document.getElementById("admin-add-character-form");
    if (addCharForm) {
      addCharForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("new-char-name").value.trim();
        const title = document.getElementById("new-char-title").value.trim();
        const house = document.getElementById("new-char-house").value;
        const wand = document.getElementById("new-char-wand").value.trim();
        const patronus = document.getElementById("new-char-patronus").value.trim();
        const bio = document.getElementById("new-char-bio").value.trim();

        const newChar = {
          id: name.toLowerCase().replace(/\s+/g, "-"),
          name,
          title,
          house,
          role: "student",
          image: HOUSES_DATA[house].crestImage,
          wand: wand || "11\" Oak, Dragon Heartstring",
          patronus: patronus || "Silver Falcon",
          boggart: "Unknown",
          bio: bio || "An esteemed member of the wizarding community.",
          quote: "Magic is in our blood.",
          skills: ["Defense Against the Dark Arts", "Charms"],
          iconicAchievement: "Inducted into Hogwarts Archives"
        };

        this.characters.unshift(newChar);
        this.renderCharacters();
        soundEngine.playChime(800, 0.5);
        addCharForm.reset();
        alert(`✦ ${name} has been enrolled into ${house.toUpperCase()}!`);
      });
    }

    // Reset Data / Export JSON
    const exportBtn = document.getElementById("admin-export-json-btn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        const payload = {
          characters: this.characters,
          spells: SPELLS_DATA,
          stats: JSON.parse(localStorage.getItem("hogwarts_house_stats") || "{}")
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "wizarding-world-database.json";
        a.click();
        URL.revokeObjectURL(url);
      });
    }
  }

  showAdminModal() {
    soundEngine.playAlohomoraSound();
    const adminModal = document.getElementById("admin-modal");
    if (adminModal) {
      adminModal.classList.add("modal-visible");
      document.getElementById("admin-login-view").style.display = "block";
      document.getElementById("admin-dashboard-view").style.display = "none";
    }
  }

  loadAdminStats() {
    const stats = JSON.parse(localStorage.getItem("hogwarts_house_stats") || "{}");
    const container = document.getElementById("admin-stats-bars");
    if (container) {
      const total = Object.values(stats).reduce((a, b) => a + b, 0) || 1;
      const houses = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];

      container.innerHTML = houses.map(h => {
        const count = stats[h] || 0;
        const pct = Math.round((count / total) * 100);
        const houseInfo = HOUSES_DATA[h];
        return `
          <div class="stat-house-row">
            <div class="stat-house-meta">
              <span style="color: ${houseInfo.accentColor}"><strong>${houseInfo.name}:</strong></span>
              <span>${count} Sorted (${pct}%)</span>
            </div>
            <div class="stat-progress-track">
              <div class="stat-progress-fill" style="width: ${pct}%; background-color: ${houseInfo.accentColor}"></div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  setupFooterInteractions() {
    // 1. House Common Room Links
    document.querySelectorAll(".footer-common-room-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const houseKey = btn.dataset.house;
        if (houseKey) {
          this.openCommonRoomModal(houseKey);
        }
      });
    });

    // 2. Secret Vault / Admin Link
    const footerAdminLink = document.getElementById("footer-admin-link");
    if (footerAdminLink) {
      footerAdminLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.showAdminModal();
      });
    }

    // 3. Architecture Spec Link
    const footerSpecLink = document.getElementById("footer-spec-link");
    if (footerSpecLink) {
      footerSpecLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.openSpecModal();
      });
    }

    // 4. Cast Lumos Link
    const footerLumosLink = document.getElementById("footer-cast-lumos-link");
    if (footerLumosLink) {
      footerLumosLink.addEventListener("click", (e) => {
        e.preventDefault();
        const spellsSection = document.getElementById("spells");
        if (spellsSection) {
          soundEngine.playWandSwoosh();
          spellsSection.scrollIntoView({ behavior: "smooth" });
          setTimeout(() => {
            spellcaster.castSpell("lumos");
          }, 600);
        }
      });
    }
  }

  openCommonRoomModal(houseKey) {
    const house = HOUSES_DATA[houseKey];
    if (!house) return;

    try {
      soundEngine.playChime(520, 0.4);
    } catch (e) {}

    const modal = document.getElementById("common-room-modal");
    const body = document.getElementById("common-room-body");
    const closeBtn = document.getElementById("common-room-close-btn");
    if (!modal || !body) return;

    body.innerHTML = `
      <div class="common-room-layout">
        <div class="common-room-crest-col">
          <img src="${house.crestImage}" alt="${house.name} Crest" class="common-room-crest-img" />
          <div class="modal-char-house-banner house-${house.id}" style="width: 100%;">
            <span>HOUSE ${house.name.toUpperCase()}</span>
          </div>
          <div style="font-size: 0.85rem; color: #94a3b8; margin-top: 6px;">
            Element: <strong style="color: #fff">${house.element}</strong>
          </div>
          <div style="font-size: 0.85rem; color: #94a3b8;">
            Animal: <strong style="color: #fff">${house.animal}</strong>
          </div>
          <div style="font-size: 0.85rem; color: #94a3b8;">
            Founder: <strong style="color: #fff">${house.founder}</strong>
          </div>
        </div>

        <div class="common-room-info-col">
          <h2 class="cinzel-title common-room-header-title" style="color: ${house.accentColor}">
            ${house.commonRoomName || house.name + " Common Room"}
          </h2>
          <p class="modal-char-subtitle">Sanctuary of ${house.name} House</p>
          
          <blockquote class="common-room-motto">
            "${house.motto}"
          </blockquote>

          <div class="common-room-details-grid">
            <div class="cr-detail-row">
              <span class="cr-detail-label">🗝️ Secret Entrance & Location</span>
              <p class="cr-detail-value">${house.entrance || house.commonRoom}</p>
            </div>
            <div class="cr-detail-row">
              <span class="cr-detail-label">🔮 Incantation & Passwords</span>
              <p class="cr-detail-value">${house.passwords || 'Secret incantation required'}</p>
            </div>
            <div class="cr-detail-row">
              <span class="cr-detail-label">🔥 Atmosphere & Hearth Ambiance</span>
              <p class="cr-detail-value">${house.atmosphere || 'Enchanted fireplace and velvet furniture.'}</p>
            </div>
            <div class="cr-detail-row">
              <span class="cr-detail-label">🛏️ Dormitory Quarters</span>
              <p class="cr-detail-value">${house.dormitory || 'Cozy four-poster beds draped in house colors.'}</p>
            </div>
            <div class="cr-detail-row">
              <span class="cr-detail-label">✨ Legendary Relic & Ghost</span>
              <p class="cr-detail-value">Relic: <strong style="color: #ffd700">${house.relic}</strong> | Ghost: <strong style="color: #e2e8f0">${house.ghost}</strong></p>
            </div>
            ${house.specialFeatures ? `
            <div class="cr-detail-row">
              <span class="cr-detail-label">🛡️ Secret Enchantments</span>
              <p class="cr-detail-value">${house.specialFeatures}</p>
            </div>
            ` : ''}
          </div>

          <div class="cr-actions">
            <button id="cr-don-robes-btn" class="btn-magical-gold" style="flex: 1;">
              ⚡ Step Inside & Don Robes
            </button>
            <button id="cr-view-map-btn" class="btn-magical-secondary">
              👣 Track on Marauder's Map
            </button>
          </div>
        </div>
      </div>
    `;

    modal.classList.add("modal-visible");

    const closeModal = () => {
      try {
        soundEngine.playWandSwoosh();
      } catch (err) {}
      modal.classList.remove("modal-visible");
      document.removeEventListener("keydown", handleKey);
      modal.onclick = null;
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (closeBtn) {
      closeBtn.onclick = closeModal;
    }

    modal.onclick = (e) => {
      if (e.target === modal) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKey);

    // Interactive button: Step Inside & Don Robes
    const donRobesBtn = document.getElementById("cr-don-robes-btn");
    if (donRobesBtn) {
      donRobesBtn.onclick = () => {
        try {
          soundEngine.playPatronusSound();
        } catch (e) {}
        window.switchSiteTheme(houseKey);
        closeModal();
        const housesSection = document.getElementById("houses");
        if (housesSection) {
          housesSection.scrollIntoView({ behavior: "smooth" });
        }
      };
    }

    // Interactive button: View on Marauder's Map
    const viewMapBtn = document.getElementById("cr-view-map-btn");
    if (viewMapBtn) {
      viewMapBtn.onclick = () => {
        closeModal();
        const mapSection = document.getElementById("map");
        if (mapSection) {
          mapSection.scrollIntoView({ behavior: "smooth" });
        }
      };
    }
  }

  openSpecModal() {
    try {
      soundEngine.playChime(650, 0.4);
    } catch (e) {}

    const modal = document.getElementById("spec-modal");
    const content = document.getElementById("spec-modal-content");
    const closeBtn = document.getElementById("spec-modal-close-btn");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="spec-section-card">
        <h3>🏛️ 1. Architecture Overview</h3>
        <p>
          The <strong>Harry Potter Wizarding Fan Experience</strong> is an interactive, cinematic single-page application crafted with vanilla web standards (zero external heavy framework dependencies). It combines procedural Web Audio synthesis, HTML5 Canvas particle dynamics, dynamic House theming, and an algorithmic Sorting Hat quiz.
        </p>
      </div>

      <div class="spec-section-card">
        <h3>⚙️ 2. Engineering Tech Stack</h3>
        <table class="spec-table">
          <thead>
            <tr><th>Layer</th><th>Technology</th><th>Implementation Details</th></tr>
          </thead>
          <tbody>
            <tr><td><strong>Markup</strong></td><td>Semantic HTML5</td><td>Accessible structure with ARIA modal dialogs, SVG map layer, and custom data attributes.</td></tr>
            <tr><td><strong>Styling</strong></td><td>Vanilla CSS3 & Tokens</td><td>CSS custom properties for house themes, glassmorphism filters, 3D card tilt, and keyframe animations.</td></tr>
            <tr><td><strong>Audio</strong></td><td>Web Audio API</td><td>Pure procedural frequency modulation synthesis for wand swooshes, Patronus hum, fire crackle, and bells.</td></tr>
            <tr><td><strong>FX & Physics</strong></td><td>Canvas 2D Particle Engine</td><td>Real-time golden ember cursor trail, floating candle flickering, and spell radiance spotlighting.</td></tr>
            <tr><td><strong>Modules</strong></td><td>ES6+ JavaScript Modules</td><td>Separation of concerns across <code>app.js</code>, <code>audio.js</code>, <code>particles.js</code>, <code>sortingHat.js</code>, <code>spellcaster.js</code>, and <code>snitch.js</code>.</td></tr>
          </tbody>
        </table>
      </div>

      <div class="spec-section-card">
        <h3>🪄 3. Interactive Systems & Features</h3>
        <ul style="padding-left: 20px; line-height: 1.8;">
          <li><strong>Sorting Hat Ceremony</strong>: Algorithmic personality evaluator tallying responses across 4 Hogwarts houses with animated verdict announcement.</li>
          <li><strong>Spell Grimoire</strong>: Real-time spell engine handling <em>Lumos</em> (canvas illumination), <em>Expecto Patronum</em> (mist & Patronus silhouette), <em>Wingardium Leviosa</em> (levitation physics), <em>Alohomora</em> (vault unlock), <em>Stupefy</em>, <em>Sectumsempra</em>, and <em>Petrificus Totalus</em>.</li>
          <li><strong>The Marauder's Map</strong>: Authentic parchment blueprint with interactive animated footsteps tracking characters across Hogwarts corridors.</li>
          <li><strong>The Golden Snitch</strong>: High-velocity autonomous canvas flyer with cursor evasion physics and interactive catch event (+150 House points).</li>
          <li><strong>Owner Sanctum / Admin Portal</strong>: Passcode-protected command console with live Sorting Hat statistics, wizard enrollment form, and JSON export.</li>
        </ul>
      </div>
    `;

    modal.classList.add("modal-visible");

    const closeModal = () => {
      try {
        soundEngine.playWandSwoosh();
      } catch (err) {}
      modal.classList.remove("modal-visible");
      document.removeEventListener("keydown", handleKey);
      modal.onclick = null;
    };

    const handleKey = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (closeBtn) {
      closeBtn.onclick = closeModal;
    }

    modal.onclick = (e) => {
      if (e.target === modal) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKey);
  }
}

// Robust App Launch
function launchApp() {
  const app = new WizardingApp();
  app.init();
  window.wizardingApp = app;
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", launchApp);
} else {
  launchApp();
}
