import React, { useState, useEffect, useRef, useCallback } from "react";
import "./RangeBar.scss";
import classNames from "classnames";

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const formatPrice = (value: number) => {
  return value >= 1000 ? `$${(value / 1000).toFixed(1)}M` : `$${value}K`;
};

export const RangeBar: React.FC<{
  min?: number;    
  max?: number;    
  initialMin?: number;
  initialMax?: number;
  mode: "price" | "size" | "build",
  rangeValues?: number,
  step?: number
  onChange?: (range: { min: number; max: number }) => void;
}> = ({ 
  min = 100,      
  max = 10000,     
  initialMin = 500,   
  initialMax = 5000,
  mode,  
  rangeValues = 1,
  step = 50,
  onChange 
}) => {
  const [leftVal, setLeftVal] = useState(initialMin);
  const [rightVal, setRightVal] = useState(initialMax);
  const barRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef<"left" | "right" | null>(null);

  const currentRange = useRef({ min: initialMin, max: initialMax });

  const valueToPercent = (value: number) => ((value - min) / (max - min)) * 100;
  const percentToValue = (percent: number) => {
    const rawValue = min + ((max - min) * percent) / 100;
    return Math.round(rawValue / step) * step;
  };

  const handleMouseDown = (which: "left" | "right") => {
    dragging.current = which;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = useCallback(() => {
  dragging.current = null;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);

  onChange?.(currentRange.current);
  }, []); 

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging.current || !barRef.current) return;

    const rect = barRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = clamp((x / rect.width) * 100, 0, 100);
    const value = percentToValue(percent);

    if (dragging.current === "left") {
      const newVal = Math.min(value, rightVal - rangeValues);
      const finalVal = clamp(newVal, min, max);
      setLeftVal(clamp(newVal, min, max));
      currentRange.current.min = finalVal;
    } else {
      const newVal = Math.max(value, leftVal + rangeValues);
      const finalVal = clamp(newVal, min, max);
      setRightVal(clamp(newVal, min, max));
      currentRange.current.max = finalVal;
    }
  }, [leftVal, rightVal, min, max]);

  const leftPercent = valueToPercent(leftVal);
  const rightPercent = valueToPercent(rightVal);

  return (
    <div className="price-range-wrapper">
      <div className="price-range-labels">
        <span className={classNames("price-label", {"price-label--size" : mode === "size"})}>
          {mode === "price" && `${min}K`}
          {mode === "size" && `${min} m`}
          {mode === "build" && `${min}`}
          </span>
        <span className={classNames("price-label", {"price-label--size" : mode === "size"})}>
          {mode === "price" && `${max}K`}
          {mode === "size" && `${max} m`}
          {mode === "build" && `${max}`}
          </span>
      </div>
      
      <div
        className="price-range-bar"
        ref={barRef}
      >
        <div className="price-range-track" />
        <div
          className="price-range-selected"
          style={{
            left: `${leftPercent}%`,
            width: `${rightPercent - leftPercent}%`,
          }}
        />
        
        {/* Левый ползунок */}
        <div
          className="price-range-thumb left-thumb"
          style={{ left: `${leftPercent}%` }}
          onMouseDown={() => handleMouseDown("left")}
          title={ mode === "price" ? `$${leftVal}K` : `${leftVal}`}
        >
          <div className="price-value">
            {mode === "price" && formatPrice(leftVal)}
            {mode === "size" && leftVal}
            {mode === "build" && leftVal}
            </div>
        </div>
        
        {/* Правый ползунок */}
        <div
          className="price-range-thumb right-thumb"
          style={{ left: `${rightPercent}%` }}
          onMouseDown={() => handleMouseDown("right")}
          title={ mode === "price" ? `$${rightVal}K` : `${rightVal}`}
        >
          <div className="price-value">{ mode === "price" ? formatPrice(rightVal) : rightVal}</div>
        </div>
      </div>
    </div>
  );
};

export default RangeBar;
