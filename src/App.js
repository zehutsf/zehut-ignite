import React, { Component } from 'react';
import ParticleBackground from './components/ParticleBackground';
import '../styles/App.scss';
import igniteAsset from '../static/images/ignite.svg';
import zehutAsset from '../static/images/zehut-white.svg';

export default class App extends Component {

  constructor(props) {
    super(props);

    if (__SERVER__) {
      this.state = { width: 100, height: 500};
    } else {
      this.state = { width: window.innerWidth, height: 500 };
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  handleResize() {
    this.setState({ width: window ? window.innerWidth : 100 });
  }

  render() {
    const { width, height } = this.state;

    return (
      <div>
        <div className="header" width={width} height={height}>
          <div className="header-background">
            <ParticleBackground width={width} height={height}/>
          </div>
          <div className="header-content">
            <img className="header-logo" src={igniteAsset} width="300"/>
            <img className="header-zehut" src={zehutAsset} width="80"/>
          </div>
        </div>
      </div>
    );
  }

}
