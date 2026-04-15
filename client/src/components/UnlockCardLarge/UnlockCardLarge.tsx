import { Link } from "react-router-dom";
import Button from "../Button";
import "./UnlockCardLarge.scss";
import classNames from "classnames";

interface UnlockCardLargeProps {
  title: string;
  description: string;
  inGrid?: boolean;
  mode?: "compact";
}

const UnlockCardLarge = ({
  title,
  description,
  inGrid,
  mode,
}: UnlockCardLargeProps) => {
  const isCompact = mode === "compact";

  const button = (
    <Link to="/properties" className="unlock-card-large__title-button-wrapper">
      <Button
        className={classNames("unlock-card-large__title-button", {
          "is-compact": isCompact,
        })}
        title="Learn More"
        label="Learn More"
        mode="black"
      />
    </Link>
  );

  return (
    <div
      className={classNames(
        "unlock-card-large",
        { "in-grid": inGrid },
        { [`unlock-card-large--${mode}`]: mode },
      )}
    >
      <div className="unlock-card-large__title">
        <h3 className="unlock-card-large__title-label">{title}</h3>
        {!isCompact && button}
      </div>
      <p
        className={classNames("unlock-card-large__title-description", {
          description: !mode,
        })}
      >
        {description}
      </p>
      {isCompact && button}
    </div>
  );
};

export default UnlockCardLarge;
