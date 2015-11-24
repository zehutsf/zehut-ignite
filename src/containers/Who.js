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
      <div>{this.renderProfiles()}</div>
    );
  }
}
