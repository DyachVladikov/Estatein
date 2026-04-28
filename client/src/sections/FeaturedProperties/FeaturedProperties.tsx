import Section from "@/layouts/Section";
import "./FeaturedProperties.scss";
import EstateCard from "@/components/EstateCard";
import { SwiperSlide } from "swiper/react";
import Slider from "@/components/Slider/Slider";
import { createSectionSwiperConfig } from "@/modules/SwiperConfig";
import type { Estate } from "@/interfaces/interfaces";
import useApi from "@/hooks/useApi";

const swiperConfig = createSectionSwiperConfig("featured-properties");

const FeaturedProperties = () => {
  const { loading, error, data } = useApi<Estate[]>("estates");

  return (
    <Section
      className="featured-properties"
      title="Featured Properties"
      description="Explore our handpicked selection of featured properties. Each listing offers a glimpse into exceptional homes and investments available through Estatein. Click View Details for more information."
      hasButton={true}
      ButtonText="View All Properties"
      hasSlider
      dataJsSection="features"
      hasErorrFetching={error.HasError}
      loadingData={loading}
    >
      {error.HasError && (
        <div className="section-error">
          <span>{"Error"}</span>
        </div>
      )}
      <div className="featured-properties-wrapper">
        <Slider
          className="featured-properties-slider"
          swiperConfig={swiperConfig}
        >
          {data?.slice(0, data.length).map((estate) => (
            <SwiperSlide key={estate._id}>
              <EstateCard estate={estate} />
            </SwiperSlide>
          ))}
          {!data && <></>}
        </Slider>
      </div>
    </Section>
  );
};

export default FeaturedProperties;
