import Slider from "@/components/Slider/Slider"
import "./FAQ.scss"

import Section from "@/layouts/Section"

import { useEffect, useState } from "react"

import { Navigation, Pagination } from "swiper/modules"
import { SwiperSlide } from "swiper/react"

import type { FAQ as FAQTYPE, Error } from "@/interfaces/interfaces"
import FAQCard from "@/components/FAQCard"
import useApi from "@/hooks/useApi"


const FAQ = () => {

    const [hasError, setHasError] = useState<Error>({HasError: false, status: 200})
    const [FAQs, SetFAQs] = useState<FAQTYPE[] | null>([])
    const [load, setLoading] = useState<boolean>(true)

    const {data, loading, error} = useApi<FAQTYPE[]>("faqs")

    useEffect(() => {
       SetFAQs(data)
       setHasError({HasError: true, status: 409})
       setLoading(loading)
    }, [data, error, loading])  

    const swiperConfig = {
        modules: [Navigation, Pagination],
        slidesPerGroup: 3,
        slidesPerView: 3,
        navigationNext:".faq-slider__actions-navigation-next",
        navigationPrev:".faq-slider__actions-navigation-prev",
        paginationEl: ".faq-slider__actions-pagination",
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
            <span style={{marginInline: "auto", fontSize: 42}}>Loading...</span>
        )
    }

    return (
        <Section className="faq" title = "Frequently Asked Questions" 
        description ="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
        hasButton = {true} ButtonText="View All FAQ’s" hasSlider dataJsSection="faqs"
        >
             {hasError.HasError && (
                <div className="section-error">
                    <span>{hasError.message || "=("}</span>
                </div>
            )} 
            <div className="testimonials-wrapper">
                 <Slider className="testimonials-slider" swiperConfig={swiperConfig}>
                    {FAQs?.map((faq) => (
                        <SwiperSlide key={faq._id}>
                            <FAQCard {...faq} />
                        </SwiperSlide>
                    ))}
                    {!FAQs && (<></>)}
                </Slider>  
                
            </div>
        </Section>
    )
}

export default FAQ