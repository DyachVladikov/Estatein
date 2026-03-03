import Section from "@/layouts/Section"
import useApi from "@/hooks/useApi"
import type { ClientCard as ClientCardType } from "@/interfaces/interfaces"
import "./ValuedClients.scss"
import Slider from "@/components/Slider/Slider"
import { SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import ClientCard from "@/components/ClientCard"

const ValuedClients = () => {
    const {data: clientsCards, loading, error} = useApi<ClientCardType[]>("clients")

    const swiperConfig = {
        modules: [Navigation, Pagination],
        slidesPerGroup: 3,
        slidesPerView: 3,
        navigationNext:".valued-clients-slider__actions-navigation-next",
        navigationPrev:".valued-clients-slider__actions-navigation-prev",
        paginationEl: ".valued-clients-slider__actions-pagination",
        centeredSlides: false,
        paginationType: "custom",
        spaceBetween: 30,
        breakpoints : {
            1: {
                slidesPerGroup: 1,
                slidesPerView: 1,
            },
            1280: {
                spaceBetween: 40,
                slidesPerGroup: 2,
                slidesPerView: 2,
            },
            1440: {
                spaceBetween: 50,
                slidesPerGroup: 2,
                slidesPerView: 2,
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
        <Section className="valued-clients" 
        title="Our Valued Clients" 
        description="At Estatein, we have had the privilege of working with a diverse range of clients across various industries. Here are so me of the clients we've had the pleasure of serving"
        hasButton={false}
        >
            {error.HasError && (
                <div className="section-error">
                    <span>{error.message || "=("}</span>
                </div>
            )} 
            <Slider className="valued-clients" swiperConfig={swiperConfig}>
                {clientsCards?.map((card) => (
                    <SwiperSlide key={card._id}>
                        <ClientCard {...card}/>
                    </SwiperSlide>
                ))}
                 {!clientsCards && (<></>)}
            </Slider>
        </Section>
    )
}

export default ValuedClients