import classNames from "classnames";
import "./Button.scss";
import { Link } from "react-router-dom";
import Icon from "@/components/Icon";
import { memo } from "react";

type TYPE = "submit" | "button" | "link";

interface IconProp {
  width?: string;
  height?: string;
  color?: string;
  strokeFill?: boolean;
}

interface ButtonProps {
  className: string;
  href?: string;
  type?: TYPE;
  title: string;
  label?: string;
  hasIconBefore?: boolean;
  hasOnlyIcon?: boolean;
  iconName?: string;
  IconAndBorder?: boolean;
  mode?: "purple" | "text-only" | "black";
  linkButton?: boolean;
  onClick?: (num?: boolean) => void;
  iconProps?: IconProp;
}

const Button = (props: ButtonProps) => {
  const {
    className,
    href,
    type,
    label,
    title,
    hasIconBefore = false,
    hasOnlyIcon = false,
    IconAndBorder = false,
    iconName = "",
    mode,
    linkButton = false,
    iconProps,
    onClick,
  } = props;

  const Component: any = href != undefined ? Link : "button";
  const isLink = Boolean(href);

  let CurrentProps: object = isLink
    ? { to: href }
    : { type: type, onClick: onClick };
  const NameClass: string = isLink && !linkButton ? "button-link" : "button";

  return (
    <Component
      className={classNames(
        NameClass,
        className,
        { "button--onlyIcon": hasOnlyIcon },
        { "button--onlyIcon-bordered": IconAndBorder },
        { "button--icon-before": hasIconBefore },
        { [`button--${mode}`]: mode },
      )}
      {...CurrentProps}
      aria-labelledby={title}
    >
      {hasIconBefore && iconName != "" && <Icon name={iconName} />}
      {!hasOnlyIcon && <span className={`${NameClass}-label`}>{label}</span>}
      {!hasIconBefore && iconName != "" && (
        <Icon name={iconName} {...iconProps} />
      )}
    </Component>
  );
};

export default memo(Button);
