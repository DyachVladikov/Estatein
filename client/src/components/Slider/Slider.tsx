import classNames from "classnames";
import "./Slider.scss";
import { Swiper } from "swiper/react";
import CreateSwiperConfig from "../../modules/SwiperConfig";
import type { SwiperOptions } from "swiper/types";
import type React from "react";

interface SliderProps {
  className?: string;
  swiperConfig: SwiperOptions & { onSwiper?: any; thumbs?: any };
  children: React.ReactNode;
}

const Slider = (props: SliderProps) => {
  const { className, children, swiperConfig } = props;
  const { onSwiper, thumbs, ...restConfig } = swiperConfig;

  const config: SwiperOptions = CreateSwiperConfig({
    ...(restConfig as any),
  });

  return (
    <div className={classNames("swiper", className)}>
      <Swiper {...config} onSwiper={onSwiper} thumbs={thumbs}>
        {children}
      </Swiper>
    </div>
  );
};

export default Slider;
