import React from 'react';

const HoverEffect = ({ children, ...rest }) => {
  const handleMouseEnter = (event) => {
    event.currentTarget.style.transform = "scale(1.05)";
    event.currentTarget.style.boxShadow = "0px 8px 16px rgba(0, 0, 0, 0.2)";
  };

  const handleMouseLeave = (event) => {
    event.currentTarget.style.transform = "scale(1)";
    event.currentTarget.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";
  };

  return React.cloneElement(children, {
    ...rest,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    style: {
      ...children.props.style, 
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer'
    }
  });
};

export default HoverEffect;
