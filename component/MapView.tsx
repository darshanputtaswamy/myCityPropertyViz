//@ts-nocheck
"use client"
import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { NextUIProvider, Button } from "@nextui-org/react";
import properties from "../app/data.json"
import Pin from './Pin';
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
import FilterIcon from './FilterIcon'; // Adjust the path as necessary
import CloseIcon from './CloseIcon';   // Adjust the path as necessary
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

  const data = useMemo(() => {
    return properties.filter(property => {
      // Filter conditions based on minPrice, maxPrice, minArea, maxArea
      let price = property.price >= state.minPrice && property.price <= state.maxPrice 
      let area = property.plotArea >= state.minArea && property.plotArea <= state.maxArea
      let dataset = state.status == 'All Data' || (state.status == "Active" && !property.inactiveReason)||(state.status == "Sold" && property.inactiveReason &&  property.inactiveReason.includes("SOLD")) || (state.status =="Inactive" && property.inactiveReason)
      return (
       price  && area && dataset
        
      );
    });
  }, [properties, state]);


  const Pins = () => <>
    {data.map((plot, index) => (
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
