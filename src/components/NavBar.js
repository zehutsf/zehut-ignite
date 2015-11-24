import React, { Component } from 'react';
import '../../styles/NavBar.scss';

const NAV_ITEMS = [
  'WHO', 'WHAT', 'WHERE'
];

export default class NavBar extends Component {
  renderNavItems() {
    return NAV_ITEMS.map(item => (
      <a className="NavItem">{item}</a>
    ));
  }

  render() {
    return (
      <div className="NavBar">
        <div className="NavBar-items">
          {this.renderNavItems()}
        </div>
      </div>
    );
  }
}
