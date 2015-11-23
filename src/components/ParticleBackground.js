import React, { Component, PropTypes } from 'react';
import ParticleEngine from './particles';
import blurAsset from '../../static/images/blur.png';

export default class ParticleBackground extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }

  componentDidMount() {
    const img = new Image();
    img.addEventListener('load', () => this.initializeParticles(img));
    img.src = blurAsset;
  }

  componentWillReceiveProps({ width, height }) {
    if (this.particleEngine) {
      this.particleEngine.setSize(width, height);
    }
  }

  componentWillUnmount() {
    this.particleEngine.destroy();
    this.particleEngine = null;
  }

  initializeParticles(image) {
    this.particleEngine = new ParticleEngine({ canvas: this.canvas, image });
    this.particleEngine.start();
  }

  render() {
    const { width, height } = this.props;

    return (
      <canvas
        width={width}
        height={height}
        ref={(el) => this.canvas = el} />
    );
  }

}
