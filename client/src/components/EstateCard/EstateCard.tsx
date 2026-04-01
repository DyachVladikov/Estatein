import { useEffect, useState, memo } from "react";
import Bage from "../Bage";
import Button from "../Button";
import "./EstateCard.scss";
import getCurrentPrice from "@/utils/getCurrentPrice";
import getSplitedText from "@/utils/getSplitedText";
import type { Estate } from "@/interfaces/interfaces";
import { Link } from "react-router-dom";

interface EstateProps {
  estate: Estate;
  NeedCounterRooms?: boolean;
  NeedAnotation?: boolean;
}

const EstateCard = ({
  estate,
  NeedCounterRooms = true,
  NeedAnotation = false,
}: EstateProps) => {
  const [curentStringPrice, setCurentStringPrice] = useState<string>();
  const [isreadMoreActivated, setIsreadMoreActivated] =
    useState<boolean>(false);
  const [readMoreText, setReadMoreText] = useState<string>();

  useEffect(() => {
    setCurentStringPrice(getCurrentPrice(estate?.price));
    setReadMoreText(getSplitedText(estate?.description, 10));
  }, []);

  const onReadMoreClick = () => {
    setIsreadMoreActivated((prev) => !prev);
  };

  return (
    <div className="estate-card">
      <Link to={`/properties/${estate._id}`} className="">
        <img
          className="estate-card-image"
          src={estate?.images?.[0] ?? "/src/assets/images/loadingGif.gif"}
        />
      </Link>

      <div className="estate-card__info">
        {NeedAnotation && (
          <div className="estate-card__info-annotation">
            <span>{estate.annotation}</span>
          </div>
        )}
        <Link to={`/properties/${estate._id}`} className="">
          <h3 className="estate-card__info-name h5">{estate?.name}</h3>
        </Link>
        <div className="estate-card__info-description">
          <p className="estate-card__info-description-text description">
            {!isreadMoreActivated && <>{readMoreText}</>}
            {isreadMoreActivated && <>{estate?.description}</>}
            <Button
              className="estate-card__info-description-read-more"
              title={isreadMoreActivated ? " Close" : " Read More"}
              label={isreadMoreActivated ? " Close" : " Read More"}
              onClick={onReadMoreClick}
            />
          </p>
        </div>
        {NeedCounterRooms && (
          <div className="estate-card__info-bages">
            <Bage
              className="estate-card__info-bages--badroom"
              iconName="bad"
              info={`${estate?.bedroomsCount}-Bedroom`}
            />
            <Bage
              className="estate-card__info-bages--bathroom"
              iconName="bathroom"
              info={`${estate?.bathroomsCount}-Bathroom`}
            />
            <Bage
              className="estate-card__info-bages--estate"
              iconName="estate-small"
              info={estate?.type}
            />
          </div>
        )}

        <div className="estate-card__info-price-button">
          <div className="estate-card__info-price">
            <span className="description">Price</span>
            <span>${curentStringPrice}</span>
          </div>
          <Button
            className="estate-card__info-property-button"
            title="View Property Details"
            label="View Property Details"
            mode="purple"
            href={`/properties/${estate._id}`}
            linkButton
          />
        </div>
      </div>
    </div>
  );
};

export default memo(EstateCard);
