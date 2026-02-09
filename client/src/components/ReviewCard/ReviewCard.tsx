import Rating from "../Rating"
import "./ReviewCard.scss"

interface User {
    name: string,
    place: string,
    img: string
}
interface Review {
    rating: number,
    description: string,
    title: string,
    _id: string,
    user: User,
}

export type ReviewCardProps = User & Review

const ReviewCard = (props:ReviewCardProps) => {

    const {
        name,
        place,
        img,
        rating,
        description,
        title
    } = props

    return (
        <div className="review-card">
            <Rating count={rating} />
            <div className="review-card__info">
                <h3 className="review-card__info-title h5">{title}</h3>
                <p className="review-card__info-description">{description}</p>
            </div>
            <div className="review-card__author">
                <img className="review-card__author-img" src={img}/>
                <div className="review-card__author-info">
                    <span className="review-card__author-info-name">
                        {name}
                    </span>
                    <span className="review-card__author-info-place description">
                        {place}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ReviewCard