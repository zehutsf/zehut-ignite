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
import What from './containers/What';
import Where from './containers/Where';

import '../styles/App.scss';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {width: 0, height: 520};
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
                A special Chanukah event celebrating our entrepreneurs.
              </span>
            </div>
          </VerticalContainer>
          <NavBar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <Element name="who">
              <Who/>
            </Element>
            <Element name="what">
              <What/>
            </Element>
            <Element name="where">
              <Where/>
            </Element>
          </div>
        </div>
      </div>
    );
  }

}
