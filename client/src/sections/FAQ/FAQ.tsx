import Slider from "@/components/Slider/Slider";
import "./FAQ.scss";
import Section from "@/layouts/Section";
import { SwiperSlide } from "swiper/react";
import type { FAQ as FAQTYPE } from "@/interfaces/interfaces";
import FAQCard from "@/components/FAQCard";
import useApi from "@/hooks/useApi";
import { createSectionSwiperConfig } from "@/modules/SwiperConfig";

const swiperConfig = createSectionSwiperConfig("faq");

const FAQ = () => {
  const { data, loading, error } = useApi<FAQTYPE[]>("faqs");

  return (
    <Section
      className="faq"
      title="Frequently Asked Questions"
      description="Find answers to common questions about Estatein's services, property listings, and the real estate process. We're here to provide clarity and assist you every step of the way."
      hasButton={true}
      ButtonText="View All FAQ's"
      hasSlider
      dataJsSection="faqs"
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
          {data?.map((faq) => (
            <SwiperSlide key={faq._id}>
              <FAQCard {...faq} />
            </SwiperSlide>
          ))}
          {!data && <></>}
        </Slider>
      </div>
    </Section>
  );
};

export default FAQ;
