import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom';
import Sticky from 'react-sticky';
import { Link } from 'react-scroll';
import '../../styles/NavBar.scss';

const NAV_ITEMS = [
  {
    title: 'WHO',
    url: 'who'
  },
  {
    title: 'WHAT',
    url: 'what'
  },
  {
    title: 'WHERE',
    url: 'where'
  }
];

export default class NavBar extends Component {
  componentDidMount() {
    // console.log('the el is', this.nav);
    // const rect = this.nav.getBoundingClientRect();
    // console.log('the rec tis', rect);
  }

  renderNavItems() {
    return NAV_ITEMS.map(item => (
      <Link key={item.url} activeClassName="NavItem-active"
        to={item.url} spy smooth offset={-75}
        className="NavItem">{item.title}</Link>
    ));
  }

  render() {
    return (
      <Sticky className="NavBar" stickyClass="NavBar-sticky" topOffset={-50}>
        <div className="NavBar-items">
          {this.renderNavItems()}
        </div>
      </Sticky>
    );
  }
}
