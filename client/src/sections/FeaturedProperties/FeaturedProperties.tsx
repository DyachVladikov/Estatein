import Section from "@/layouts/Section"
import "./FeaturedProperties.scss"
import EstateCard from "@/components/EstateCard"
import { SwiperSlide } from "swiper/react"
import {Navigation, Pagination} from "swiper/modules"
import Slider from "@/components/Slider/Slider"

import type { Estate } from "@/interfaces/interfaces";
import useApi from "@/hooks/useApi"


const FeaturedProperties = () => {
    const {data, loading, error} = useApi<Estate[]>("estates")

    const swiperConfig = {
        modules: [Navigation, Pagination],
        slidesPerGroup: 3,
        slidesPerView: 3,
        navigationNext:".featured-properties-slider__actions-navigation-next",
        navigationPrev:".featured-properties-slider__actions-navigation-prev",
        paginationEl: ".featured-properties-slider__actions-pagination",
        centeredSlides: false,
        paginationType: "custom",
        spaceBetween: 30,
        breakpoints : {
            1: {
                spaceBetween: 0,
                slidesPerGroup: 1,
                slidesPerView: 1,
                centeredSlides: true,
            },
            768: {
                spaceBetween: 0,
                slidesPerGroup: 2,
                slidesPerView: 2,
                centeredSlides: false,
            },
            1280: {
                spaceBetween: 20,
                slidesPerGroup: 2,
                slidesPerView: 2,
            },
            1441: {
                spaceBetween: 30,
                slidesPerGroup: 3,
                slidesPerView: 3,
            },
        }
    }

    if(loading)
    {
        return (
            <span>Loading...</span>
        )
    }
    

    return (
        
        <Section className="featured-properties" title = "Featured Properties" 
        description ="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click View Details for more information."
        hasButton = {true} ButtonText="View All Properties" hasSlider dataJsSection="features"
        >
            {error.HasError && (
                <div className="section-error">
                    <span>{error.message || "=("}</span>
                </div>
            )} 
            <div className="featured-properties-wrapper">
                <Slider className="featured-properties-slider" swiperConfig={swiperConfig}>
                    {data?.slice(0, data.length).map(estate => (
                        <SwiperSlide key={estate._id}>
                            <EstateCard  estate={estate} />
                        </SwiperSlide>
                    ))}
                    {!data && (<></>)}
                </Slider>
            </div>
        </Section>
    )
}

export default FeaturedProperties