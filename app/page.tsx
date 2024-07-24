"use client"
import Image from "next/image";
import React, { useState, useRef, useMemo, useEffect } from 'react';
import MapView from '../component/MapView'
import {DataProvider} from '../component/Datacontext'
export default function Home() {
return <div>
    <DataProvider>
    <MapView/>
    </DataProvider>
</div>
}