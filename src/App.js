import React, { Component } from 'react';
import ParticleBackground from './components/ParticleBackground';
import VerticalContainer from './components/VerticalContainer';
import NavBar from './components/NavBar';
import { Element } from 'react-scroll';
// import Sticky from 'react-sticky';
// import shuffle from 'lodash/collection/shuffle';

import igniteAsset from '../static/images/ignite.svg';
import zehutAsset from '../static/images/zehut-white.svg';
import Who from './containers/Who';
import Where from './containers/Where';

import '../styles/App.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {width: '100%', height: 520};
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
            <VerticalContainer>
              <div className="header-content">
              <img className="header-logo" src={igniteAsset} />
              <img className="header-zehut" src={zehutAsset} width="80"/>
              <br/>
              <span className="headline">
                A party showcasing startups and entrepreneurs in our community on Chanukah.
              </span>
            </div>
          </VerticalContainer>
          <NavBar />
        </div>
        <div className="content-wrapper">
            <Element name="who">
              <Who/>
            </Element>
            <Element name="where">
              <Where/>
            </Element>
        </div>
      </div>
    );
  }

}
