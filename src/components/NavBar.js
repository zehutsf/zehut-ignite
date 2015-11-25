import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom';
import Sticky from 'react-sticky';
import { Link } from 'react-scroll';
import '../../styles/NavBar.scss';
import cx from 'classnames';

const NAV_ITEMS = [
  {
    title: 'WHAT',
    url: 'what'
  },
  {
    title: 'WHO',
    url: 'who'
  },
  {
    title: 'WHERE',
    url: 'where'
  },
  {
    title: 'REGISTER',
    url: 'register',
    className: 'NavItem-cta'
  }
];

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {sticky: true};
  }

  componentDidMount() {
    // console.log('the el is', this.nav);
    // const rect = this.nav.getBoundingClientRect();
    // console.log('the rec tis', rect);
    setTimeout(() => this.setState({sticky: true}), 2000);
  }

  renderNavItems() {
    return NAV_ITEMS.map(item => {
      const className = cx('NavItem', item.className);
      return (
        <Link key={item.url} activeClassName="NavItem-active"
          to={item.url} spy smooth offset={-75}
          className={className}>{item.title}</Link>
      );
    });
  }

  renderSticky() {
    return (
      <Sticky className="NavBar" stickyClass="NavBar-sticky" topOffset={-50}>
        <div className="NavBar-items">
          {this.renderNavItems()}
        </div>
      </Sticky>
    );
  }

  render() {
    if (this.state.sticky) {
      return this.renderSticky();
    }

    return (
      <div className="NavBar">
        <div className="NavBar-items">
          {this.renderNavItems()}
        </div>
      </div>
    );
  }
}
