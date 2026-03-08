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

  // Универсальная функция для получения clientX
  const getClientX = (e: MouseEvent | TouchEvent): number => {
    if ('touches' in e && e.touches.length > 0) {
      return e.touches[0].clientX;
    }
    return (e as MouseEvent).clientX;
  };

  const handleStart = useCallback((which: "left" | "right", e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = which;
    
    // Mouse события
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    
    // Touch события
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
  }, []);

  const handleMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!dragging.current || !barRef.current) return;
    e.preventDefault();

    const rect = barRef.current.getBoundingClientRect();
    const x = getClientX(e) - rect.left;
    const percent = clamp((x / rect.width) * 100, 0, 100);
    const value = percentToValue(percent);

    if (dragging.current === "left") {
      const newVal = Math.min(value, rightVal - rangeValues);
      const finalVal = clamp(newVal, min, max);
      setLeftVal(finalVal);
      currentRange.current.min = finalVal;
    } else {
      const newVal = Math.max(value, leftVal + rangeValues);
      const finalVal = clamp(newVal, min, max);
      setRightVal(finalVal);
      currentRange.current.max = finalVal;
    }
  }, [leftVal, rightVal, min, max, rangeValues, percentToValue]);

  const handleEnd = useCallback(() => {
    dragging.current = null;
    
    // Удаляем все события
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseup", handleEnd);
    document.removeEventListener("touchmove", handleMove);
    document.removeEventListener("touchend", handleEnd);

    onChange?.(currentRange.current);
  }, [onChange]);

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
          onMouseDown={(e) => handleStart("left", e)}
          onTouchStart={(e) => handleStart("left", e)}
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
          onMouseDown={(e) => handleStart("right", e)}
          onTouchStart={(e) => handleStart("right", e)}
          title={ mode === "price" ? `$${rightVal}K` : `${rightVal}`}
        >
          <div className="price-value">
            {mode === "price" && formatPrice(rightVal)}
            {mode === "size" && rightVal}
            {mode === "build" && rightVal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RangeBar;
