import "./WorksCard.scss"

interface WorksCardProps {
    index: number,
    label: string,
    description: string,
}

const WorksCard = (props: WorksCardProps) => {

    const { index,
        label,
        description,
    } = props

    return (
        <div className="works-card">
            <div className="works-card__number">
                <span>{`Step 0${index + 1}`}</span>
            </div>
            <div className="works-card__main">
                <span className="works-card__main-label">{label}</span>
                <p className="works-card__main-description description">
                    {description}
                </p>
            </div>
        </div>
    )
}

export default WorksCard