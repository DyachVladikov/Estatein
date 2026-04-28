import Dream from "@/sections/Dream";
import "./Home.scss";
import FeaturedProperties from "@/sections/FeaturedProperties";
import Testimonials from "@/sections/Testimonials";
import FAQ from "@/sections/FAQ";
import useScrollOnMount from "@/hooks/useScrollOnMount";

const Home = () => {
  useScrollOnMount();

  return (
    <>
      <Dream />
      <FeaturedProperties />
      <Testimonials />
      <FAQ />
    </>
  );
};

export default Home;
