import classNames from "classnames"
import "./Bage.scss"
import Icon from "../Icon"


interface BageProps {
    iconName: string,
    className: string,
    info: string | undefined
}

const Bage = (props:BageProps) => {

    const {
        className,
        iconName,
        info,
    } = props

    return (
        <div className={classNames("bage", className)}>
            <div className="bage-icon-wrapper">
                <Icon name={iconName} className="bage-icon" userSelect= {false}/>
            </div>
            <span className="bage-info">{info}</span>
        </div>
    )
}

export default Bage