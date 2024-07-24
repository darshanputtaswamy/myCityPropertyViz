import * as React from 'react';

import PhotoSlideshow from './PhotoSlideshow';
import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@nextui-org/react";



const PlotDetails = ({ data }: any) => {
  console.log(data)
  return (
    <Card className="max-w-[400px] border-none bg-background/60 dark:bg-default-100/70 fixed z-300 top-10 right-5">
      <CardHeader className="flex flex-col">
        <div className="flex flex-row">
          <span>
            {data.title}
          </span>
          <a className="pl-2" href={data.shortUrl} target='_blank'><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 128 128">
            <path d="M 84 11 C 82.3 11 81 12.3 81 14 C 81 15.7 82.3 17 84 17 L 106.80078 17 L 60.400391 63.400391 C 59.200391 64.600391 59.200391 66.499609 60.400391 67.599609 C 61.000391 68.199609 61.8 68.5 62.5 68.5 C 63.2 68.5 63.999609 68.199609 64.599609 67.599609 L 111 21.199219 L 111 44 C 111 45.7 112.3 47 114 47 C 115.7 47 117 45.7 117 44 L 117 14 C 117 12.3 115.7 11 114 11 L 84 11 z M 24 31 C 16.8 31 11 36.8 11 44 L 11 104 C 11 111.2 16.8 117 24 117 L 84 117 C 91.2 117 97 111.2 97 104 L 97 59 C 97 57.3 95.7 56 94 56 C 92.3 56 91 57.3 91 59 L 91 104 C 91 107.9 87.9 111 84 111 L 24 111 C 20.1 111 17 107.9 17 104 L 17 44 C 17 40.1 20.1 37 24 37 L 69 37 C 70.7 37 72 35.7 72 34 C 72 32.3 70.7 31 69 31 L 24 31 z" fill="white"></path>
          </svg></a>
        </div>
      </CardHeader>
      <CardBody>
        <table className="text-sm text-left rtl:text-right">
          <tr className='border-b'><th className='px-3 py-2 '>Price</th><td className="px-3 py-2">{data.formattedPrice}</td></tr>
          <tr className='border-b'><th className='px-3 py-2 '>Plot Area</th><td className="px-3 py-2">{data.plotArea} sq.ft</td></tr>
          <tr className='border-b '><th className='px-3 py-2 '>Dimension</th><td className="px-3 py-2">{data.plotWidth && data.plotLength ? `${data.plotWidth} x ${data.plotLength}` : 'Not Specified'}</td></tr>
          <tr className='border-b '><th className='px-3 py-2 '>Khata Certificate</th><td className="px-3 py-2">{data.aea__?.KHATA_CERTIFICATE_TYPE?.display_value}</td></tr>
        </table>
        <PhotoSlideshow id={data.id} photos={data.photos} />
        {data.ownerDescription && <div className="m-2">
          <p className="">Owner Description</p>
          <p className="overflow-y-scroll h-32">{data.ownerDescription}</p>
        </div>}
        {data && <div className="m-2">
          <p className="">Payload</p>
          <p className="overflow-y-scroll h-32">{JSON.stringify(data)}</p>
        </div>}
      </CardBody>
    </Card>
  );
}

export default PlotDetails;