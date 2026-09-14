/**
 * Wand Cursor & Magical Particle Canvas System
 * Creates responsive glowing wand trails, burst explosions on clicks and spell casts,
 * and ambient floating Hogwarts embers.
 */

class ParticleSystem {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.ambientEmbers = [];
    this.mouse = { x: -100, y: -100, prevX: -100, prevY: -100, isMoving: false };
    this.wandColor = "gold"; // Default golden wand sparks
    this.isSnow = false;
    this.snowflakes = [];
    this.isRunning = false;
    this.moveTimer = null;
  }

  init() {
    this.canvas = document.getElementById("wand-canvas");
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.resize();
    window.addEventListener("resize", () => this.resize());

    // Mouse tracking
    window.addEventListener("mousemove", (e) => {
      this.mouse.prevX = this.mouse.x;
      this.mouse.prevY = this.mouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.isMoving = true;

      // Spawn wand sparks while moving
      this.spawnWandSparks(this.mouse.x, this.mouse.y, 2);

      clearTimeout(this.moveTimer);
      this.moveTimer = setTimeout(() => {
        this.mouse.isMoving = false;
      }, 80);
    });

    // Burst on click
    window.addEventListener("click", (e) => {
      this.createBurst(e.clientX, e.clientY, this.wandColor, 25);
    });

    // Touch devices
    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        this.spawnWandSparks(t.clientX, t.clientY, 2);
      }
    }, { passive: true });

    // Populate initial ambient embers
    this.initAmbientEmbers();
    this.initSnowflakes();

    this.isRunning = true;
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  setThemeColor(color, isSnow = false) {
    this.wandColor = color;
    this.isSnow = isSnow;
    if (this.isSnow && this.snowflakes.length === 0) {
      this.initSnowflakes();
    }
  }

  initSnowflakes() {
    this.snowflakes = [];
    const count = Math.min(85, Math.floor(window.innerWidth / 18));
    for (let i = 0; i < count; i++) {
      this.snowflakes.push({
        x: Math.random() * (this.canvas ? this.canvas.width : window.innerWidth),
        y: Math.random() * (this.canvas ? this.canvas.height : window.innerHeight),
        radius: 1.2 + Math.random() * 2.8,
        speedY: 0.6 + Math.random() * 1.5,
        swaySpeed: 0.015 + Math.random() * 0.025,
        swayAngle: Math.random() * Math.PI * 2,
        swayRadius: 0.8 + Math.random() * 1.6,
        alpha: 0.35 + Math.random() * 0.55
      });
    }
  }

  initAmbientEmbers() {
    this.ambientEmbers = [];
    const count = Math.min(45, Math.floor(window.innerWidth / 35));
    for (let i = 0; i < count; i++) {
      this.ambientEmbers.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.2 - Math.random() * 0.5, // gentle upward drift
        size: 1 + Math.random() * 2.2,
        alpha: 0.2 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseVal: Math.random() * Math.PI,
        hue: 35 + Math.random() * 15 // Warm candle gold
      });
    }
  }

  spawnWandSparks(x, y, count = 2) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.5 + Math.random() * 2.5;
      
      let r = 245, g = 205, b = 75; // Gold
      if (this.wandColor === "slytherin") { r = 46; g = 204; b = 113; }
      else if (this.wandColor === "ravenclaw") { r = 78; g = 168; b = 222; }
      else if (this.wandColor === "hufflepuff") { r = 241; g = 196; b = 15; }
      else if (this.wandColor === "gryffindor") { r = 231; g = 76; b = 60; }
      else if (this.wandColor === "dark-arts" || this.wandColor === "curse") { r = 0; g = 255; b = 136; }
      else if (this.wandColor === "patronus") { r = 100; g = 223; b = 223; }
      else if (this.wandColor === "winter" || this.isSnow) { r = 180; g = 225; b = 255; }
      else if (this.wandColor === "marauder") { r = 200; g = 150; b = 62; }
      else if (this.wandColor === "silver") { r = 210; g = 230; b = 255; }

      this.particles.push({
        x: x + (Math.random() - 0.5) * 6,
        y: y + (Math.random() - 0.5) * 6,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.3, // Slight downward gravity
        size: 1.5 + Math.random() * 2.5,
        life: 1.0,
        decay: 0.025 + Math.random() * 0.03,
        r, g, b,
        hasSparkle: Math.random() > 0.4
      });
    }
  }

  createBurst(x, y, colorType = "gold", count = 30) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5.5;

      let r = 255, g = 215, b = 0;
      if (colorType === "slytherin" || colorType === "curse" || colorType === "dark-arts") { r = 0; g = 255; b = 136; }
      else if (colorType === "ravenclaw" || colorType === "patronus") { r = 100; g = 223; b = 223; }
      else if (colorType === "winter") { r = 190; g = 230; b = 255; }
      else if (colorType === "gryffindor" || colorType === "stupefy") { r = 235; g = 60; b = 60; }
      else if (colorType === "hufflepuff") { r = 243; g = 156; b = 18; }
      else if (colorType === "marauder") { r = 200; g = 150; b = 62; }
      else if (colorType === "lumos") { r = 255; g = 250; b = 220; }

      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3.5,
        life: 1.0,
        decay: 0.015 + Math.random() * 0.025,
        r, g, b,
        hasSparkle: true
      });
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw Ambient Embers
    for (let i = 0; i < this.ambientEmbers.length; i++) {
      const e = this.ambientEmbers[i];
      e.x += e.vx;
      e.y += e.vy;
      e.pulseVal += e.pulseSpeed;

      const currentAlpha = e.alpha * (0.6 + 0.4 * Math.sin(e.pulseVal));

      if (e.y < -10) {
        e.y = this.canvas.height + 10;
        e.x = Math.random() * this.canvas.width;
      }
      if (e.x < -10) e.x = this.canvas.width + 10;
      if (e.x > this.canvas.width + 10) e.x = -10;

      const emberHue = this.isSnow ? (195 + Math.sin(e.pulseVal) * 15) : e.hue;

      this.ctx.beginPath();
      this.ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `hsla(${emberHue}, 85%, 65%, ${currentAlpha})`;
      this.ctx.shadowColor = `hsla(${emberHue}, 90%, 65%, 0.8)`;
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
    }

    // 1.5 Draw Falling Snowflakes (Winter Mode)
    if (this.isSnow && this.snowflakes) {
      this.ctx.save();
      for (let i = 0; i < this.snowflakes.length; i++) {
        const s = this.snowflakes[i];
        s.y += s.speedY;
        s.swayAngle += s.swaySpeed;
        s.x += Math.sin(s.swayAngle) * (s.swayRadius * 0.6);

        if (s.y > this.canvas.height + 10) {
          s.y = -10;
          s.x = Math.random() * this.canvas.width;
        }
        if (s.x < -10) s.x = this.canvas.width + 10;
        if (s.x > this.canvas.width + 10) s.x = -10;

        this.ctx.beginPath();
        this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(235, 245, 255, ${s.alpha})`;
        this.ctx.shadowColor = `rgba(180, 225, 255, 0.75)`;
        this.ctx.shadowBlur = 6;
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    // 2. Draw Wand Trail Sparks
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.life})`;
      this.ctx.shadowColor = `rgba(${p.r}, ${p.g}, ${p.b}, 0.9)`;
      this.ctx.shadowBlur = p.hasSparkle ? 12 : 6;
      this.ctx.fill();

      // Additional sparkle cross for high-energy particles
      if (p.hasSparkle && p.life > 0.4) {
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${p.life * 0.7})`;
        this.ctx.lineWidth = 1;
        const arm = p.size * p.life * 1.6;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x - arm, p.y);
        this.ctx.lineTo(p.x + arm, p.y);
        this.ctx.moveTo(p.x, p.y - arm);
        this.ctx.lineTo(p.x, p.y + arm);
        this.ctx.stroke();
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

export const particleSystem = new ParticleSystem();
