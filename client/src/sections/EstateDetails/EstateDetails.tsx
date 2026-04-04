import Icon from "@/components/Icon";
import "./EstateDetails.scss";
import useApi from "@/hooks/useApi";
import type { Estate } from "@/interfaces/interfaces";
import getCurrentPrice from "@/utils/getCurrentPrice";
import { useState, useMemo } from "react";
import { SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Slider from "@/components/Slider/Slider";
import Keys from "@/components/Keys";

const NAVIGATION_SELECTORS = {
  NEXT: ".estate-details__pictures-actions-navigation-next",
  PREV: ".estate-details__pictures-actions-navigation-prev",
  PAGINATION: ".estate-details__pictures-actions-pagination",
} as const;

const BASE_SWIPER_CONFIG = {
  centeredSlides: false,
  breakpoints: {
    320: { spaceBetween: 10 },
    768: { spaceBetween: 15 },
    1024: { spaceBetween: 20 },
  },
};

const EstateDetails = ({ id }: { id?: string }) => {
  const { data, loading, error } = useApi<Estate>("properties", id);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const swiperConfigs = useMemo(() => {
    const miniConfig = {
      ...BASE_SWIPER_CONFIG,
      modules: [Pagination, Thumbs, FreeMode],
      slidesPerView: "auto" as const,
      slidesPerGroup: 1,
      spaceBetween: 20,
      freeMode: true,
      watchSlidesProgress: true,
      onSwiper: setThumbsSwiper,
    };

    const mainConfig = {
      ...BASE_SWIPER_CONFIG,
      modules: [Navigation, Thumbs, Pagination],
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 30,
      navigationNext: NAVIGATION_SELECTORS.NEXT,
      navigationPrev: NAVIGATION_SELECTORS.PREV,
      paginationEl: NAVIGATION_SELECTORS.PAGINATION,
      paginationType: "bullets" as const,
      thumbs: {
        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
      },
      breakpoints: {
        320: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 15 },
        767: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 30 },
      },
    };

    return { miniConfig, mainConfig };
  }, [thumbsSwiper]);

  if (loading) {
    return (
      <h3 className="section container" style={{ marginInline: "auto" }}>
        Please Wait...
      </h3>
    );
  }

  if (error?.HasError) {
    return (
      <h3 className="section container" style={{ marginInline: "auto" }}>
        Error: {error.message}
      </h3>
    );
  }
  const hasImages = (data?.images?.length ?? 0) > 0;
  const estateName = data?.name || "Unknown Estate";

  const values = [
    {
      title: "Bedrooms",
      iconName: "bedrooms",
      value: data?.bedroomsCount ?? 0,
    },
    {
      title: "Bathrooms",
      iconName: "bathrooms",
      value: data?.bathroomsCount ?? 0,
    },
    { title: "Area", iconName: "area", value: data?.area ?? 0 },
  ];

  return (
    <section className="estate-details section container">
      <div className="estate-details__title">
        <h1 className="estate-details__title-name">{estateName}</h1>
        <div className="estate-details__title-place">
          <Icon width="24px" height="24px" name="location" />
          <span>{data?.place}</span>
        </div>
        <div className="estate-details__title-price">
          <span className="description">Price</span>
          <span className="estate-details__title-price-number">
            ${getCurrentPrice(data?.price)}
          </span>
        </div>
      </div>

      <div className="estate-details__pictures">
        {!hasImages ? (
          <h3 style={{ marginInline: "auto" }}>No images</h3>
        ) : (
          <>
            <div className="estate-details__pictures-list">
              <Slider
                className="estate-details-slider-mini"
                swiperConfig={swiperConfigs.miniConfig}
              >
                {data?.images.map((src, index) => (
                  <SwiperSlide key={`${data._id}-mini-${index}`}>
                    <img
                      className="estate-details-slider-mini-img"
                      src={src}
                      alt={`${estateName} thumbnail ${index + 1}`}
                    />
                  </SwiperSlide>
                ))}
              </Slider>
            </div>

            <div className="estate-details__pictures-main">
              <Slider
                className="estate-details-slider-main"
                swiperConfig={swiperConfigs.mainConfig}
              >
                {data?.images.map((src, index) => (
                  <SwiperSlide key={`${data._id}-main-${index}`}>
                    <img
                      className="estate-details-slider-main-img"
                      src={src}
                      alt={`${estateName} image ${index + 1}`}
                    />
                  </SwiperSlide>
                ))}
              </Slider>
            </div>

            <div className="estate-details__pictures-controller">
              <div className="estate-details__pictures-actions">
                <div className="estate-details__pictures-actions-navigation-prev">
                  <Icon width="30px" height="30px" name="arrow-right" />
                </div>
                <div className="estate-details__pictures-actions-pagination" />
                <div className="estate-details__pictures-actions-navigation-next">
                  <Icon width="30px" height="30px" name="arrow-right" />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="estate-details__info">
        <div className="estate-details__info-description">
          <h3 className="estate-details__info-desription-title h5">
            Description
          </h3>
          <p className="description">{data?.description}</p>
          <div className="estate-details__info-description-values-list">
            {values.map((element, index) => (
              <div
                className="estate-details__info-description-values-item"
                key={`${element.title}-${index}`}
              >
                <div className="estate-details__info-description-values-name">
                  <Icon
                    width="24px"
                    height="24px"
                    userSelect={false}
                    color="var(--color-gray-60)"
                    name={element.iconName}
                  />
                  <span className="description">{element.title}</span>
                </div>
                <h4 className="h5">
                  {element.value < 10 ? `0${element.value}` : element.value}
                  {element.title === "Area" ? " Square Feet" : ""}
                </h4>
              </div>
            ))}
          </div>
        </div>
        <aside className="estate-details__info-aside">
          <div className="estate-details__info-description estate-details__info-aside">
            <h3 className="estate-details__info-aside-title h5">
              Key Features and Amenities
            </h3>
            <div className="estate-details__info-aside-list">
              {data?.featuresKeys?.map((text, index) => (
                <Keys text={text} key={`key-${index}`} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default EstateDetails;
