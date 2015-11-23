import React, { Component } from 'react';
import ParticleBackground from './components/ParticleBackground';
import VerticalContainer from './components/VerticalContainer';

import igniteAsset from '../static/images/ignite.svg';
import zehutAsset from '../static/images/zehut-white.svg';

import '../styles/App.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {width: 0, height: 500};
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.handleResize();
  }

  handleResize() {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const { width, height } = this.state;

    return (
      <div>
        <div className="header" style={{ width, height }}>
          <div className="header-background">
            <ParticleBackground width={width} height={height}/>
          </div>
          <div className="header-content">
            <VerticalContainer>
              <img className="header-logo" src={igniteAsset} />
              <img className="header-zehut" src={zehutAsset} width="80"/>
              <br/>
              <span className="headline">
                A special Chanukah event celebrating the stories of our community’s entrepreneurs.
              </span>
            </VerticalContainer>
          </div>
        </div>
      </div>
    );
  }

}
