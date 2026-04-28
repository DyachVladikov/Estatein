import { RefObject } from "react";
import "./PropertyBanner.scss";
import useTypewriter from "@/hooks/useTypewriter";

const TEXT = "Welcome to Estatein, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey";

const PropertyBanner = () => {
  const { displayed, isDone, ref } = useTypewriter(TEXT);
  return (
    <section className="property-banner" data-js-section={"data-js-properties"}>
      <h1 className="property-banner-title h2"> Find Your Dream Property</h1>
      <p ref={ref as RefObject<HTMLParagraphElement>} className={`property-banner-description description${isDone ? " section-description--done" : ""}`}>
        {displayed}
      </p>
    </section>
  );
};

export default PropertyBanner;
