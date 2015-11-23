export default function loadImage(src, opts = {}) {
  return new Promise(resolve => {
    const img = new Image();
    let assignSrc = src;
    if (opts.crossOrigin) {
      img.crossOrigin = 'Anonymous';
      assignSrc = src + '?cb=' + Math.ceil(Math.random() * 9999);
    }

    img.addEventListener('load', () => {
      resolve(img);
    });

    img.src = assignSrc;
  });
}
