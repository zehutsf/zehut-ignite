import React, { Component, PropTypes } from 'react';
import ParticleEngine from './particles';
import blurAsset from '../../static/images/blur-2.png';
import chouxAsset from '../../static/images/choux.png';
import loadImage from '../utils/loadImage';

export default class ParticleBackground extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    config: PropTypes.object
  }

  componentDidMount() {
    Promise.all([loadImage(blurAsset), loadImage(chouxAsset)])
      .then(([blurImg, bgImg]) => {
        this.initializeParticles(blurImg, bgImg);
      });
  }

  componentWillReceiveProps({ width, height }) {
    if (this.particleEngine) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.particleEngine.setSize(width, height);
    }
  }

  componentWillUnmount() {
    this.particleEngine.destroy();
    this.particleEngine = null;
  }

  initializeParticles(image, bgImage) {
    this.particleEngine = new ParticleEngine({
      canvas: this.canvas,
      image,
      bgImage,
      config: this.props.config || {}
    });

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
