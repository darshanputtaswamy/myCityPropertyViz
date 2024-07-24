//@ts-nocheck
"use client"
import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { NextUIProvider, Button } from "@nextui-org/react";

import Pin from './Icons/PinIcon';
import PlotDetails from './Popup'
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import ControlPanel from './ControlPanel';
import FilterIcon from './Icons/FilterIcon'; // Adjust the path as necessary
import CloseIcon from './Icons/CloseIcon';   // Adjust the path as necessary
import { useData } from './Datacontext';

export default function MapView() {
  const [viewport, setViewport] = useState({
    longitude: 77.59369,
    latitude: 12.97194,
    zoom: 14
  })

  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [filter, setOpenFilter] = useState<any>(false);
  const { state } = useData();
  
  const Pins = () => <>
    {state.filteredProperties.map((plot, index) => (
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
        <Pin selected={popupInfo && popupInfo.id == plot.id} />
      </Marker>
    ))}
  </>

  return (
    <NextUIProvider>
      <div className="dark text-foreground bg-background">

        <Map
          initialViewState={viewport}
          mapStyle={`mapbox://styles/mapbox/${state.style}`}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          style={{ width: '100vw', height: '100vh' }}
        >
          <GeolocateControl position="top-left" />
          <FullscreenControl position="top-left" />
          <NavigationControl position="top-left" />


          <ScaleControl />

          <Pins />

        </Map>

        {popupInfo && (
          <PlotDetails className="" data={popupInfo} />
        )}

        <div className="container">
          {filter && <ControlPanel />}
          <Button
            isIconOnly
            className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 fixed z-300 top-48 -left-1"
            radius="full"
            variant="light"
            onPress={() => setOpenFilter((v) => !v)}
          >
            {!filter ? <FilterIcon width={24} height={24} /> : <CloseIcon width={24} height={24} />}
          </Button>
        </div>
      </div>
    </NextUIProvider>
  );
}
