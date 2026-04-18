import BlockLink from "@/components/BlockLink";
import "./ServiceBanner.scss";
import classNames from "classnames";

interface ServiceBannerProps {
  title: string;
  description: string;
  className?: string;
  actions: Actions[];
}

interface Actions {
  iconName: string;
  label: string;
  href: string;
}

const ServiceBanner = (props: ServiceBannerProps) => {
  const { title, description, actions, className } = props;

  return (
    <section className={classNames("service-banner", className)}>
      <div className="service-banner__wrapper">
        <h1 className="service-banner__wrapper-title h2">{title}</h1>
        <p className="service-banner__wrapper-description description">
          {description}
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
