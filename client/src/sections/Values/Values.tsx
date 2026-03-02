import Icon from "@/components/Icon"
import "./Values.scss"
import classNames from "classnames"
import { img } from "@/utils/RepairOmgSrc"

const Values = () => {

    const cards = [
        {
            iconName: "trust",
            title: "Trust",
            description: "Trust is the cornerstone of every successful real estate transaction.",
        },
        {
            iconName: "excellence",
            title: "Excellence",
            description: "We set the bar high for ourselves. From the properties we list to the services we provide.",
        },
        {
            iconName: "client-centric",
            title: "Client-Centric",
            description: "Your dreams and needs are at the center of our universe. We listen, understand.",
        },
        {
            iconName: "trust",
            title: "Our Commitment",
            description: "We are dedicated to providing you with the highest level of service, professionalism.",
        },
    ]

    return (
        <section className="values section container">
            <div className="values__info">
                <img className="section-stars" src={img("icons/stars.svg")} />
                <div className="values__info-label">
                    <h2>Our Values</h2>
                </div>
                <div className="values__info-description description">
                    <p>Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform 
                        that transcended the ordinary. 
                    </p>
                </div>
            </div>
            <div className="values__cards">
                {cards.map((card, index) => (
                    <div className={classNames("values__cards-item", {"is-need-border" : index % 2 == 0})} key={`${card.title} + ${index}`}>
                        <div className="values__cards-item-label">
                            <div className="values__cards-item-icon">
                                <Icon name={card.iconName} userSelect={false} color="var(--color-purple-75)"/>
                            </div>
                            <span className="h5">{card.title}</span>
                        </div>
                        <p className="description">{card.description}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Values