import "./Statistic.scss"

interface StatisticProps {
    count: number | string,
    description: string,
}

const Statistic = (props:StatisticProps) => {

    const {
        count,
        description
    } = props

    return (
        <div className="statistic">
            <span className="statistic-count h3">{`${count}+`}</span>
            <p className="statistic-description description">{description}</p>
        </div>
    )
}

export default Statistic