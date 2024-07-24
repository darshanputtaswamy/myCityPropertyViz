// components/DataContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define types for state
type State = {
  minValuePrice:number;
  maxValuePrice:number;
  minValueArea:number;
  maxValueArea:number;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  dataType: "Plain Data"|"Price Heatmap"|"Area Sold Heatmap";
  status: "All Data"|"Inactive"| "Sold"|"Active";
  style:"dark-v11"|"satellite-streets-v12"| "streets-v12"|"outdoors-v12"|"light-v11";
};

// Define action types
type Action =
  | { type: 'UPDATE_PRICE_RANGE'; payload: { minPrice: number; maxPrice: number } }
  | { type: 'UPDATE_AREA_RANGE'; payload: { minArea: number; maxArea: number } }
  | { type: 'UPDATE_DATA_TYPE'; payload: "Plain Data"|"Price Heatmap"|"Area Sold Heatmap" }
  | { type: 'UPDATE_STATUS'; payload: "All Data"|"Inactive"| "Sold"|"Active" }
  | { type: 'UPDATE_STYLE'; payload:"dark-v11"|"satellite-streets-v12"| "streets-v12"|"outdoors-v12"|"light-v11" };

// Initial state
const initialState: State = {
  minValueArea:0,
  maxValueArea:40000,
  minValuePrice:0,
  maxValuePrice:100000000,
  minPrice: 0,
  maxPrice: 10000000,
  minArea: 900,
  maxArea: 2400,
  dataType: 'Plain Data',
  status: 'All Data',
  style:'dark-v11',
};

// Context creation
const DataContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

// Reducer function
const dataReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_PRICE_RANGE':
      return { ...state, minPrice: action.payload.minPrice, maxPrice: action.payload.maxPrice };
    case 'UPDATE_AREA_RANGE':
      return { ...state, minArea: action.payload.minArea, maxArea: action.payload.maxArea };
    case 'UPDATE_DATA_TYPE':
      return { ...state, dataType: action.payload };
    case 'UPDATE_STATUS':
      return { ...state, status: action.payload };
    case 'UPDATE_STYLE':
        return { ...state, style: action.payload };
    default:
      return state;
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