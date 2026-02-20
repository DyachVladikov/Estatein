import type { Employee } from "@/interfaces/interfaces"
import Button from "../Button"
import "./EmployeeCard.scss"
import { Link } from "react-router-dom"

const EmployeeCard = (props:Employee) => {

    const { 
        chatLink,
        name,
        employeeInfo,
        _id
    } = props

    return (
        <div className="employee-card">
            <div className="employee-card__img" style={{position: "relative"}} >
                <img className="employee-card__img-author" src={`/src/assets/images/AboutUsPage/Employees/${name}.png`}/>
                <div className="employee-card__img-emblem">
                    <Link to={chatLink as string} className="" style={{position: "relative"}}>
                        <img  src="src/assets/icons/author-emblem.svg"/>
                    </Link>
                </div>
                
            </div>
            
            <div className="employee-card__info">
                <h5 className="employee-card__info-label">{name}</h5>
                <span className="employee-card__info-position description">{employeeInfo.position}</span>
                <div className="employee-card__info-input">
                    <input id={`employee-card-input--${_id}`} placeholder="Say hello" />
                    <Button className="employee-card-sell-button" title="sell" hasOnlyIcon iconName="sell"/>
                </div>
                
            </div>
            
            
        </div>
    )
}

export default EmployeeCard