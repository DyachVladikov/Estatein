import Section from "@/layouts/Section";
import "./Discover.scss";
import { useContext } from "react";
import { FilteredEstateContext } from "@/context/FilteredEstate";
import Slider from "@/components/Slider/Slider";
import { SwiperSlide } from "swiper/react";
import type { Estate } from "@/interfaces/interfaces";
import useApi from "@/hooks/useApi";
import EstateCard from "@/components/EstateCard";
import { createSectionSwiperConfig } from "@/modules/SwiperConfig";

const swiperConfig = createSectionSwiperConfig("discover");

const Discover = () => {
  const { filteredEstate } = useContext(FilteredEstateContext);
  const { loading, error, data } = useApi<Estate[]>("estates");

  const ViewEstates = filteredEstate.length > 1 ? filteredEstate : data;

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <Section
      className="discover"
      title="Discover a World of Possibilities"
      description="Our portfolio of properties is as diverse as your dreams. Explore the following categories to find the perfect property that resonates with your vision of home"
      hasSlider={true}
      hasButton={false}
    >
      {error.HasError && (
        <div className="section-error">
          <span>{error.message || "=("}</span>
        </div>
      )}
      <div className="discover-wrapper featured-properties-wrapper">
        <Slider
          className=" discover-slider featured-properties-slider"
          swiperConfig={swiperConfig}
        >
          {ViewEstates?.map((estate) => (
            <SwiperSlide key={estate._id}>
              <EstateCard
                NeedCounterRooms={false}
                NeedAnotation
                estate={estate}
              />
            </SwiperSlide>
          ))}
          {!data && <></>}
        </Slider>
      </div>
    </Section>
  );
};

export default Discover;
