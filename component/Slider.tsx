import React from 'react';

type SliderProps = {
  value: [number, number];
  onChange: (event: React.ChangeEvent<HTMLInputElement>, newValue: number | number[]) => void;
  min: number;
  max: number;
  step: number;
};

const Slider: React.FC<SliderProps> = ({ value, onChange, min, max, step }) => {
  return (
    <input
      type="range"
      value={value[0]}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(e, [parseInt(e.target.value), value[1]])}
    />
  );
};

export default Slider;