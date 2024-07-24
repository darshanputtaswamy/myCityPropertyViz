import React from 'react';
import { useData } from './Datacontext';

import {Card, CardBody, Image, Button, Slider} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/react";

const ControlPanel: React.FC = () => {
  const { state, dispatch } = useData();

  const handlePriceChange = ( newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch({
        type: 'UPDATE_PRICE_RANGE',
        payload: { minPrice: newValue[0], maxPrice: newValue[1] },
      });
    }
  };

  const handleAreaChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      dispatch({
        type: 'UPDATE_AREA_RANGE',
        payload: { minArea: newValue[0], maxArea: newValue[1] },
      });
    }
  };

  const handleDataTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'UPDATE_DATA_TYPE',
      payload: event.target.value as "Plain Data"|"Price Heatmap"|"Area Sold Heatmap",
    });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'UPDATE_STATUS',
      payload: event.target.value as "All Data"|"Inactive"| "Sold"|"Active",
    });
  };

  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch({
      type: 'UPDATE_STYLE',
      payload: event.target.value as "dark-v11"|"satellite-streets-v12"| "streets-v12"|"outdoors-v12"|"light-v11",
    });
  };


  return (
    <Card
    isBlurred
    className="border-none bg-background/50 dark:bg-default-100/50 w-[400px] pl-5 fixed z-300 top-0 left-6"
    shadow="sm"
  ><CardBody>
     <div className="flex flex-col gap-3 ">
        <Slider
            value={[state.minPrice, state.maxPrice]}
            label="Price Range"
            step={100000} 
            minValue={state.minValuePrice} 
            maxValue={state.maxValuePrice} 
            formatOptions={{style: "currency", currency: "IND"}}
            onChange={handlePriceChange}
            classNames={{
              track: "bg-default-500/30",
              thumb: "w-2 h-2 after:w-2 after:h-2 ",
            }}
        />
        <Slider
          value={[state.minArea, state.maxArea]}
          label="Area Sq.ft"
          minValue={state.minValueArea}
          maxValue={state.maxValueArea}
          step={100}
          onChange={handleAreaChange }
          classNames={{
            track: "bg-default-500/30",
            thumb: "w-2 h-2 after:w-2 after:h-2 ",
          }}
        />
        <Select
      label="Chart Type"
      placeholder="Select a chat type"
      selectionMode="single"
      className="max-w-md"
      onChange={ handleDataTypeChange}
      defaultSelectedKeys={["Plain Data"]}
    >
      {["Plain Data","Price Heatmap", "Area Sold Heatmap"].map((e,i) => (
        <SelectItem key={e}>
          {e}
        </SelectItem>
      ))}
    </Select>
    
    <Select
      label="Dataset Type"
      placeholder="Select a dataset"
      selectionMode="single"
      className="max-w-md"
      defaultSelectedKeys={["All Data"]}
      onChange={ handleStatusChange}
    >
      {["All Data","Inactive", "Sold","Active"].map((e,i) => (
        <SelectItem key={e}>
          {e}
        </SelectItem>
      ))}
    </Select>
    <Select
      label="Map background"
      placeholder="Select a Maps bg"
      selectionMode="single"
      className="max-w-md"
      defaultSelectedKeys={["light-v11"]}
      onChange={ handleStyleChange}
    >
      {["dark-v11","satellite-streets-v12", "streets-v12","outdoors-v12","light-v11"].map((e,i) => (
        <SelectItem key={e}>
          {e}
        </SelectItem>
      ))}
    </Select>
    </div>
     </CardBody>
   
    </Card>
  );
};

export default ControlPanel;