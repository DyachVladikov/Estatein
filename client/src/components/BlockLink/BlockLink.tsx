import { Link } from "react-router-dom"
import Icon from "../Icon"
import "./BlockLink.scss"

interface BlockLinkProps {
    iconName: string,
    label: string,
}

const BlockLink = (props : BlockLinkProps) => {

    const {
        iconName,
        label,
    } = props

    return (
        <Link to={"/properties"} className="">
            <div className="block-link">
                <div className="block-link-arrow">
                    <Icon className="block-link-arrow-icon" name="arrow-right-up" color="var(--color-gray-30)" userSelect = {false}/>
                </div>
                
                <div className="block-link__wrapper-icon">
                    <Icon className="block-link-icon" name={iconName} 
                     userSelect = {false} width="34px" height="34px" color="var(--color-purple-75)"
                     />
                </div>
                <span className="block-link-label">{label}</span>
            </div>
        </Link>
        
    )
}

export default BlockLink