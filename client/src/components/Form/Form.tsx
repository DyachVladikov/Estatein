import Input from "../Input";
import Select from "../Select";
import "./Form.scss";
import classNames from "classnames";
import Icon from "../Icon";
import Button from "../Button";
import useApi from "@/hooks/useApi";
import { Link } from "react-router-dom";
import type { SelectProps } from "../Select/Select";
import { useFormState } from "./useFormState";
import DoubleInput from "./DoubleInput";

export interface FormProps {
  id: string;
  elements: ElementsCfg[];
  mode?: "main" | "estate" | "connect";
  blockValue?: string;
}

export type ElementsCfg = FormElement | SelectEl;

interface FormElement {
  type: "input" | "checkbox" | "block";
  title: string;
  placeholder: string;
  iconName?: string;
  name: keyof import("./useFormState").FormValues;
  doubleInput?: boolean;
  required?: boolean;
  mask?: string | RegExp;
}

interface SelectEl {
  type: "select";
  title: string;
  placeholder: string;
  iconName?: string;
  modification?: "Large";
  name: keyof import("./useFormState").FormValues;
  options: string[];
  required?: boolean;
  mode?: SelectProps["mode"];
  arrowIcon?: boolean;
}

const Form = ({ id, elements, mode, blockValue }: FormProps) => {
  const {
    values,
    formErrors,
    setFormErrors,
    privacyChecked,
    handleChange,
    clearError,
    getSubmitErrors,
    togglePrivacy,
  } = useFormState(elements);

  const { sendData, resData, sendError } = useApi<{ message: string; ok: number }>("orders");

  const isSubmitted = resData?.ok === 200;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = getSubmitErrors();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0 && !isSubmitted) {
      sendData(values);
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <fieldset disabled={isSubmitted} style={{ padding: 0 }}>
        <div
          className={classNames(
            "form",
            { "successfully-sent": isSubmitted },
            { [`form--${mode}`]: mode },
          )}
        >
          {elements.map((element, index) => {
            const key = `${element.title}-${index}`;

            if (element.type === "input" && !element.doubleInput)
              return (
                <Input
                  className="input--estate"
                  id={key}
                  key={key}
                  {...element}
                  type="text"
                  error={formErrors[element.name]}
                  onChange={(val) => {
                    handleChange(element.name, val);
                    clearError(element.name);
                  }}
                  value={values[element.name] || ""}
                />
              );

            if (element.type === "block")
              return (
                <div
                  key={key}
                  className="form-block"
                  style={{ display: "flex", flexDirection: "column", rowGap: "16px", gridColumn: "-1/1" }}
                >
                  <span>Selected Property</span>
                  <div className="input-wrapper" style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{blockValue}</span>
                    <Icon width="24px" height="24px" userSelect={false} name={element.iconName ?? ""} />
                  </div>
                </div>
              );

            if (element.type === "select")
              return (
                <div
                  className={classNames("form-select", { "form-select--large": element.modification === "Large" })}
                  key={key}
                >
                  <h3 className="select-title h6">{element.title}</h3>
                  <Select
                    className="form-mode"
                    iconName=""
                    items={{ type: "strings", items: element.options }}
                    {...element}
                    onChange={(val, name) => handleChange(name, val)}
                  />
                </div>
              );

            if (element.doubleInput)
              return (
                <DoubleInput
                  key={key}
                  title={element.title}
                  onPhoneChange={(val) => handleChange("AdditionalPhone", val)}
                  onEmailChange={(val) => handleChange("AdditionalEmail", val)}
                />
              );
          })}
          <div className="form-textarea">
            <label htmlFor="user-message" className="h6">Message</label>
            <div className="form-textarea-wrapper">
              <textarea
                className={classNames({ [`form-textarea--${mode}`]: mode })}
                placeholder="Enter your Message here.."
                id="user-message"
                onChange={(e) => handleChange("Message", e.currentTarget.value)}
              />
            </div>
          </div>
          <div className="form-send">
            <div className="form-send__privacy">
              <input
                id="form-checkbox"
                className={classNames("form-send__privacy-checkbox", {
                  "is-checked": privacyChecked,
                  "is-unchecked": formErrors.Privacy?.hasError,
                })}
                type="checkbox"
                onClick={togglePrivacy}
              />
              <label className="form-send__privacy-label description" htmlFor="form-checkbox">
                <span>I agree with </span>
                <Link to="/"><u>Terms of Use</u></Link>
                <span> and </span>
                <Link to="/"><u>Privacy Policy</u></Link>
              </label>
            </div>
            <Button
              className={classNames("form-send-button", { deactivated: isSubmitted })}
              title="Send Your Message"
              label="Send Your Message"
              mode="purple"
              type="submit"
            />
          </div>
        </div>
      </fieldset>
      {isSubmitted && <div className="form-suc-message">{resData.message}</div>}
      {sendError && (
        <div className="form-error-message">
          Something went wrong. Please try again later.
        </div>
      )}
    </form>
  );
};

export default Form;
