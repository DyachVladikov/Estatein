import Icon from "../Icon"
import "./Rating.scss"

interface RatingProps {
    count: number,
}

const Rating = (props:RatingProps) => {

    const {
        count
    } = props

    return (
        <div className="rating">
            {Array.from({length: count},  (_,index) => (
                <div className="rating-star" key={`star-${index}`}>
                    <Icon name="star" userSelect={false} color="yellow"/>
                </div>
            ))}
        </div>
    )
}

export default Rating