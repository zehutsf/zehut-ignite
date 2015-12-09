import React, { Component } from 'react';
import ParticleBackground from './ParticleBackground';
import VerticalContainer from './VerticalContainer';

import igniteAsset from '../../static/images/ignite.svg';
import zehutAsset from '../../static/images/zehut-white.svg';

import '../../styles/Header.scss';

const particleConfig = {
  rate: 0.2,
  refreshRate: 800,
  sizeRange: [340, 400],
  numParticles: 40
};

const igniteStyle = {
  width: '50%',
  maxWidth: 1200,
  margin: '0 auto'
};

export default class Party extends Component {
  constructor(props) {
    super(props);
    this.state = {width: '100%', height: '100%'};
  }

  componentWillMount() {
    // this.handleResize();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  handleResize() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    const { width, height } = this.state;

    return (
      <div className="header" style={{ width, height }}>
        <div className="header-background">
          <ParticleBackground width={width} height={height} config={particleConfig}/>
        </div>
        <VerticalContainer>
          <img className="header-logo" src={igniteAsset} style={igniteStyle} />
          <img className="header-zehut" src={zehutAsset} width="80"/>
        </VerticalContainer>
      </div>
    );
  }
}
