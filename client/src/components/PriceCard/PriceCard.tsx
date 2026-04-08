import type { PriceCard as PriceCardType } from "@/sections/PricingDetails/PricingDetails";
import Button from "../Button";
import "./PriceCard.scss";
import getCurrentPrice from "@/utils/getCurrentPrice";

const PriceCard = (props: PriceCardType) => {
  const { title, rows, total } = props;

  return (
    <div className="price-card">
      <div className="price-card__title">
        <h3 className="price-card__title-name h5">{title}</h3>
        <Button
          className="price-card__title-button"
          title="Learn More"
          label="Learn More"
        />
      </div>
      <div className="price-card__grid">
        {rows.map((item) => (
          <div className="price-card__field">
            <div className="price-card__field-wrapper">
              <span className="price-card__field-label description">
                {item.label}
              </span>
              <div className="price-card__field-cost">
                <span
                  className="price-card__field-cost-amount h5"
                  style={
                    typeof item.amount === "number"
                      ? { fontWeight: 600 }
                      : { fontWeight: 500 }
                  }
                >
                  {typeof item.amount === "number"
                    ? `$${getCurrentPrice(item.amount)}`
                    : item.amount}
                </span>
                <span className="price-card__field-cost-note description">
                  {item?.note}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceCard;
