import Section from "@/layouts/Section"
import "./Discover.scss"
import { useContext, useEffect } from "react"
import { FilteredEstateContext } from "@/context/FilteredEstate"
import Slider from "@/components/Slider/Slider"
import { Navigation, Pagination } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Estate } from "@/interfaces/interfaces"
import useApi from "@/hooks/useApi"
import EstateCard from "@/components/EstateCard"

const Discover = () => {

    const {filteredEstate} = useContext(FilteredEstateContext)

    const {loading, error, data} = useApi<Estate[]>("estates")
    

    const ViewEstates = filteredEstate.length > 1 ? filteredEstate : data

    const swiperConfig = {
        modules: [Navigation, Pagination],
        slidesPerGroup: 3,
        slidesPerView: 3,
        navigationNext:".discover-slider__actions-navigation-next",
        navigationPrev:".discover-slider__actions-navigation-prev",
        paginationEl: ".discover-slider__actions-pagination",
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
        <Section className="discover" title="Discover a World of Possibilities" 
        description="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
        hasSlider={true} hasButton={false}
        >
            {error.HasError && (
                <div className="section-error">
                    <span>{error.message || "=("}</span>
                </div>
            )} 
            <div className="discover-wrapper featured-properties-wrapper">
                <Slider className=" discover-slider featured-properties-slider" swiperConfig={swiperConfig}>
                    {ViewEstates?.map(estate => (
                        <SwiperSlide key={estate._id}>
                            <EstateCard NeedCounterRooms={false} NeedAnotation estate={estate} />
                        </SwiperSlide>
                    ))}
                    {!data && (<></>)}
                </Slider>
            </div>
        </Section>
    )
}

export default Discover