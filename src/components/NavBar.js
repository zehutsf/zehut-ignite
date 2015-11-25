import React, { Component } from 'react';
import Sticky from 'react-sticky';
import { Link } from 'react-scroll';
import '../../styles/NavBar.scss';
import cx from 'classnames';

// Required shim due to:
// https://github.com/captivationsoftware/react-sticky/issues/34
// This will throw a warning in development mode.
const getInitialState = Sticky.prototype.getInitialState;
Sticky.prototype.getInitialState = function() { // eslint-disable-line func-names
  return {
    ...getInitialState(),
    className: this.props.className,
    style: this.props.style
  };
};

const NAV_ITEMS = [
  {
    title: 'WHAT',
    url: 'what',
    offset: -100
  },
  {
    title: 'WHO',
    url: 'who',
    offset: -50
  },
  {
    title: 'WHERE',
    url: 'where',
    offset: -150,
  }
  // {
  //   title: 'REGISTER',
  //   url: 'register',
  //   className: 'NavItem-cta',
  //   offset: -100
  // }
];

export default class NavBar extends Component {
  renderNavItems() {
    return NAV_ITEMS.map(item => {
      const className = cx('NavItem', item.className);
      return (
        <Link key={item.url} activeClassName="NavItem-active"
          to={item.url} spy smooth offset={item.offset}
          className={className}>{item.title}</Link>
      );
    });
  }

  render() {
    return (
      <Sticky className="NavBar" stickyClass="NavBar-sticky" topOffset={-50}>
        <div className="NavBar-logo">
          <Link to="home" smooth>IGNITE <span className="NavBar-logo-date">DEC 9</span></Link>
        </div>
        <div className="NavBar-items">
          {this.renderNavItems()}
        </div>
      </Sticky>
    );
  }
}
