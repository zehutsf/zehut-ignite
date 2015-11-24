import React, { Component } from 'react';
import { Link } from 'react-router';
import '../../styles/NavBar.scss';

const NAV_ITEMS = [
  {
    title: 'WHO',
    url: '/'
  },
  {
    title: 'WHAT',
    url: '/what'
  },
  {
    title: 'WHERE',
    url: '/where'
  }
];

export default class NavBar extends Component {
  renderNavItems() {
    return NAV_ITEMS.map(item => (
      <Link activeClassName="NavItem-active"
        to={item.url} className="NavItem">{item.title}</Link>
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
