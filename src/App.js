import React, { Component } from 'react';
import DocumentMeta from 'react-document-meta';
import Header from './components/Header';
import ProfileGrid from './components/ProfileGrid';
import { Element } from 'react-scroll';

import data from './data';
import config from './config';

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
            <p className="center">
              <a href={data.ticketUrl} className="button-cta">GET TICKETS</a>
            </p>
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
            Bespoke at Westfield
            <div className="headline-sub">
              845 MARKET STREET, 4th FLOOR
            </div>
          </div>
          <div className="section-body">
            <p>
              Join us at Bespoke, a trifecta of coworking, demo, and event spaces strategically
located at Westfield San Francisco in the epicenter of downtown.
            </p>
          </div>
        </div>
      </Element>
    );
  }

  renderRegister() {
    return (
      <Element name="register">
        <div className="section-content center">
          <div className="section-body">
            <p className="center">
              <a href={data.ticketUrl} className="button-cta">GET TICKETS</a>
            </p>
            <p>
              Want to bring your company or team?
              &nbsp;<a href="mailto:rabbi@jlisf.org">E-mail us</a> for group rate information.
            </p>

          </div>
        </div>
      </Element>
    );
  }

  render() {
    return (
      <div>
        <DocumentMeta {...config.app}/>
        <Element name="home">
          <Header/>
        </Element>
        <div className="content-wrapper">
          {this.renderWhat()}
          {this.renderWho()}
          {this.renderWhere()}
          {this.renderRegister()}
        </div>
        <div className="footer">
          &copy; 2015 Zehut.
          &nbsp;<a href="http://github.com/zehutsf/zehut-ignite">Code on Github.</a>
        </div>
      </div>
    );
  }

}
