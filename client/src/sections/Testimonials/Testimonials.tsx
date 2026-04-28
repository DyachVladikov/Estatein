import Section from "@/layouts/Section";
import "./Testimonials.scss";
import Slider from "@/components/Slider/Slider";
import ReviewCard from "@/components/ReviewCard";
import { SwiperSlide } from "swiper/react";
import type { ReviewCardProps } from "@/components/ReviewCard/ReviewCard";
import useApi from "@/hooks/useApi";
import { createSectionSwiperConfig } from "@/modules/SwiperConfig";

const swiperConfig = createSectionSwiperConfig("testimonials");

const Testimonials = () => {
  const { data, loading, error } = useApi<ReviewCardProps[]>("reviews");

  return (
    <Section
      className="testimonials"
      title="What Our Clients Say"
      description="Read the success stories and heartfelt testimonials from our valued clients. Discover why they chose Estatein for their real estate needs."
      hasButton={true}
      ButtonText="View All Testimonials"
      hasSlider
      dataJsSection="testimonials"
      buttonHref="/"
      hasErorrFetching={error.HasError}
      loadingData={loading}
    >
      {error.HasError && (
        <div className="section-error">
          <span>{error.message || "=("}</span>
        </div>
      )}
      <div className="testimonials-wrapper">
        <Slider className="testimonials-slider" swiperConfig={swiperConfig}>
          {data?.map((review) => (
            <SwiperSlide key={review._id}>
              <ReviewCard
                name={review.user.name}
                role={review.user.role}
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
          {!data && <></>}
        </Slider>
      </div>
    </Section>
  );
};

export default Testimonials;
