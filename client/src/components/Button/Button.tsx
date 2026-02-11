import classNames from "classnames"
import "./Button.scss"
import { Link  } from "react-router-dom"
import Icon from "@/components/Icon"

type TYPE = "submit" | "button" | "link"

interface ButtonProps {
    className: string,
    href?: string,
    type?: TYPE,
    title: string,
    label?: string,
    hasIconBefore?: boolean,
    hasOnlyIcon?: boolean,
    iconName?:string,
    IconAndBorder?: boolean,
    mode?: "purple" | "text-only",
    linkButton?: boolean,
    onClick?: (num?:boolean) => void,
}


const Button  = (props:ButtonProps) => {
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
        onClick,
    } = props

    const Component: any = href != undefined ? Link : "button" 
    const isLink = Boolean(href);

    let CurrentProps: object = isLink ?  {to:href} : {type:type, onClick:onClick}
    const NameClass:string = (isLink &&  (!linkButton)) ? "button-link" : "button"

    return (
        <Component className={classNames(NameClass, className, 
        {"button--onlyIcon" : hasOnlyIcon}, 
        {"button--onlyIcon-bordered" : IconAndBorder},
        {[`button--${mode}`] : mode}
        )} 
        {...CurrentProps} aria-labelledby={title}>
            {hasIconBefore && iconName != "" && (
                <Icon name={iconName}/>
            )} 
            {!hasOnlyIcon && (
                <span className={`${NameClass}-label`}>{label}</span>
            )}
            {!hasIconBefore && iconName != "" && (
                <Icon name={iconName}/>
            )} 
        </Component>
    )
}

export default Button