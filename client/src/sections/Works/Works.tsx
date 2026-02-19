import Section from "@/layouts/Section"
import "./Works.scss"
import WorksCard from "@/components/WorksCard/WorksCard"

const Works = () => {

    const cards = [
        {
            label: "Discover a World of Possibilities",
            description: "Your journey begins with exploring our carefully curated property listings. Use our intuitive search tools to filter properties based on your preferences, including location, type, size, and budget."
        },
        {
            label: "Narrowing Down Your Choices",
            description: "Once you've found properties that catch your eye, save them to your account or make a shortlist. This allows you to compare and revisit your favorites as you make your decision."
        },
        {
            label: "Personalized Guidance",
            description: "Have questions about a property or need more information? Our dedicated team of real estate experts is just a call or message away."
        },
        {
            label: "See It for Yourself",
            description: "Arrange viewings of the properties you're interested in. We'll coordinate with the property owners and accompany you to ensure you get a firsthand look at your potential new home."
        },
        {
            label: "Making Informed Decisions",
            description: "Before making an offer, our team will assist you with due diligence, including property inspections, legal checks, and market analysis. We want you to be fully informed and confident in your choice."
        },
        {
            label: "Getting the Best Deal",
            description: "We'll help you negotiate the best terms and prepare your offer. Our goal is to secure the property at the right price and on favorable terms."
        },
    ]as const 

    return (
        <Section className="works" title="Navigating the Estatein Experience"
        description="At Estatein, we've designed a straightforward process to help you 
        find and purchase your dream property with ease. Here's a step-by-step guide to how it all works."
        hasButton={false}
        hasSlider={false}
        >
            <div className="works-wrapper">
                {cards.map((card, index) => (
                    <WorksCard index={index} label={card.label} description={card.description} />
                ))}
            </div> 
        </Section>
    )
}

export default Works