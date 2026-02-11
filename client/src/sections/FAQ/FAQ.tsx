import Slider from "@/components/Slider/Slider"
import "./FAQ.scss"

import Section from "@/layouts/Section"

import { useEffect, useState } from "react"

import { Navigation, Pagination } from "swiper/modules"
import { SwiperSlide } from "swiper/react"

import type { FAQ as FAQTYPE } from "@/interfaces/interfaces"
import FAQCard from "@/components/FAQCard"


const FAQ = () => {

    const [hasError, SetHasError] = useState<boolean>(false)
    const [FAQs, SetFAQs] = useState<FAQTYPE[]>([])


    useEffect(() => {
            fetch("http://localhost:3002/api/faqs").then(response => {

                if(!response.ok)
                {
                    SetHasError(true)
                    throw new Error
                    
                }
                else {
                    return response.json()
                }
            }).then(data => { 
                SetFAQs(data)
            })  
    }, []) 

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

    return (
        <Section className="faq" title = "Frequently Asked Questions" 
        description ="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
        hasButton = {true} ButtonText="View All FAQ’s" hasSlider dataJsSection="faqs"
        >
             {hasError && (
                <div className="section-error">
                    <span>Something went wrong</span>
                </div>
            )} 
            <div className="testimonials-wrapper">
                 <Slider className="testimonials-slider" swiperConfig={swiperConfig}>
                    {FAQs.map((faq) => (
                        <SwiperSlide key={faq._id}>
                            <FAQCard {...faq} />
                        </SwiperSlide>
                    ))}
                </Slider>  
                
            </div>
        </Section>
    )
}

export default FAQ