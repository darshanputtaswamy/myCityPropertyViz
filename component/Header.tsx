import React from 'react';

const Header = ({ title, locality }:any) => (
  <div className="text-center mb-6">
    <h1 className="text-xl font-bold text-gray-800">{title}</h1>
    <p className="text-gray-600 text-sm">{locality}</p>
  </div>
);

export default Header;