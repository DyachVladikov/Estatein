import { Link } from "react-router-dom"
import Button from "../Button"
import "./LearnMore.scss"
import { useState } from "react"
import { img } from "@/utils/RepairOmgSrc"

const LearnMore = () => {

    const [isModalOpen, setIsModalOpen] = useState<boolean>(true)

    return (
        <>
            {isModalOpen && (
                <div className="learn-more">
                    <img src={img("backgrounds/bg-abstract1.png")} className="learn-more-bg" />
                    <div className="learn-more__information">
                        <span className="learn-more__information-text">✨Discover Your Dream Property with Estatein</span>
                        <Link to={"/about-us"} className="learn-more__information-link" onClick={() => {
                            setIsModalOpen(false)     
                        }}>
                            <span >Learn More</span>
                        </Link>
                    </div>
                    <Button title="close" hasOnlyIcon className="learn-more-close-button" iconName= "x-mark" onClick={() => {
                        setIsModalOpen(false)     
                    }}/>
                </div>
            )}
        </>
    )
}

export default LearnMore