import "./Section.scss";

import classNames from "classnames";
import "./Section.scss";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { img } from "@/utils/RepairOmgSrc";
import { Link } from "react-router-dom";
import type React from "react";

interface BaseProps {
  className: string;
  children: React.ReactNode;
  title: string;
  description: string;
  hasSlider?: boolean;
  dataJsSection?: string;
  isGrid?: boolean;
  elementInBlock?: React.ReactNode;
}

type SectionProps = BaseProps &
  (
    | {
        hasButton: false;
      }
    | {
        hasButton: true;
        ButtonText: string;
      }
  );

const Section = (props: SectionProps) => {
  const {
    className,
    children,
    hasButton,
    title,
    description,
    hasSlider = true,
    dataJsSection,
    isGrid,
    elementInBlock,
  } = props;

  const ButtonText = "ButtonText" in props ? (props as any).ButtonText : "";

  return (
    <section
      className={classNames("section container", className, {
        "grid-section": isGrid,
      })}
      data-js-section={dataJsSection}
    >
      <div className="section-block">
        <img className="section-stars" src={img("/icons/stars.svg")} />
        <h2 className={`${className}-title `}>{title}</h2>
        <div className={`${className}__events section-events`}>
          <p
            className={`${className}-description description section-description`}
          >
            {description}
          </p>
          {hasButton && (
            <Link to={"/properties"} className="hidden-mobile">
              <Button
                title={ButtonText}
                label={ButtonText}
                className={`${className}-button hidden-mobile button--section`}
              />
            </Link>
          )}
        </div>
        {elementInBlock && (
          <div className="section-element">{elementInBlock}</div>
        )}
      </div>

      <div className={classNames("section-main", className)}>{children}</div>
      {hasSlider && (
        <div
          className={classNames(
            `${className}-slider__actions section-slider__actions`,
            { "isWithout-button": !hasButton },
          )}
        >
          {hasButton && (
            <Link
              to={"/properties"}
              className="visible-mobile"
              style={{ maxWidth: "max-content", marginRight: "auto" }}
            >
              <Button
                title={ButtonText}
                label={ButtonText}
                className={`${className}-button visible-mobile button--section`}
              />
            </Link>
          )}
          <div
            className={`${className}-slider__actions-pagination section-slider__actions-pagination`}
          ></div>
          <div
            className={`${className}-slider__actions-navigation section-slider__actions-navigation hidden-mobile`}
          >
            <div
              className={`${className}-slider__actions-navigation-prev section-slider__actions-navigation-prev`}
            >
              <Icon name="arrow-right" />
            </div>
            <div
              className={`${className}-slider__actions-navigation-next section-slider__actions-navigation-next`}
            >
              <Icon name="arrow-right" />
            </div>
          </div>
          <div
            className={`${className}-slider__actions-navigation-prev section-slider__actions-navigation-prev visible-mobile`}
          >
            <Icon name="arrow-right" />
          </div>
          <div
            className={`${className}-slider__actions-navigation-next section-slider__actions-navigation-next visible-mobile`}
          >
            <Icon name="arrow-right" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Section;
