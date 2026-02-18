import "./Journey.scss"
import Statistic from "@/components/Statistic"

const Journey = () => {

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

    return (
        <section className="journey container">
            <div className="journey__info">
                <img className="section-stars" src="/src/assets/icons/stars.svg" />
                <div className="journey__info-label">
                    <h1 className="h2">Our Journey</h1>
                </div>
                <div className="journey__info-description description">
                    <p>Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform 
                        that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients.
                    </p>
                </div>
                <div className="journey__info-blocks">
                    <ul className="journey__info-statistic-list">
                        {statistic.map((item, index) => (
                            <li className="journey__info-statistic-item" key={`statistic-${index}`}>
                                <Statistic {...item}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="journey-images">
                <img className="journey-img" src="/src/assets/images/AboutUsPage/house.png" />
                <img className="journey-img--bg" src="/src/assets/images/AboutUsPage/houseBG.png" />
            </div>
            
        </section>
    )
}

export default Journey