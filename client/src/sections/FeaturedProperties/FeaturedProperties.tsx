import Section from "@/layouts/Section"
import "./FeaturedProperties.scss"
import EstateCard from "@/components/EstateCard"
import { SwiperSlide } from "swiper/react"
import {Navigation, Pagination} from "swiper/modules"

import { useEffect, useState} from "react"
import Slider from "@/components/Slider/Slider"

import type { Estate } from "@/interfaces/interfaces";


const FeaturedProperties = () => {

    const [estate, SetEstate] = useState<Estate[]>([])
    const [hasFetched, setHasFetched] = useState(false);
    const [hasError, setHasError] = useState<boolean>(false)

    useEffect(() => {
        if (hasFetched) return; 
        fetch("http://localhost:3002/api/estates").then(response => {

            if(!response.ok)
            {
                setHasError(true)
                throw new Error
                
            }
            else {
                return response.json()
            }
        }).then(data => {
            SetEstate(data)
            setHasFetched(true);
        })  
    }, [])

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

    

    return (
        
        <Section className="featured-properties" title = "Featured Properties" 
        description ="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click View Details for more information."
        hasButton = {true} ButtonText="View All Properties" hasSlider
        >
            {hasError && (
                <div className="section-error">
                    <span>Something went wrong</span>
                </div>
            )}
            <div className="featured-properties-wrapper">
                <Slider className="featured-properties-slider" swiperConfig={swiperConfig}>
                    {estate.slice(0, estate.length).map(estate => (
                        <SwiperSlide key={estate._id}>
                            <EstateCard  estate={estate} />
                        </SwiperSlide>
                    ))}
                </Slider>
            </div>
        </Section>
    )
}

export default FeaturedProperties