import ServiceBanner from "@/sections/ServiceBanner";
import "./Service.scss";
import UnlockValue from "@/sections/UnlockValue";
import Investments from "@/sections/Investments";

const Service = () => {
  const actionsForServiceBanner = [
    {
      iconName: "home",
      label: "Find Your Dream Home",
      href: "/properties",
    },
    {
      iconName: "camera",
      label: "Unlock Property Value",
      href: "/properties",
    },
    {
      iconName: "buildings",
      label: "Effortless Property Management",
      href: "/properties",
    },
    {
      iconName: "light",
      label: "Smart Investments, Informed Decisions",
      href: "/properties",
    },
  ];
  return (
    <>
      <ServiceBanner
        actions={actionsForServiceBanner}
        title="Elevate Your Real Estate Experience"
        description="Welcome to Estatein, where your real estate aspirations meet expert
          guidance. Explore our comprehensive range of services, each designed
          to cater to your unique needs and dreams."
      />
      <UnlockValue />
      <Investments />
    </>
  );
};

export default Service;
