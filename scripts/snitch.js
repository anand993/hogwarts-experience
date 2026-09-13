/**
 * The Golden Snitch: Interactive Quidditch Easter Egg
 * Lifelike Golden Snitch flight physics (fluttering wings, gentle evasion,
 * catch for +150 House Points, celebratory Quidditch fanfare).
 */

import { soundEngine } from "./audio.js";
import { particleSystem } from "./particles.js";

class GoldenSnitch {
  constructor() {
    this.elem = null;
    this.x = typeof window !== "undefined" ? window.innerWidth / 2 : 300;
    this.y = typeof window !== "undefined" ? window.innerHeight / 2 : 250;
    this.vx = 2.0;
    this.vy = -1.5;
    this.targetX = this.x;
    this.targetY = this.y;
    this.maxSpeed = 6.0;
    this.isActive = true;
    this.isCaught = false;
    this.catchesCount = 0;
    this.housePoints = 0;
    this.evasionDistance = 70;
  }

  init() {
    try {
      const stored = localStorage.getItem("hogwarts_house_points");
      this.housePoints = stored ? parseInt(stored, 10) : 0;
      if (isNaN(this.housePoints)) this.housePoints = 0;
    } catch (e) {
      this.housePoints = 0;
    }

    this.createSnitchElement();
    this.setupEventListeners();
    this.updatePointsDisplay();
    
    // Pick an initial destination
    this.pickNewTarget();

    // Start 60fps render loop
    this.animate();

    // Periodically pick fresh flight targets
    setInterval(() => {
      if (!this.isCaught && this.isActive) {
        this.pickNewTarget();
      }
    }, 2800);
  }

  pickNewTarget() {
    const w = window.innerWidth || 1000;
    const h = window.innerHeight || 800;
    this.targetX = 80 + Math.random() * (w - 160);
    this.targetY = 90 + Math.random() * (h - 180);
  }

  createSnitchElement() {
    let snitch = document.getElementById("golden-snitch");
    if (!snitch) {
      snitch = document.createElement("div");
      snitch.id = "golden-snitch";
      snitch.className = "golden-snitch";
      snitch.title = "⚡ Catch the Golden Snitch (+150 Points!)";
      snitch.setAttribute("role", "button");
      snitch.setAttribute("aria-label", "Golden Snitch - Catch for 150 House Points");
      snitch.innerHTML = `
        <div class="snitch-wing wing-left"></div>
        <div class="snitch-core">
          <div class="snitch-rune">⚡</div>
        </div>
        <div class="snitch-wing wing-right"></div>
      `;
      document.body.appendChild(snitch);
    }
    this.elem = snitch;
    // Set initial position immediately
    this.elem.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`;
  }

  setupEventListeners() {
    if (!this.elem) return;

    // Catch Snitch on Click / Pointer / Touch
    const handleCatch = (e) => {
      e.stopPropagation();
      e.preventDefault();
      this.catchSnitch();
    };

    this.elem.addEventListener("click", handleCatch);
    this.elem.addEventListener("pointerdown", handleCatch);

    // Cursor Evasion (challenging but catchable)
    window.addEventListener("mousemove", (e) => {
      if (this.isCaught || !this.isActive) return;

      const dx = this.x - e.clientX;
      const dy = this.y - e.clientY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.evasionDistance && dist > 0) {
        // Dart gently away from cursor
        const force = (this.evasionDistance - dist) / this.evasionDistance;
        this.vx += (dx / dist) * force * 2.2;
        this.vy += (dy / dist) * force * 2.2;
        
        // Spawn small golden trail spark
        if (Math.random() < 0.35) {
          particleSystem.spawnWandSparks(this.x, this.y, 1);
        }
      }
    });

    // Snitch launcher button in navbar (Trophy badge)
    const launchBtn = document.getElementById("snitch-toggle-btn");
    if (launchBtn) {
      launchBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (this.isCaught) {
          this.releaseSnitch();
        } else {
          this.summonToViewport();
        }
      });
    }
  }

  summonToViewport() {
    soundEngine.playWandSwoosh();
    // Bring Snitch directly into view at center of current screen
    this.x = (window.innerWidth || 800) / 2;
    this.y = (window.innerHeight || 600) / 2;
    this.vx = (Math.random() - 0.5) * 4;
    this.vy = (Math.random() - 0.5) * 4;
    particleSystem.createBurst(this.x, this.y, "gold", 45);
  }

  catchSnitch() {
    if (this.isCaught) return;
    this.isCaught = true;
    this.catchesCount++;
    this.housePoints += 150;

    try {
      localStorage.setItem("hogwarts_house_points", this.housePoints.toString());
    } catch (e) {}

    // Play victory fanfare sound
    soundEngine.playSortingFanfare();

    // Massive particle explosion
    particleSystem.createBurst(this.x, this.y, "gold", 80);

    // Update UI
    this.updatePointsDisplay();
    this.showCatchBanner();

    // Park snitch in golden glow caught state
    if (this.elem) {
      this.elem.classList.add("snitch-caught");
    }
  }

  releaseSnitch() {
    this.isCaught = false;
    if (this.elem) {
      this.elem.classList.remove("snitch-caught");
    }
    this.x = (window.innerWidth || 800) / 2;
    this.y = (window.innerHeight || 600) / 2;
    this.vx = (Math.random() - 0.5) * 5;
    this.vy = (Math.random() - 0.5) * 5;
    soundEngine.playWandSwoosh();
    particleSystem.createBurst(this.x, this.y, "gold", 40);
  }

  updatePointsDisplay() {
    const pointsElem = document.getElementById("house-points-counter");
    if (pointsElem) {
      pointsElem.textContent = `${this.housePoints} pts`;
      pointsElem.classList.add("points-pulsed");
      setTimeout(() => pointsElem.classList.remove("points-pulsed"), 500);
    }
  }

  showCatchBanner() {
    let banner = document.getElementById("snitch-catch-banner");
    if (!banner) {
      banner = document.createElement("div");
      banner.id = "snitch-catch-banner";
      banner.className = "snitch-catch-modal pop-in";
      document.body.appendChild(banner);
    }

    const currentHouse = document.documentElement.getAttribute("data-active-house") || "gryffindor";
    const houseName = currentHouse.charAt(0).toUpperCase() + currentHouse.slice(1);

    banner.innerHTML = `
      <div class="snitch-modal-inner glass-panel">
        <div class="snitch-trophy-symbol">🏆</div>
        <span class="snitch-tag">QUIDDITCH VICTORY</span>
        <h2 class="cinzel-title banner-gold-title">THE GOLDEN SNITCH IS CAUGHT!</h2>
        <p class="snitch-praise">
          Extraordinary Seeker reflexes! You outmaneuvered the enchanted Snitch and won the match.
        </p>
        <div class="points-award-box">
          <span class="points-num">+150</span>
          <span class="points-award-label">House Points to <strong>${houseName}</strong></span>
        </div>
        <div class="snitch-modal-actions">
          <button id="re-release-snitch-btn" class="btn-magical-gold">
            🕊️ Release Snitch Back to Pitch
          </button>
          <button id="close-snitch-banner-btn" class="btn-magical-secondary">
            Keep in Trophy Vault
          </button>
        </div>
      </div>
    `;

    banner.style.display = "flex";

    const reReleaseBtn = document.getElementById("re-release-snitch-btn");
    const closeBtn = document.getElementById("close-snitch-banner-btn");

    if (reReleaseBtn) {
      reReleaseBtn.onclick = () => {
        banner.style.display = "none";
        this.releaseSnitch();
      };
    }

    if (closeBtn) {
      closeBtn.onclick = () => {
        banner.style.display = "none";
      };
    }
  }

  animate() {
    if (!this.isCaught && this.isActive && this.elem) {
      const w = window.innerWidth || 1000;
      const h = window.innerHeight || 800;

      // Smooth steering toward target
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      
      this.vx += dx * 0.0018;
      this.vy += dy * 0.0018;

      // Air drag
      this.vx *= 0.95;
      this.vy *= 0.95;

      // Velocity clamping to prevent runaway acceleration
      this.vx = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.vx));
      this.vy = Math.max(-this.maxSpeed, Math.min(this.maxSpeed, this.vy));

      // Flutter flutter
      this.x += this.vx + (Math.random() - 0.5) * 1.5;
      this.y += this.vy + (Math.random() - 0.5) * 1.5;

      // Safe viewport boundaries with soft bounce
      const margin = 40;
      if (this.x < margin) { 
        this.x = margin; 
        this.vx = Math.abs(this.vx) * 0.85; 
      } else if (this.x > w - margin - 38) { 
        this.x = w - margin - 38; 
        this.vx = -Math.abs(this.vx) * 0.85; 
      }

      if (this.y < 75) { 
        this.y = 75; 
        this.vy = Math.abs(this.vy) * 0.85; 
      } else if (this.y > h - margin - 38) { 
        this.y = h - margin - 38; 
        this.vy = -Math.abs(this.vy) * 0.85; 
      }

      // Apply transform with banking tilt
      const angle = Math.atan2(this.vy, this.vx) * (180 / Math.PI) * 0.2;
      this.elem.style.transform = `translate3d(${Math.round(this.x)}px, ${Math.round(this.y)}px, 0) rotate(${angle.toFixed(1)}deg)`;

      // Spark trail
      if (Math.random() < 0.25) {
        particleSystem.spawnWandSparks(this.x + 16, this.y + 16, 1);
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

export const goldenSnitch = new GoldenSnitch();
