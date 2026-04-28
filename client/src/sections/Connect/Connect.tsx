import Section from "@/layouts/Section";
import "./Connect.scss";
import Form from "@/components/Form";
import type { ElementsCfg } from "@/components/Form/Form";

const Connect = () => {
  const formElements: ElementsCfg[] = [
    {
      type: "input",
      title: "First Name",
      placeholder: "Enter First Name",
      name: "FirstName",
      required: true,
    },
    {
      type: "input",
      title: "Last Name",
      placeholder: "Enter Last Name",
      name: "LastName",
      required: true,
    },
    {
      type: "input",
      title: "Email",
      placeholder: "Enter your Email",
      name: "Email",
      required: true,
      mask: /^[a-zA-Z0-9@._-]+$/,
    },
    {
      type: "input",
      title: "Phone",
      placeholder: "Enter Phone Number",
      name: "Phone",
      required: true,
      mask: "+{7} (000) 000-00-00",
    },
    {
      type: "select",
      title: "Inquiry Type",
      placeholder: "Select Inquiry Type",
      name: "Inquiry",
      options: [
        "General Inquiry",
        "Property Listing Interest",
        "Schedule a Viewing",
        "Pricing and Offers",
        "Maintenance Request",
      ],
    },
    {
      type: "select",
      title: "How Did You Hear About Us?",
      placeholder: "Select",
      name: "Hear",
      options: [
        "Search Engine (Google, Yandex, etc.)",
        "Social Media",
        "Referral from a Friend or Colleague",
        "Real Estate Portal",
        "Other",
      ],
    },
  ];
  return (
    <Section
      className="connect"
      title="Let's Connect"
      description="We're excited to connect with you and learn more about your real estate goals. Use the form below to get in touch with Estatein. Whether you're a prospective client, partner, or simply curious about our services, we're here to answer your questions and provide the assistance you need."
      hasButton={false}
      hasSlider={false}
      dataJsSection="data-js-contact-form"
    >
      <Form id="connect" elements={formElements} mode="connect" />
    </Section>
  );
};

export default Connect;
