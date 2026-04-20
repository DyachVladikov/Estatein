import Bage from "../Bage";
import Button from "../Button";
import "./TabCard.scss";

interface TabCardProps {
  type: string;
  title: string;
  description: string;
  badges: Bage[];
}

interface Bage {
  iconName: string;
  info: string;
}

const TabCard = (props: TabCardProps) => {
  const { type, title, description, badges } = props;
  return (
    <div className="tab-card">
      <div className="tab-card__info">
        <span className="tab-card__info-type">{type}</span>
        <h3 className="h5 tab-card__info-title">{title}</h3>
        <p className="tab-card__info-description description">{description}</p>
      </div>
      <ul className="tab-card__badges-list">
        {badges.map((bage, index) => (
          <li className="tab-card__badges-item" key={`${bage}-${index}`}>
            <Bage className="tab-card-bage" {...bage} />
          </li>
        ))}
      </ul>
      <Button
        className="tab-card-button"
        title="Get Direction"
        label="Get Direction"
        mode="purple"
      />
    </div>
  );
};

export default TabCard;
