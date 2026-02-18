import Section from "@/layouts/Section"
import "./FeaturedProperties.scss"
import EstateCard from "@/components/EstateCard"
import { SwiperSlide } from "swiper/react"
import {Navigation, Pagination} from "swiper/modules"

import { useEffect, useState} from "react"
import Slider from "@/components/Slider/Slider"

import type { Estate, Error } from "@/interfaces/interfaces";
import useApi from "@/hooks/useApi"


const FeaturedProperties = () => {

    const [estates, SetEstatess] = useState<Estate[] | null>([])
    const [hasError, setHasError] = useState<Error>({HasError: false, status: 200})
    const [load, setLoading] = useState<boolean>(true)

    const {data, loading, error} = useApi<Estate[]>("estates")

    useEffect(() => {
       SetEstatess(data)
       setHasError({HasError: error.HasError, status:error.status})
       setLoading(loading)
    }, [data, error, loading]) 

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

    if(load)
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
            {hasError.HasError && (
                <div className="section-error">
                    <span>{hasError.message || "=("}</span>
                </div>
            )} 
            <div className="featured-properties-wrapper">
                <Slider className="featured-properties-slider" swiperConfig={swiperConfig}>
                    {estates?.slice(0, estates.length).map(estate => (
                        <SwiperSlide key={estate._id}>
                            <EstateCard  estate={estate} />
                        </SwiperSlide>
                    ))}
                    {!estates && (<></>)}
                </Slider>
            </div>
        </Section>
    )
}

export default FeaturedProperties