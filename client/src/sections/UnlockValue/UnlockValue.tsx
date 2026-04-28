import Section from "@/layouts/Section";
import "./UnlockValue.scss";
import ValueCard from "@/components/ValueCard";
import UnlockCardLarge from "@/components/UnlockCardLarge";

const UnlockValue = () => {
  const valuesCardsfirst = [
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
  const valuesCardsSecond = [
    {
      title: "Tenant Harmony",
      description:
        "Our Tenant Management services ensure that your tenants have a smooth and reducing vacancies.",
      iconName: "tenant",
    },
    {
      title: "Maintenance Ease",
      description:
        "Say goodbye to property maintenance headaches. We handle all aspects of property upkeep.",
      iconName: "maintenance",
    },
    {
      title: "Financial Peace of Mind",
      description:
        "Managing property finances can be complex. Our financial experts take care of rent collection",
      iconName: "financial",
    },
    {
      title: "Legal Guardian",
      description:
        "Stay compliant with property laws and regulations effortlessly.",
      iconName: "light",
    },
  ] as const;
  return (
    <>
      <Section
        className="unlock-value"
        title="Unlock Property Value"
        description="Selling your property should be a rewarding experience, and at Estatein, we make sure it is. Our Property Selling Service is designed to maximize the value of your property, ensuring you get the best deal possible. Explore the categories below to see how we can help you at every step of your selling journey"
        hasSlider={false}
        hasButton={false}
        dataJsSection="data-js-valuation-mastery"
      >
        <div className="unlock-value__cards">
          {valuesCardsfirst.map((card) => (
            <ValueCard key={card.title} {...card} />
          ))}
          <UnlockCardLarge
            title="Unlock the Value of Your Property Today"
            description="Ready to unlock the true value of your property? Explore our Property Selling Service categories and let us help you achieve the best deal possible for your valuable asset."
            inGrid
          />
        </div>
      </Section>
      <Section
        className="unlock-value property managment"
        title="Effortless Property Management"
        description="Owning a property should be a pleasure, not a hassle. Estatein's Property Management Service takes the stress out of property ownership, offering comprehensive solutions tailored to your needs. Explore the categories below to see how we can make property management effortless for you"
        hasSlider={false}
        hasButton={false}
        dataJsSection="data-js-property-management"
      >
        <div className="unlock-value__cards property managment__cards">
          {valuesCardsSecond.map((card) => (
            <ValueCard key={card.title} {...card} />
          ))}
          <UnlockCardLarge
            title="Experience Effortless Property Management"
            description="Ready to experience hassle-free property management? Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership."
            inGrid
          />
        </div>
      </Section>
    </>
  );
};

export default UnlockValue;
