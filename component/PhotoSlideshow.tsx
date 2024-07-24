import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const PhotoSlideshow = ({ id, photos }:any) => (
  <div  className="mx-auto my-2 w-9/12 h-60 overflow-clip">
    <Carousel infiniteLoop useKeyboardArrows autoPlay showThumbs={false}>
      {photos.map((photo:any, index:any) => (
        <div   key={index}>
          <img src={"https://images.nobroker.in/images/"+ id + '/'+ photo.imagesMap.large} alt={photo.title} className="object-cover" width={750} height={562} />
        </div>
      ))}
    </Carousel>
  </div>
);

export default PhotoSlideshow;