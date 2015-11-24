import React, { Component, PropTypes } from 'react';
import ParticleBackground from './components/ParticleBackground';
import VerticalContainer from './components/VerticalContainer';
import NavBar from './components/NavBar';

// import Sticky from 'react-sticky';
// import shuffle from 'lodash/collection/shuffle';

import igniteAsset from '../static/images/ignite.svg';
import zehutAsset from '../static/images/zehut-white.svg';

import '../styles/App.scss';

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  }

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
    const { children } = this.props;

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
          <NavBar />
        </div>
        <div className="content">
          {children}
        </div>
      </div>
    );
  }

}
