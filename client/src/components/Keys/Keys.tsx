import Icon from "../Icon";
import "./Keys.scss";

interface KeysProps {
  text: string;
}

const Keys = (props: KeysProps) => {
  const { text } = props;

  return (
    <div className="key">
      <Icon width="24px" height="24px" userSelect={false} name="lightwhite" />
      <p className="description">{text}</p>
    </div>
  );
};

export default Keys;
