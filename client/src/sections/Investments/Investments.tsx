import Section from "@/layouts/Section";
import "./Investments.scss";
import UnlockCardLarge from "@/components/UnlockCardLarge";
import ValueCard from "@/components/ValueCard";

const Investments = () => {
  const InvestmensCards = [
    {
      title: "Market Insight",
      description:
        "Stay ahead of market trends with our expert Market Analysis. We provide in-depth insights into real estate market conditions",
      iconName: "mastery",
    },
    {
      title: "ROI Assessment",
      description:
        "Make investment decisions with confidence. Our ROI Assessment services evaluate the potential returns on your investments",
      iconName: "fire",
    },
    {
      title: "Customized Strategies",
      description:
        "Every investor is unique, and so are their goals. We develop Customized Investment Strategies tailored to your specific needs",
      iconName: "lamp",
    },
    {
      title: "Diversification Mastery",
      description:
        "Diversify your real estate portfolio effectively. Our experts guide you in spreading your investments across various property types and locations",
      iconName: "light",
    },
  ] as const;
  return (
    <Section
      className="investments"
      title="Smart Investments, Informed Decisions"
      description="Building a real estate portfolio requires a strategic approach. Estatein's Investment Advisory Service empowers you to make smart investments and informed decisions."
      hasButton={false}
      hasSlider={false}
      isGrid
      dataJsSection="data-js-strategic-marketing"
      elementInBlock={
        <UnlockCardLarge
          title="Unlock Your Investment Potential"
          description="Explore our Property Management Service categories and let us handle the complexities while you enjoy the benefits of property ownership."
          mode="compact"
        />
      }
    >
      <div className="investments-main">
        {InvestmensCards.map((card, index) => (
          <ValueCard {...card} mode="dark" key={`${card.title}-${index}`} />
        ))}
      </div>
    </Section>
  );
};

export default Investments;
