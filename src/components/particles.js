import requestAnimationFrame from 'raf';

const defaultConfig = {
  colors: ['#fff', '#fff5ce', '#dbaf64' /* '#ddb066' */],
  alphaRange: [1, 1],
  yRate: [2, 8],
  xRate: [-2, 2],
  refreshRate: 800,
  alphaDelay: [500, 2000],
  alphaRate: [0.002, 0.09]
};

const newConfig = {
  rate: 0.2,
  refreshRate: 800,
  numParticles: 60,
  sizeRange: [170, 240],
  alphaRange: [0.2, 1],
  alphaDelay: [750, 2000],
  colors: ['#ff9600', '#ffd79e'],
  blendMode: 'screen'
};

const BASE_WIDTH = 1000;
const BASE_HEIGHT = 500;

const GLOBAL_CONFIG = Object.assign({}, defaultConfig, newConfig);

function proportional(n1, d1, d2) {
  return (n1 * d2) / d1;
}

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

function randomParticleSize(config) {
  return randomFromRange(config.sizeRange[0], config.sizeRange[1]);
}

const proportionalProps = [
  // 'size'
];

class Particle {
  constructor({ rate = 1, x, y, color, image, viewportWidth, viewportHeight, config }) {
    this.alpha = randomFromRange(config.alphaRange[0], config.alphaRange[1]);
    this.xRate = randomFromRange(config.xRate[0], config.xRate[1]) * rate;
    this.yRate = randomFromRange(config.yRate[0], config.yRate[1]) * rate;
    this.alphaDelay = proportional(
        randomFromRange(config.alphaDelay[0], config.alphaDelay[1]) / rate,
        BASE_HEIGHT,
        viewportHeight
    );

    this.alphaRate = randomFromRange(config.alphaRate[0], config.alphaRate[1]) * rate;
    this.size = randomParticleSize(config, viewportWidth, viewportHeight);

    proportionalProps.forEach(prop => {
      this[prop] = proportional(this[prop], BASE_WIDTH,
        Math.min(viewportWidth, BASE_WIDTH));
    });

    this.config = config;
    this.color = color;
    this.image = image;
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
    ctx.globalCompositeOperation = this.config.blendMode;
  }
}

class Particles {
  constructor({ canvas, image, bgImage, config = {} }) {
    this.config = Object.assign({}, GLOBAL_CONFIG, config);
    this.refreshRate = this.config.refreshRate / this.config.rate;
    this.bgImage = bgImage;
    this.tintedImages = this.config.colors.map(color => colorizedImageCanvas(image, color));
    this.size = { width: canvas.width, height: canvas.height };
    this.canvas = canvas;
    this.particles = [];
    this.first = true;
    this.generateNewParticles(this.config.numParticles);
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
      y: this.first ? randomFromRange(0, this.size.height * 0.5) : randomFromRange(-200, -100),
      image: randomImage,
      viewportWidth: this.size.width,
      viewportHeight: this.size.height,
      rate: this.config.rate,
      config: this.config
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
    this.drawBackground();
    this.particles.forEach(particle => particle.draw(this.context));
    // this.drawBackgroundImage();
  }

  drawBackground() {
    const ctx = this.context;
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, this.size.width, this.size.height);
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, this.size.width, this.size.height);
  }

  drawBackgroundImage() {
    const ctx = this.context;

    ctx.globalCompositeOperation = 'source-atop';
    ctx.globalAlpha = 0.1;

    ctx.drawImage(this.bgImage, 0, 0,
      this.bgImage.width, this.bgImage.height,
      0, 0, this.canvas.width, this.canvas.height);
  }

  generateNewParticles(count) {
    for (let index = 0; index < count; index++) {
      this.addParticle();
    }

    this.first = false;
  }

  updateAndDraw() {
    this.update();
    this.draw();

    const now = Date.now();
    if (now - this.lastTime >= this.refreshRate) {
      this.generateNewParticles(this.config.numParticles);
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
