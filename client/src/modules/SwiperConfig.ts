import type { SwiperModule, SwiperOptions } from "swiper/types";

interface Props {
  modules?: SwiperModule[] | undefined;
  paginationEl?: string | boolean;
  navigationPrev?: string;
  navigationNext?: string;
  spaceBetween?: number;
  slidesPerView: number | "auto";
  slidesPerGroup: number;
  centeredSlides?: boolean;
  loop?: boolean;
  autoPlay?: any;
  virtual?: any;
  speed?: number;
  allowTouchMove?: boolean;
  breakpoints?: any;
  observer?: boolean;
  observeParents?: boolean;
  observeSlideChildren?: boolean;
  paginationType?: "bullets" | "fraction" | "custom";
  onSwiper?: any;
  freeMode?: boolean;
  watchSlidesProgress?: boolean;
  thumbs?: any;
}

function CreateSwiperConfig({
  modules,
  paginationEl,
  navigationPrev,
  navigationNext,
  spaceBetween = 20,
  slidesPerView = 3,
  slidesPerGroup = 1,
  centeredSlides = true,
  loop,
  autoPlay,
  virtual,
  speed,
  allowTouchMove,
  breakpoints,
  observer,
  observeParents,
  observeSlideChildren,
  paginationType,
  onSwiper,
  freeMode,
  watchSlidesProgress,
  thumbs,
}: Props) {
  const config: SwiperOptions & { onSwiper?: any } = {
    direction: "horizontal",
    loop: loop ?? false,
    autoplay: autoPlay,
    virtual: virtual,
    speed: speed,
    observer: observer,
    observeParents: observeParents,
    observeSlideChildren: observeSlideChildren,
    modules: modules ?? undefined,
    breakpoints: breakpoints,
    centeredSlides: centeredSlides,
    spaceBetween: spaceBetween,
    slidesPerView: slidesPerView,
    slidesPerGroup: slidesPerGroup,
    allowTouchMove: allowTouchMove,
    freeMode: freeMode,
    watchSlidesProgress: watchSlidesProgress,
    thumbs: thumbs,
    onSwiper: onSwiper,
  };

  if (paginationEl && typeof paginationEl === "string") {
    if (paginationType === "custom") {
      config.pagination = {
        el: paginationEl,
        type: "custom",
        renderCustom: (_swiper, current, total) => {
          const formattedCurrent = String(current).padStart(2, "0");
          const formattedTotal = String(total).padStart(2, "0");
          return `<span class="swiper-custom-pagination">
    <span class="swiper-custom-pagination-current" > ${formattedCurrent} </span>
     <span class="swiper-custom-pagination-total" > of ${formattedTotal}</span>
</span>`;
        },
      };
    } else {
      config.pagination = {
        el: paginationEl,
        type: paginationType,
      };
    }
  } else if (typeof paginationEl === "boolean" && paginationEl) {
    config.pagination = true;
  }

  if (navigationPrev && navigationNext) {
    config.navigation = {
      nextEl: navigationNext,
      prevEl: navigationPrev,
    };
  }

  return config;
}

export default CreateSwiperConfig;
