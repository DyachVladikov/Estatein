import Button from "../Button"
import Icon from "../Icon"
import "./ClientCard.scss"
import type { ClientCard as ClientCardType } from "@/interfaces/interfaces"

const ClientCard = (props:ClientCardType) => {

    const {
        year,
        title,
        domain,
        category,
        description
    } = props

    return (
        <div className="client-card">
            <div className="client-card__label">
                <div className="client-card__label-wrapper">
                    <span className="client-card__label-date description">{`Since ${year}`}</span>
                    <span className="client-card__label-text">{title}</span>
                </div>
                <Button className="client-card-button" title="Visit Website" label="Visit Website" />
            </div>
            <div className="client-card__info">
                <div className="client-card__info-domain">
                    <div className="client-card__info-domain-wrapper">
                        <div className="client-card__info-domain-icon">
                            <Icon name="domain" color="var(--color-gray-60)" userSelect={false} strokeFill/>
                        </div>
                        <span className="description">Domain</span>
                    </div>
                    <span>{domain}</span>
                </div>
                <div className="client-card__info-category">
                    <div className="client-card__info-category-wrapper">
                        <div className="client-card__info-category-icon">
                            <Icon name="category" color="var(--color-gray-60)" userSelect={false} strokeFill/>
                        </div>
                        
                        <span className="description">Category</span>
                    </div>
                    <span>{category}</span>
                </div>
            </div>
            <div className="client-card__description">
                <span className="client-card__description-label description">What They Said 🤗 </span>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default ClientCard