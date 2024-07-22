import React from 'react';

const PropertyDetails = ({ formattedPrice, plotArea, plotWidth, plotLength, khataCertificateType, ownerDescription }:any) => (
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-4">Property Details</h2>
    <div className="grid grid-cols-2 gap-4 mb-4">
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="text-gray-600">Price</p>
        <p className="text-lg font-semibold text-gray-800">{formattedPrice}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="text-gray-600">Plot Area</p>
        <p className="text-lg font-semibold text-gray-800">{plotArea} sqft</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="text-gray-600">Width</p>
        <p className="text-lg font-semibold text-gray-800">{plotWidth} ft</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="text-gray-600">Length</p>
        <p className="text-lg font-semibold text-gray-800">{plotLength} ft</p>
      </div>
      <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="text-gray-600">KHATA Certificate</p>
        <p className="text-lg font-semibold text-gray-800">{khataCertificateType}</p>
      </div>
      <div className="col-span-2 bg-gray-100 p-4 rounded-lg shadow-sm">
        <p className="text-gray-600">Owner Description</p>
        <p className="text-gray-800">{ownerDescription}</p>
      </div>
    </div>
  </div>
);

export default PropertyDetails;
