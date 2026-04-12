import Section from "@/layouts/Section";
import "./UnlockValue.scss";
import ValueCard from "@/components/ValueCard";
import UnlockCardLarge from "@/components/UnlockCardLarge";

const UnlockValue = () => {
  const valuesCards = [
    {
      title: "Valuation Mastery",
      description:
        "Discover the true worth of your property with our expert valuation services.",
      iconName: "mastery",
    },
    {
      title: "Strategic Marketing",
      description:
        "Selling a property requires more than just a listing; it demands a strategic marketing approach.",
      iconName: "marketing",
    },
    {
      title: "Negotiation Wizardry",
      description:
        "Negotiating the best deal is an art, and our negotiation experts are masters of it.",
      iconName: "wizardry",
    },
    {
      title: "Closing Success",
      description:
        "A successful sale is not complete until the closing. We guide you through the intricate closing process.",
      iconName: "closing",
    },
  ] as const;
  return (
    <Section
      className="unlock-value"
      title="Unlock Property Value"
      description="Selling your property should be a rewarding experience, and at Estatein, we make sure it is. Our Property Selling Service is designed to maximize the value of your property, ensuring you get the best deal possible. Explore the categories below to see how we can help you at every step of your selling journey"
      hasSlider={false}
      hasButton={false}
    >
      <div className="unlock-value__cards">
        {valuesCards.map((card) => (
          <ValueCard key={card.title} {...card} />
        ))}
        <UnlockCardLarge
          title="Unlock the Value of Your Property Today"
          description="Ready to unlock the true value of your property? Explore our Property Selling Service categories and let us help you achieve the best deal possible for your valuable asset."
          inGrid
        />
      </div>
    </Section>
  );
};

export default UnlockValue;
