//@ts-nocheck
"use client"
import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from 'react';

import data from "./data.json" 
import Pin from '../component/Pin';
import PlotDetails from '../component/Popup'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';



export default function Home() {
  const [viewport, setViewport] = useState({
    longitude: 77.59369,
    latitude: 12.97194,
    zoom: 14
  })

  const [popupInfo, setPopupInfo] = useState<any>(null);

  const pins = useMemo(
    () =>
      data.map((plot, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={plot.location.split(',')[1]}
          latitude={plot.location.split(',')[0]}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(plot);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );


  return (
    <>
      <Map
        initialViewState={viewport}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: '100vw', height: '100vh' }}
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            style={{width:'25%'}}
            anchor="top-right"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
           <PlotDetails  data={popupInfo}/>
          </Popup>
        )}
      </Map>
    </>
  );
}
