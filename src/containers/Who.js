import React, { Component } from 'react';
import ProfileGridItem from '../components/ProfileGridItem';
import data from '../data';
import { Element } from 'react-scroll';

export default class Who extends Component {
  renderProfiles() {
    return data.profiles.map(profile => (
      <ProfileGridItem key={profile.name} {...profile}/>
    ));
  }

  render() {
    return (
      <div className="section">
        <Element name="what">
          <div className="section-content section-headline">
            A party showcasing startups and entrepreneurs in our community on Chanukah.
          </div>
          <div className="section-content section-body">
            <p>
              Join us at an after work cocktail party and meetup, featuring a DJ spinning vinyl, Vodka + Latke Bar, Menorah lighting.
            </p>
            <p>
              Our mission is to use the power of community to foster personal and professional development for people with ideas. Startups featuring leaders from our Young Adult community will be on display.
            </p>
          </div>
        </Element>

        <Element name="who">
          <div className="profileGrid">
            <div className="content">
              {this.renderProfiles()}
            </div>
          </div>
        </Element>

        <Element name="where">
          <div className="section-content section-headline">
            Join us at Bespoke
          </div>
          <div className="section-content section-body">
            <p>
              Bespoke is a trifecta of coworking, demo, and event spaces strategically
located at Westfield San Francisco in the epicenter of downtown.
            </p>
          </div>
        </Element>

        <Element name="register" />
      </div>
    );
  }
}
