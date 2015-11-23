import requestAnimationFrame from 'raf';

// Multiplier for animation.
const RATE = 0.4;
// How often (in milliseconds) do new particles get generated
const PARTICLE_REFRESH_RATE = 200;
// Number of particles to create per generation cycle.
const NUM_PARTICLES = 12;
// Min/max range of particle size.
const PARTICLE_SIZE_RANGE = [80, 220];
// Colors
const COLORS = ['#fff', '#fff5ce', '#dbaf65'];

function colorizedImageCanvas(img, color) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  ctx.globalCompositeOperation = 'source-in';
  ctx.fillStyle = color;
  ctx.rect(0, 0, img.width, img.height);
  ctx.fill();

  return canvas;
}

function randomFromRange(min, max) {
  return Math.random() * (max - min) + min;
}

function randomParticleSize(/* viewportWidth */) {
  return randomFromRange(PARTICLE_SIZE_RANGE[0], PARTICLE_SIZE_RANGE[1]);
}

class Particle {
  constructor({ rate = 1, x, y, color, image, viewportWidth }) {
    this.color = color;
    this.image = image;
    this.alpha = 1;
    this.xRate = randomFromRange(-2, 2) * rate;
    this.yRate = randomFromRange(2, 8) * rate;
    this.alphaDelay = randomFromRange(500, 2000) * (1 / rate);
    this.alphaRate = randomFromRange(0.002, 0.09) * rate;
    this.size = randomParticleSize(viewportWidth);
    this.x = x;
    this.y = y - this.size;
  }

  update() {
    this.x += this.xRate;
    this.y += this.yRate;

    if (!this.start) {
      this.start = Date.now();
      return;
    }

    const now = Date.now();
    if (now - this.start > this.alphaDelay) {
      this.alpha = Math.max(0, this.alpha - this.alphaRate);
    }
  }

  draw(ctx) {
    ctx.globalAlpha = this.alpha;
    ctx.drawImage(
      this.image,
      0, 0,
      this.image.width, this.image.height,
      this.x, this.y,
      this.size, this.size
    );
    ctx.globalCompositeOperation = 'screen';
    // ctx.globalCompositeOperation = 'lighter';
  }
}

class Particles {
  constructor({ canvas, refreshRate = PARTICLE_REFRESH_RATE * (1 / RATE), image }) {
    this.tintedImages = COLORS.map(color => colorizedImageCanvas(image, color));
    this.refreshRate = refreshRate;
    this.size = { width: canvas.width, height: canvas.height };
    this.canvas = canvas;
    this.particles = [];
    this.generateNewParticles();
  }

  setSize(width, height) {
    this.size = { width, height };
  }

  addParticle() {
    const randomImage = this.tintedImages[
      Math.floor(randomFromRange(0, this.tintedImages.length))
    ];

    this.particles.push(new Particle({
      x: randomFromRange(-50, this.size.width),
      y: randomFromRange(-200, -100),
      image: randomImage,
      viewportWidth: this.size.width,
      rate: RATE
    }));
  }

  update() {
    this.particles.forEach(particle => {
      particle.update();

      if (particle.y >= this.size.height) {
        this.removeParticle(particle);
      }
    });
  }

  removeParticle(particle) {
    const index = this.particles.indexOf(particle);
    this.particles.splice(index, 1);
  }

  draw() {
    const ctx = this.canvas.getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, this.size.width, this.size.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.size.width, this.size.height);

    this.particles.forEach(particle => particle.draw(ctx));
  }

  generateNewParticles(count = NUM_PARTICLES) {
    for (let index = 0; index < count; index++) {
      this.addParticle();
    }
  }

  updateAndDraw() {
    this.update();
    this.draw();

    const now = Date.now();
    if (now - this.lastTime >= this.refreshRate) {
      this.generateNewParticles();
      this.lastTime = now;
    }

    if (!this.active) {
      return;
    }

    requestAnimationFrame(() => this.updateAndDraw());
  }

  start() {
    this.lastTime = Date.now();
    this.active = true;
    this.updateAndDraw();

  }

  destroy() {
    this.active = false;
  }
}

export default Particles;
