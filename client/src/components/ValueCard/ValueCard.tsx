import classNames from "classnames";
import Icon from "../Icon";
import "./ValueCard.scss";

interface ValueCardProps {
  title: string;
  description: string;
  iconName: string;
  mode?: "dark";
}

const ValueCard = (props: ValueCardProps) => {
  const { title, description, iconName, mode } = props;
  return (
    <div
      className={classNames("value-card", { [`value-card--${mode}`]: mode })}
    >
      <div className="value-card__title">
        <div className="value-card__title-icon block-link__wrapper-icon">
          <Icon
            className="value-card-icon"
            name={iconName}
            userSelect={false}
            width="34px"
            height="34px"
            color="var(--color-purple-75)"
          />
        </div>
        <h3 className="value-card__title-label h5">{title}</h3>
      </div>
      <p className="value-card-description description">{description}</p>
    </div>
  );
};

export default ValueCard;
