import React, { Component, PropTypes } from 'react';
import VerticalContainer from './VerticalContainer';
import '../../styles/ProfileGridItem.scss';

export default class ProfileGridItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  }

  render() {
    const { image, name } = this.props;

    return (
      <div className="profileGridItem">
        <div className="profileGridItem-image">
          <VerticalContainer>
            <img src={image}/>
          </VerticalContainer>
        </div>
        <div className="profileGridItem-content">
          <div className="profileGridItem-title">
            <span className="profileGridItem-name">
              {name}
            </span>
          </div>
          <span className="profileGridItem-body">
            {/* body */}
          </span>
        </div>
      </div>
    );
  }
}
