import { useRef, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import "./Form.scss";
import classNames from "classnames";
import Icon from "../Icon";
import Button from "../Button";
import { IMaskInput } from "react-imask";
import useApi from "@/hooks/useApi";
import { Link } from "react-router-dom";
import type { SelectProps } from "../Select/Select";

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
  name: keyof FormValues;
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
  name: keyof FormValues;
  options: string[];
  required?: boolean;
  mode?: SelectProps["mode"];
  arrowIcon?: boolean;
}

interface FormValues {
  AdditionalPhone: string;
  AdditionalEmail: string;
  Bathrooms: string;
  Bedrooms: string;
  Budget: string;
  Email: string;
  FirstName: string;
  LastName: string;
  Location: string;
  Message: string;
  Phone: string;
  Type: string;
  Contact: string;
  Inquiry: string;
  Hear: string;
}

type FormError = { hasError: boolean; message: string };
type FormErrors = Partial<Record<keyof FormValues | "Privacy", FormError>>;

const PATTERNS = {
  EMAIL: /\S+@\S+\.\S+/,
  PHONE: /^\d{11}$/,
} as const;

const INITIAL_VALUES: FormValues = {
  AdditionalPhone: "",
  AdditionalEmail: "",
  Bathrooms: "",
  Bedrooms: "",
  Budget: "",
  Email: "",
  FirstName: "",
  LastName: "",
  Location: "",
  Message: "",
  Phone: "",
  Type: "",
  Contact: "",
  Inquiry: "",
  Hear: "",
};

const validate = (
  elements: ElementsCfg[],
  values: FormValues,
  privacyChecked: boolean,
): FormErrors => {
  const errors: FormErrors = {};

  elements.forEach((el) => {
    const val = values[el.name];
    const isEmpty = !val || val.trim() === "";

    if (el.required && isEmpty) {
      errors[el.name] = { hasError: true, message: "This field is required" };
      return;
    }

    if (!isEmpty) {
      if (
        (el.name === "Email" || el.name === "AdditionalEmail") &&
        !PATTERNS.EMAIL.test(val)
      ) {
        errors[el.name] = {
          hasError: true,
          message: "Please enter a valid email address (e.g. name@mail.com)",
        };
      }
      if (
        (el.name === "Phone" || el.name === "AdditionalPhone") &&
        !PATTERNS.PHONE.test(val)
      ) {
        errors[el.name] = {
          hasError: true,
          message: "Phone number must contain 11 digits",
        };
      }
      if (el.name === "Message" && val.length < 10) {
        errors.Message = {
          hasError: true,
          message: "Message is too short (min 10 characters)",
        };
      }
    }
  });

  if (!privacyChecked) {
    errors.Privacy = {
      hasError: true,
      message: "You must agree to the privacy policy",
    };
  }

  return errors;
};

const Form = ({ id, elements, mode, blockValue }: FormProps) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [activeCheckBox, setActiveCheckBox] = useState("phone-form-input");
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const { sendData, resData } = useApi<{ message: string; ok: number }>(
    "orders",
  );

  const phoneRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  const isSubmitted = resData?.ok === 200;

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const clearError = (name: keyof FormValues | "Privacy") => {
    setFormErrors((prev) => ({
      ...prev,
      [name]: { hasError: false, message: "" },
    }));
  };

  const handleDoubleInput = (e: React.MouseEvent<HTMLDivElement>) => {
    const targetId = (e.target as HTMLElement).id;
    if (targetId !== activeCheckBox) {
      phoneRef.current?.classList.toggle("is-active");
      emailRef.current?.classList.toggle("is-active");
    }
    setActiveCheckBox(targetId);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validate(elements, values, privacyChecked);
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
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "16px",
                    gridColumn: "-1/1",
                  }}
                >
                  <span>Selected Property</span>
                  <div
                    className="input-wrapper"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span>{blockValue}</span>
                    <Icon
                      width="24px"
                      height="24px"
                      userSelect={false}
                      name={element.iconName ?? ""}
                    />
                  </div>
                </div>
              );

            if (element.type === "select")
              return (
                <div
                  className={classNames("form-select", {
                    "form-select--large": element.modification === "Large",
                  })}
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
                <div className="input--double" key={key}>
                  <h3 className="input--double-label h6">{element.title}</h3>
                  <div className="input--double-wrapper">
                    <div
                      className="input--double-phone-wrapper input-wrapper"
                      id="phone-form-input"
                      onClick={handleDoubleInput}
                    >
                      <Icon
                        name="phone"
                        width="24px"
                        height="24px"
                        userSelect={false}
                      />
                      <IMaskInput
                        mask={"+{7} (000) 000-00-00"}
                        type="text"
                        placeholder="Enter Your Number"
                        onChange={(e) =>
                          handleChange("AdditionalPhone", e.currentTarget.value)
                        }
                      />
                      <div
                        className="input--double-phone-checkbox input-checkbox is-active"
                        ref={phoneRef}
                      />
                    </div>
                    <div
                      className="input--double-email-wrapper input-wrapper"
                      id="email-form-input"
                      onClick={handleDoubleInput}
                    >
                      <Icon
                        name="email"
                        width="24px"
                        height="24px"
                        userSelect={false}
                      />
                      <input
                        type="text"
                        placeholder="Enter Your Email"
                        onChange={(e) =>
                          handleChange("AdditionalEmail", e.currentTarget.value)
                        }
                      />
                      <div
                        className="input--double-email-checkbox input-checkbox"
                        ref={emailRef}
                      />
                    </div>
                  </div>
                </div>
              );
          })}
          <div className="form-textarea">
            <label htmlFor="user-message" className="h6">
              Message
            </label>
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
                onClick={() => {
                  setPrivacyChecked((prev) => !prev);
                  clearError("Privacy");
                }}
              />
              <label
                className="form-send__privacy-label description"
                htmlFor="form-checkbox"
              >
                <span>I agree with </span>
                <Link to="/">
                  <u>Terms of Use</u>
                </Link>
                <span> and </span>
                <Link to="/">
                  <u>Privacy Policy</u>
                </Link>
              </label>
            </div>
            <Button
              className={classNames("form-send-button", {
                deactivated: isSubmitted,
              })}
              title="Send Your Message"
              label="Send Your Message"
              mode="purple"
              type="submit"
            />
          </div>
        </div>
      </fieldset>
      {isSubmitted && <div className="form-suc-message">{resData.message}</div>}
    </form>
  );
};

export default Form;
