import { IMaskInput } from "react-imask";
import classNames from "classnames";
import "./Input.scss";

interface InputProps {
  id: string;
  title: string;
  placeholder: string;
  type?: "text" | "checkBox";
  value: string;
  modeI?: "double";
  onChange: (val: string) => void;
  error?: { hasError: boolean; message: string };
  mask?: any;
  className?: string;
}

const Input = (props: InputProps) => {
  const {
    className,
    id,
    title,
    placeholder,
    type = "text",
    value,
    modeI,
    onChange,
    error,
    mask,
  } = props;

  const commonClasses = classNames("input-field", {
    [`input-field--${modeI?.toLowerCase()}`]: modeI,
  });

  return (
    <div
      className={classNames(
        "input",
        {
          [`input--${modeI?.toLowerCase()}`]: modeI,
        },
        className,
      )}
    >
      {modeI !== "double" && (
        <label className="input-title h6" htmlFor={id}>
          {title}
        </label>
      )}

      <div
        className={classNames("input-wrapper", {
          "has-error": error?.hasError,
        })}
      >
        {mask ? (
          <IMaskInput
            className={commonClasses}
            id={id}
            placeholder={placeholder}
            type={type}
            mask={mask}
            value={String(value)}
            unmask={true}
            onAccept={(unmaskedValue) => {
              onChange(unmaskedValue as string);
            }}
          />
        ) : (
          <input
            className={commonClasses}
            id={id}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={(e) => {
              onChange(e.currentTarget.value);
            }}
          />
        )}
      </div>

      {error?.hasError && (
        <span className="input-error-message">{`*${error.message}`}</span>
      )}
    </div>
  );
};

export default Input;
