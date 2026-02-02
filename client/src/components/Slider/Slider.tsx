import classNames from "classnames"
import "./Slider.scss"
import { Swiper,  } from 'swiper/react';
import CreateSwiperConfig from "../../modules/SwiperConfig";
import type {  SwiperOptions } from "swiper/types";
import type React from "react";

interface SliderProps {
    className: string,
    swiperConfig: SwiperOptions,
    children: React.ReactNode[]
}

const Slider = (props:SliderProps) => {

    const {
        className,
        children,
        swiperConfig,
    } = props

    const config : SwiperOptions = CreateSwiperConfig(
       {...swiperConfig as any}
    ) 
    
    
    return (
        <div className={classNames("swiper", className)}>
            <Swiper {...config} >
                {children}
            </Swiper>
        </div>
    )
}

export default Slider