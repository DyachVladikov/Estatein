import "./AchievementCard.scss"

interface AchievementCardProps {
    label: string,
    description: string,
}

const AchievementCard = (props:AchievementCardProps) => {

    const {
        label,
        description
    } = props

    return (
        <div className="achievement-card">
            <h4 className="achievement-card-label">
                {label}
            </h4>
            <p className="achievement-card-description description">
                {description}
            </p>
        </div>
    )
}

export default AchievementCard