import Section from "@/layouts/Section";
import "./Locations.scss";
import Tabs from "@/components/Tabs";
import type { HeadersTypes } from "@/components/Tabs/Tabs";
import TabCard from "@/components/TabCard";

const Locations = () => {
  const headers = ["All", "Regional", "International"] as const;
  const tabsCards = [
    {
      id: ["All"] as HeadersTypes[],
      cards: [
        <TabCard
          key="main-headquarters"
          type="Main Headquarters"
          title="123 Estatein Plaza, City Center, Metropolis"
          description="Our main headquarters serve as the heart of Estatein. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us."
          badges={[
            { iconName: "letterFilled", info: "info@restatein.com" },
            { iconName: "phone", info: "+1 (123) 628-7890" },
            { iconName: "location", info: "Metropolis" },
          ]}
        />,
      ],
    },
    {
      id: ["Regional"] as HeadersTypes[],
      cards: [
        <TabCard
          key="regional-offices"
          type="Regional Offices"
          title="456 Urban Avenue, Downtown District, Metropolis"
          description="Estatein's presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets."
          badges={[
            { iconName: "letterFilled", info: "info@restatein.com" },
            { iconName: "phone", info: "+1 (123) 628-7890" },
            { iconName: "location", info: "Metropolis" },
          ]}
        />,
      ],
    },
  ];
  return (
    <Section
      className="locations"
      title="Discover Our Office Locations"
      description="Estatein is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Estatein office nearest to you"
      hasButton={false}
      hasSlider={false}
      dataJsSection="data-js-offices"
    >
      <Tabs cards={tabsCards} headers={headers} />
    </Section>
  );
};

export default Locations;
