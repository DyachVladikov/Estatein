import ServiceBanner from "@/sections/ServiceBanner";
import "./Contact.scss";
import Connect from "@/sections/Connect";
import Locations from "@/sections/Locations";

const Contact = () => {
  const actionsForContacnBanner = [
    {
      iconName: "email",
      label: "info@estatein.com",
      href: "/",
    },
    {
      iconName: "phone",
      label: "+1 (123) 456-7890",
      href: "/",
    },
    {
      iconName: "location",
      label: "Main Headquarters",
      href: "/",
    },
    {
      iconName: "minilogo",
      label: "Instagram LinkedIn Facebook",
      href: "/",
    },
  ];
  return (
    <>
      <ServiceBanner
        title="Get in Touch with Estatein"
        description="Welcome to Estatein's Contact Us page. We're here to assist you with any inquiries, requests, or feedback you may have. Whether you're looking to buy or sell a property, explore investment opportunities, or simply want to connect, we're just a message away. Reach out to us, and let's start a conversation."
        actions={actionsForContacnBanner}
        className="contact-banner"
      ></ServiceBanner>
      <Connect />
      <Locations />
    </>
  );
};

export default Contact;
