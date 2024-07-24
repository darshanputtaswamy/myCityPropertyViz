import React from 'react';

const CloseIcon = ({ width = 24, height = 24, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill={color}
  >
    <path d="M18.36,5.64a1.25,1.25,0,0,0-1.77,0L12,10.23,7.41,5.64a1.25,1.25,0,0,0-1.77,1.77L10.23,12,5.64,16.59a1.25,1.25,0,1,0,1.77,1.77L12,13.77l4.59,4.59a1.25,1.25,0,0,0,1.77-1.77L13.77,12l4.59-4.59A1.25,1.25,0,0,0,18.36,5.64Z" />
  </svg>
);

export default CloseIcon;
