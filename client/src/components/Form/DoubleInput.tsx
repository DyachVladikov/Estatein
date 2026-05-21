import { useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import Icon from "../Icon";

interface DoubleInputProps {
  title: string;
  onPhoneChange: (val: string) => void;
  onEmailChange: (val: string) => void;
}

const DoubleInput = ({ title, onPhoneChange, onEmailChange }: DoubleInputProps) => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState("phone-form-input");

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetId = (e.target as HTMLElement).id;
    if (targetId && targetId !== activeId) {
      phoneRef.current?.classList.toggle("is-active");
      emailRef.current?.classList.toggle("is-active");
      setActiveId(targetId);
    }
  };

  return (
    <div className="input--double">
      <h3 className="input--double-label h6">{title}</h3>
      <div className="input--double-wrapper">
        <div
          className="input--double-phone-wrapper input-wrapper"
          id="phone-form-input"
          onClick={handleClick}
        >
          <Icon name="phone" width="24px" height="24px" userSelect={false} />
          <IMaskInput
            mask={"+{7} (000) 000-00-00"}
            type="text"
            placeholder="Enter Your Number"
            onChange={(e) => onPhoneChange(e.currentTarget.value)}
          />
          <div className="input--double-phone-checkbox input-checkbox is-active" ref={phoneRef} />
        </div>
        <div
          className="input--double-email-wrapper input-wrapper"
          id="email-form-input"
          onClick={handleClick}
        >
          <Icon name="email" width="24px" height="24px" userSelect={false} />
          <input
            type="text"
            placeholder="Enter Your Email"
            onChange={(e) => onEmailChange(e.currentTarget.value)}
          />
          <div className="input--double-email-checkbox input-checkbox" ref={emailRef} />
        </div>
      </div>
    </div>
  );
};

export default DoubleInput;
