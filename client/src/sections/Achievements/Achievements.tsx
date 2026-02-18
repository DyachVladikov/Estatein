import Section from "@/layouts/Section"
import "./Achievements.scss"
import AchievementCard from "@/components/AchievementCard"

const Achievements = () => {

    const cards = [
        {
            label: "3+ Years of Excellence",
            description: "With over 3 years in the industry, we've amassed a wealth of knowledge and experience, becoming a go-to resource for all things real estate.",
        },
        {
            label: "Happy Clients",
            description: "Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.",
        },
        {
            label: "Industry Recognition",
            description: "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.",
        },
    ] as const

    return (
        <Section className="achievements" title="Our Achievements" description="Our story is one of continuous growth and evolution. We started as a small 
        team with big dreams, determined to create a real estate platform that transcended the ordinary." hasButton={false} hasSlider={false}>
            <div className="achievements-cards">
                {cards.map((card,index) => (
                    <AchievementCard {...card} key={`${card.label} + ${index}`}/>
                ))}
            </div>
            
        </Section> 
    )
}

export default Achievements