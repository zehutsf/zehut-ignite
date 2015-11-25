import React, { Component } from 'react';
import Header from './components/Header';
import ProfileGrid from './components/ProfileGrid';
import { Element } from 'react-scroll';

import data from './data';

import '../styles/App.scss';

export default class App extends Component {

  renderWhat() {
    return (
      <Element name="what">
        <div className="section-content">
          <div className="section-headline">
            A party showcasing startups and entrepreneurs in our community on Chanukah.
            <div className="headline-sub">
              Wednesday, Dec 9
            </div>
          </div>
          <div className="section-body">
            <p>
              Join us at an after work cocktail party and meetup, featuring a DJ spinning vinyl, Vodka + Latke Bar, Menorah lighting.
            </p>
            <p>
              Our mission is to use the power of community to foster personal and professional development for people with ideas. Startups featuring leaders from our Young Adult community will be on display.
            </p>
          </div>
        </div>
      </Element>
    );
  }

  renderWho() {
    return (
      <Element name="who">
        <div className="profileGrid">
          <div className="content">
            <ProfileGrid profiles={data.profiles}/>
          </div>
        </div>
      </Element>
    );
  }

  renderWhere() {
    return (
      <Element name="where">
        <div className="section-content">
          <div className="section-headline">
            Join us at Bespoke
          </div>
          <div className="section-body">
            <p>
              Bespoke is a trifecta of coworking, demo, and event spaces strategically
located at Westfield San Francisco in the epicenter of downtown.
            </p>
          </div>
        </div>
      </Element>
    );
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="content-wrapper">
          {this.renderWhat()}
          {this.renderWho()}
          {this.renderWhere()}
          <Element name="register" />
        </div>
      </div>
    );
  }

}
