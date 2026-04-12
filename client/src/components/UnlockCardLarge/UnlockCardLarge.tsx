import { Link } from "react-router-dom";
import Button from "../Button";
import "./UnlockCardLarge.scss";
import classNames from "classnames";

const UnlockCardLarge = ({
  title,
  description,
  inGrid,
}: {
  title: string;
  description: string;
  inGrid?: boolean;
}) => {
  return (
    <div className={classNames("unlock-card-large", { "in-grid": inGrid })}>
      <div className="unlock-card-large__title">
        <h3 className="unlock-card-large__title-label">{title}</h3>
        <Link
          to={"/properties"}
          className="unlock-card-large__title-button-wrapper"
        >
          <Button
            className="unlock-card-large__title-button"
            title="Learn More"
            label="Learn More"
            mode="black"
          />
        </Link>
      </div>
      <p className="unlock-card-large__title-description description">
        {description}
      </p>
    </div>
  );
};

export default UnlockCardLarge;
