import * as React from 'react';
import Header from './Header';
import PhotoSlideshow from './PhotoSlideshow';
import PropertyDetails from './PropertyDetails';
import Amenities from './Amenities';
import ContactOwner from './ContactOwner';

const  PlotDetails = ({ data}: any) => {
    console.log(data)
  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg w-[32rem] ">
    <Header title={data.title} locality={data.secondaryTitle} />
    <PhotoSlideshow id={data.id} photos={data.photos} />
    <PropertyDetails 
      formattedPrice={data.formattedPrice}
      plotArea={data.plotArea}
      plotWidth={data.plotWidth}
      plotLength={data.plotLength}
      khataCertificateType={data.aea__.KHATA_CERTIFICATE_TYPE.display_value}
      ownerDescription={data.ownerDescription}
    />
  </div>
  );
}

export default PlotDetails;