import React, { Component } from 'react';
import ProfileGridItem from '../components/ProfileGridItem';
import data from '../data';

export default class Who extends Component {
  renderProfiles() {
    return data.profiles.map(profile => (
      <ProfileGridItem key={profile.name} {...profile}/>
    ));
  }

  render() {
    return (
      <div className="section">
        <div className="section-title">
        </div>
        <div className="content">
          <div className="section-body">
              <p>
                Join us at an after work cocktail party and meetup, featuring a DJ spinning vinyl, Vodka + Latke Bar, Menorah lighting.
              </p>
              <p>
                Our mission is to use the power of community to foster personal and professional development for people with ideas. Startups featuring leaders from our Young Adult community will be on display.
              </p>
          </div>
        </div>
        <div className="profileGrid">
          <div className="content">
            {this.renderProfiles()}
          </div>
        </div>
        <div className="content">
          <div className="section-body">

          </div>
        </div>
      </div>
    );
  }
}
