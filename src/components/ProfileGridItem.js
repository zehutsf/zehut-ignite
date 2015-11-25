import React from 'react';
import VerticalContainer from './VerticalContainer';
import '../../styles/ProfileGridItem.scss';

export default ({ name, body, image }) => (
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
        {body}
      </span>
    </div>
  </div>
);
