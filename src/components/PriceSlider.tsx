import { Slider, SliderThumb } from "@mui/material";
import type { FC, HTMLAttributes } from "react";
import "../css/PriceSlider.css";

interface PriceThumbComponentProps extends HTMLAttributes<unknown> {}

const PriceThumbComponent: FC<PriceThumbComponentProps> = (props) => {
  const { children, ...other } = props;

  return (
    <div className="price-slider-thumb">
      <SliderThumb {...other}>
        {children}
        <span className="price-bar" />
        <span className="price-bar" />
        <span className="price-bar" />
      </SliderThumb>
    </div>
  );
};

interface PriceSliderProps {
  value: number[];
  onChange: (event: Event, value: number[]) => void;
  min: number;
  max: number;
  step?: number;
  valueLabelDisplay?: "auto" | "on" | "off";
  getAriaLabel?: () => string;
  className?: string;
}

const PriceSlider: FC<PriceSliderProps> = ({
  value,
  onChange,
  min,
  max,
  step,
  valueLabelDisplay,
  className,
}) => {
  return (
    <div className={`price-slider ${className || ""}`}>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        valueLabelDisplay={valueLabelDisplay}
        slots={{ thumb: PriceThumbComponent }}
      />
    </div>
  );
};

export default PriceSlider;
