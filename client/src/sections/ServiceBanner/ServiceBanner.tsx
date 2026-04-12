import BlockLink from "@/components/BlockLink";
import "./ServiceBanner.scss";

const ServiceBanner = () => {
  const actions = [
    {
      iconName: "home",
      label: "Find Your Dream Home",
    },
    {
      iconName: "camera",
      label: "Unlock Property Value",
    },
    {
      iconName: "buildings",
      label: "Effortless Property Management",
    },
    {
      iconName: "light",
      label: "Smart Investments, Informed Decisions",
    },
  ] as const;
  return (
    <section className="service-banner">
      <div className="service-banner__wrapper">
        <h1 className="service-banner__wrapper-title h2">
          Elevate Your Real Estate Experience
        </h1>
        <p className="service-banner__wrapper-description description">
          Welcome to Estatein, where your real estate aspirations meet expert
          guidance. Explore our comprehensive range of services, each designed
          to cater to your unique needs and dreams.
        </p>
      </div>
      <div className="service-banner__actions dream__actions-wrapper">
        <div className="dream__actions">
          <ul className="dream__actions-list">
            {actions.map((action, index) => (
              <li
                className="dream__actions-item"
                key={`link-to-properties-${index}`}
              >
                <BlockLink {...action} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;
