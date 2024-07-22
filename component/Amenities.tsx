import React from 'react';

const Amenities = ({ amenities }:any) => {
  const amenitiesList = [
    { label: 'Clubhouse', key: 'CLUB' },
    { label: 'Pool', key: 'POOL' },
    { label: 'Park', key: 'PARK' },
    { label: 'CCTV Surveillance', key: 'CPA' },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Amenities</h2>
      <ul className="list-disc pl-5 text-gray-700">
        {amenitiesList.map((amenity) => (
          amenities[amenity.key] && (
            <li key={amenity.key} className="mb-2">{amenity.label}</li>
          )
        ))}
      </ul>
    </div>
  );
};

export default Amenities;
