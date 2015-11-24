import requestAnimationFrame from 'raf';

const OPT_1 = {
  rate: 0.34,
  refreshRate: 300,
  numParticles: 14,
  sizeRange: [120, 340],
  blendMode: 'screen'
};

const OPT_2 = {
  rate: 0.4,
  refreshRate: 400,
  numParticles: 30,
  sizeRange: [80, 240],
  blendMode: 'lighter'
};

const OPT_3 = {
  rate: 0.7,
  refreshRate: 800,
  numParticles: 80,
  sizeRange: [20, 150],
  blendMode: 'lighter'
};

const OPT_4 = {
  rate: 0.6,
  refreshRate: 800,
  numParticles: 40,
  sizeRange: [170, 240],
  blendMode: 'screen'
};

const OPT_5 = {
  rate: 0.2,
  refreshRate: 1000,
  numParticles: 120,
  sizeRange: [60, 300],
  blendMode: 'screen',
  alphaRange: [0.2, 0.8],
  colors: ['#ff9600', '#ffd79e'],
  yRate: [2, 8],
  xRange: [-5, 5]
};

const defaultConfig = {
  colors: ['#fff', '#fff5ce', '#dbaf64' /* '#ddb066' */],
  alphaRange: [1, 1],
  yRate: [2, 8],
  xRate: [-2, 2],
  refreshRate: 800,
  alphaDelay: [500, 2000],
  alphaRate: [0.002, 0.09]
};

const CONFIG = Object.assign({}, defaultConfig, OPT_3, OPT_4, OPT_2, OPT_1, OPT_5);

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
  return randomFromRange(CONFIG.sizeRange[0], CONFIG.sizeRange[1]);
}

class Particle {
  constructor({ rate = 1, x, y, color, image, viewportWidth }) {
    this.color = color;
    this.image = image;
    this.alpha = randomFromRange(CONFIG.alphaRange[0], CONFIG.alphaRange[1]);
    this.xRate = randomFromRange(CONFIG.xRate[0], CONFIG.xRate[1]) * rate;
    this.yRate = randomFromRange(CONFIG.yRate[0], CONFIG.yRate[1]) * rate;
    this.alphaDelay = randomFromRange(CONFIG.alphaDelay[0], CONFIG.alphaDelay[1]) / rate;
    this.alphaRate = randomFromRange(CONFIG.alphaRate[0], CONFIG.alphaRate[1]) * rate;
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
    ctx.globalCompositeOperation = CONFIG.blendMode;
    // ctx.globalCompositeOperation = 'lighter';
  }
}

class Particles {
  constructor({
    canvas,
    image,
    bgImage
  }) {
    this.refreshRate = CONFIG.refreshRate / CONFIG.rate;
    this.bgImage = bgImage;
    this.tintedImages = CONFIG.colors.map(color => colorizedImageCanvas(image, color));
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
      x: randomFromRange(this.size.width * -0.8, this.size.width),
      y: randomFromRange(-200, -100),
      image: randomImage,
      viewportWidth: this.size.width,
      rate: CONFIG.rate
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
    const ctx = this.context;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, this.size.width, this.size.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.size.width, this.size.height);

    this.particles.forEach(particle => particle.draw(ctx));

    // this.drawBackground();
  }

  drawBackground() {
    const ctx = this.context;

    ctx.globalCompositeOperation = 'source-atop';
    ctx.globalAlpha = 0.1;

    ctx.drawImage(this.bgImage,
      0, 0,
      this.bgImage.width, this.bgImage.height,
      0, 0,
      this.canvas.width, this.canvas.height);
  }

  generateNewParticles() {
    const count = CONFIG.numParticles;
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
    this.context = this.canvas.getContext('2d');
    this.lastTime = Date.now();
    this.active = true;
    this.updateAndDraw();

  }

  destroy() {
    this.active = false;
  }
}

export default Particles;
