import React from 'react';

const ContactOwner = ({ ownerName }:any) => (
  <div className="text-center mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
    <p className="text-gray-800 text-lg mb-2">Interested in this property?</p>
    <p className="text-gray-600 mb-4">Contact the owner: {ownerName}</p>
  </div>
);

export default ContactOwner;
