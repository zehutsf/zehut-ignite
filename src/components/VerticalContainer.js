import React from 'react';

const containerStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'table',
  width: '100%',
  height: '100%'
};

const contentStyle = {
  position: 'relative',
  verticalAlign: 'middle',
  display: 'table-cell'
};

const VerticalCenterContainer = ({ children, ...rest }) => { // eslint-disable-line no-redeclare
  return (
    <div className="vc-container" style={containerStyle} {...rest} >
      <div className="vc-content" style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default VerticalCenterContainer;
