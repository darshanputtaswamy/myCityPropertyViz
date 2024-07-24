// components/DataContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import properties from "./data/data.json"
import geoJsonCoverter from "./data/geoJsonCoverter";


let geoData = geoJsonCoverter(properties)
 

// Define types for state
type State = {
  minValuePrice: number;
  maxValuePrice: number;
  minValueArea: number;
  maxValueArea: number;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  dataType: "Plain Data" | "Price Heatmap" | "Area Sold Heatmap";
  status: "All Data" | "Inactive" | "Sold" | "Active";
  style: "dark-v11" | "satellite-streets-v12" | "streets-v12" | "outdoors-v12" | "light-v11";
  properties: any;
  filteredProperties: any;
};

// Define action types
type Action =
  | { type: 'UPDATE_PRICE_RANGE'; payload: { minPrice: number; maxPrice: number } }
  | { type: 'UPDATE_AREA_RANGE'; payload: { minArea: number; maxArea: number } }
  | { type: 'UPDATE_DATA_TYPE'; payload: "Plain Data" | "Price Heatmap" | "Area Sold Heatmap" }
  | { type: 'UPDATE_STATUS'; payload: "All Data" | "Inactive" | "Sold" | "Active" }
  | { type: 'UPDATE_STYLE'; payload: "dark-v11" | "satellite-streets-v12" | "streets-v12" | "outdoors-v12" | "light-v11" };


function minMax(items: any) {
  return items.reduce((acc: any, val: any) => {
    acc[0] = (acc[0] === undefined || val < acc[0]) ? val : acc[0]
    acc[1] = (acc[1] === undefined || val > acc[1]) ? val : acc[1]
    return acc;
  }, []);
}

let findBound = (data: any) => {
  let price: any = data.map((item: any) => item.properties.price)
  let area: any = data.map((item: any) => item.properties.plotArea)
  let pricePerArea: any = data.map((item: any) => item.properties.pricePerUnit)

  let minMaxPrice = minMax(price)
  let minMaxArea = minMax(area)
  let minMaxPricePerArea = minMax(pricePerArea)
  console.log(minMaxPricePerArea)
  return [minMaxPrice, minMaxArea]

}


let bounds = findBound(geoData)
console.log(bounds)
// Initial state
const initialState: State = {
  minValueArea: bounds[1][0],
  maxValueArea: bounds[1][1],

  minArea: bounds[1][0],
  maxArea: bounds[1][1],

  minValuePrice: bounds[0][0],
  maxValuePrice: bounds[0][1],

  minPrice: bounds[0][0],
  maxPrice: bounds[0][1],
  
  dataType: 'Plain Data',
  status: 'All Data',
  style: 'dark-v11',
  properties: geoData,
  filteredProperties: geoData
};

// Context creation
const DataContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Reducer function
const dataReducer = (state: State, action: Action): State => {

  let newState: any;
  switch (action.type) {
    case 'UPDATE_PRICE_RANGE':
      newState = { ...state, minPrice: action.payload.minPrice, maxPrice: action.payload.maxPrice };
      break;
    case 'UPDATE_AREA_RANGE':
      newState = { ...state, minArea: action.payload.minArea, maxArea: action.payload.maxArea };
      break;
    case 'UPDATE_STATUS':
      newState = { ...state, status: action.payload };
      break;
    case 'UPDATE_STYLE':
      return { ...state, style: action.payload };
    case 'UPDATE_DATA_TYPE':
      return { ...state, dataType: action.payload };
    default:
      return state;
  }

 
  let nfilteredProperties = newState.properties.filter((property: any) => {
    // Filter conditions based on minPrice, maxPrice, minArea, maxArea
    let price = property.properties.price >= newState.minPrice && property.properties.price <= newState.maxPrice
    let area = property.properties.plotArea >= newState.minArea && property.properties.plotArea <= newState.maxArea
    let dataset = newState.status == 'All Data' || (newState.status == "Active" && !property.properties.inactiveReason) || (newState.status == "Sold" && property.properties.inactiveReason && property.properties.inactiveReason.includes("SOLD")) || (newState.status == "Inactive" && property.properties.inactiveReason)
    return (
      price && area && dataset

    );
  })
  if(action.type != 'UPDATE_STATUS'){
    return { ...newState, filteredProperties: nfilteredProperties }
  }else{
    let nbounds = findBound(nfilteredProperties) 
    console.log(nbounds,nfilteredProperties.length )
    return { ...newState, 

      minValueArea:nbounds[1][0],
      maxValueArea: nbounds[1][1],
      minArea: nbounds[1][0],
      maxArea: nbounds[1][1],
      minValuePrice: nbounds[0][0],
      maxValuePrice:nbounds[0][1],
      minPrice: nbounds[0][0],
      maxPrice: nbounds[0][1],
      filteredProperties: nfilteredProperties }
  }
};

// DataProvider component
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};

// Custom hook to use DataContext
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};