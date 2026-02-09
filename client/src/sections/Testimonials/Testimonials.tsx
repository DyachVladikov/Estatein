import Section from "@/layouts/Section"
import "./Testimonials.scss"
import Slider from "@/components/Slider/Slider"

import { Navigation, Pagination } from "swiper/modules"
import ReviewCard from "@/components/ReviewCard"
import { useEffect, useState } from "react"
import { SwiperSlide } from "swiper/react"
import type { ReviewCardProps } from "@/components/ReviewCard/ReviewCard"

const Testimonials = () => {

    const [reviews, SetReviews] = useState<ReviewCardProps[]>([])
    const [hasError, setHasError] = useState<boolean>(false)

    useEffect(() => {
        fetch("http://localhost:3002/api/reviews").then(response => {

            if(!response.ok)
            {
                setHasError(true)
                throw new Error
                
            }
            else {
                return response.json()
            }
        }).then(data => {
            SetReviews(data) 
        })  
    }, []) 

    const swiperConfig = {
        modules: [Navigation, Pagination],
        slidesPerGroup: 3,
        slidesPerView: 3,
        navigationNext:".testimonials-slider__actions-navigation-next",
        navigationPrev:".testimonials-slider__actions-navigation-prev",
        paginationEl: ".testimonials-slider__actions-pagination",
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
        
        <Section className="testimonials" title = "What Our Clients Say" 
        description ="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."
        hasButton = {true} ButtonText="View All Testimonials" hasSlider
        >
             {hasError && (
                <div className="section-error">
                    <span>Something went wrong</span>
                </div>
            )} 
            <div className="testimonials-wrapper">
                 <Slider className="testimonials-slider" swiperConfig={swiperConfig}>
                    {reviews.map((review) => (
                        <SwiperSlide key={review._id}>
                            <ReviewCard name={review.user.name} 
                            place={review.user.place} 
                            img={review.user.img} 
                            rating={review.rating} 
                            description={review.description}
                            title={review.title}
                            _id={review._id}
                            user={review.user}
                            />
                        </SwiperSlide>
                    ))}
                </Slider>  
                
            </div>
        </Section>
    )
}

export default Testimonials