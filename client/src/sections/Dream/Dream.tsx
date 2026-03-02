import Button from "@/components/Button"
import "./Dream.scss"
import Statistic from "@/components/Statistic"
import BlockLink from "@/components/BlockLink"
import { img } from "@/utils/RepairOmgSrc"

const Dream = () => {

    const statistic = [
        {
            count: 200,
            description: "Happy Customers",
        },
        {
            count: "10k",
            description: "Properties For Clients",
        },
        {
            count: 16,
            description: "Years of Experience",
        },
    ] as const

    const actions = [
        {
            iconName: "home",
            label: "Find Your Dream Home",
        },
        {
            iconName: "camera",
            label: "Unlock Property Value",
        },
        {
            iconName: "buildings",
            label: "Effortless Property Management",
        },
        {
            iconName: "light",
            label: "Smart Investments, Informed Decisions",
        },
    ] as const

    return (
        
        <section className="dream" data-js-section="dream">
            <div className="dream-wrapper container">
                <div className="dream__info">
                    <h1 className="dream__info-label">Discover Your Dream Property with Estatein</h1>
                    <p className="dream__info-description">
                        Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.
                    </p>
                    <div className="dream__info-actions">
                        <Button className="dream__info-actions-lm" title="Learn More" label="Learn More" />
                        <Button className="dream__info-actions-bp" title="Browse Properties" label="Browse Properties" mode="purple"/>
                    </div>
                    <ul className="dream__info-statistic-list">
                        {statistic.map((item, index) => (
                            <li className="dream__info-statistic-item" key={`statistic-${index}`}>
                                <Statistic {...item}/>
                            </li>
                        ))}
                    </ul>
                </div>
                <img className="dream__img" src={img("images/HomePage/build.png")}/>
                <img className="dream__emblem" src ={img("icons/emblem.svg")}/>
            </div>
            <div className="dream__actions-wrapper">
                <div className="dream__actions">
                    <ul className="dream__actions-list">
                        { actions.map((action, index) => (
                            <li className="dream__actions-item" key={`link-to-properties-${index}`}>
                                <BlockLink {...action}/>
                            </li>
                        )) }
                        
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Dream