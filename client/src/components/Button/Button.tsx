import classNames from "classnames";
import "./Button.scss";
import { Link } from "react-router-dom";
import Icon from "@/components/Icon";
import { memo } from "react";

interface IconProp {
  width?: string;
  height?: string;
  color?: string;
  strokeFill?: boolean;
}

interface BaseProps {
  className: string;
  title: string;
  label?: string;
  hasIconBefore?: boolean;
  hasOnlyIcon?: boolean;
  iconName?: string;
  IconAndBorder?: boolean;
  mode?: "purple" | "text-only" | "black";
  iconProps?: IconProp;
}

type ButtonProps =
  | (BaseProps & { href: string; linkButton?: boolean; type?: never; onClick?: never })
  | (BaseProps & { href?: never; linkButton?: never; type?: "submit" | "button"; onClick?: () => void });

const Button = (props: ButtonProps) => {
  const {
    className,
    label,
    title,
    hasIconBefore = false,
    hasOnlyIcon = false,
    IconAndBorder = false,
    iconName = "",
    mode,
    iconProps,
  } = props;

  const content = (
    <>
      {hasIconBefore && iconName !== "" && <Icon name={iconName} userSelect={false} />}
      {!hasOnlyIcon && <span className={`${props.href && !props.linkButton ? "button-link" : "button"}-label`}>{label}</span>}
      {!hasIconBefore && iconName !== "" && <Icon name={iconName} {...iconProps} />}
    </>
  );

  const sharedClass = classNames(
    props.href && !props.linkButton ? "button-link" : "button",
    className,
    { "button--onlyIcon": hasOnlyIcon },
    { "button--onlyIcon-bordered": IconAndBorder },
    { "button--icon-before": hasIconBefore },
    { [`button--${mode}`]: mode },
  );

  if (props.href) {
    return (
      <Link to={props.href} className={sharedClass} aria-labelledby={title}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      onClick={props.onClick}
      className={sharedClass}
      aria-labelledby={title}
    >
      {content}
    </button>
  );
};

export default memo(Button);
