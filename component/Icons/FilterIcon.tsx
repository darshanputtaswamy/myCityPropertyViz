import React from 'react';

const FilterIcon = ({ width = 24, height = 24, color = 'currentColor' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill={color}
  >
    <path d="M20,4H4A2,2,0,0,0,2,6V8.18l7,5.55V20a2,2,0,0,0,2,2h2a2,2,0,0,0,2-2V13.73l7-5.55V6A2,2,0,0,0,20,4ZM18,8.47,12,13.69,6,8.47V6H18Z" />
  </svg>
);

export default FilterIcon;
