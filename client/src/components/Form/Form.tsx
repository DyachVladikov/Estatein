import { useEffect, useRef, useState } from "react";
import Input from "../Input";
import Select from "../Select";
import "./Form.scss";
import classNames from "classnames";
import Icon from "../Icon";
import Button from "../Button";
import { IMaskInput } from "react-imask";
import useApi from "@/hooks/useApi";
import { Link } from "react-router-dom";

export interface FormProps {
  id: string;
  elements: ElementsCfg[];
}

type ElementsCfg = FormElement | SelectEl;

interface FormElement {
  type: "input" | "checkbox";
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
};

const Form = ({ id, elements }: FormProps) => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [activeCheckBox, setActiveCheckBox] = useState("phone-form-input");
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const { sendData, resData } = useApi<{ message: string; ok: number }>("orders");

  const phoneRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resData?.ok === 200) setIsLocked(true);
  }, [resData]);

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const clearError = (name: keyof FormValues | "Privacy") => {
    setFormErrors((prev) => ({ ...prev, [name]: { hasError: false, message: "" } }));
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
    const newErrors: FormErrors = {};

    elements.forEach((el) => {
      const val = values[el.name];
      const isEmpty = !val || val.trim() === "";

      if (el.required && isEmpty) {
        newErrors[el.name] = { hasError: true, message: "This field is required" };
        return;
      }

      if (!isEmpty) {
        if ((el.name === "Email" || el.name === "AdditionalEmail") && !PATTERNS.EMAIL.test(val)) {
          newErrors[el.name] = {
            hasError: true,
            message: "Please enter a valid email address (e.g. name@mail.com)",
          };
        }
        if ((el.name === "Phone" || el.name === "AdditionalPhone") && !PATTERNS.PHONE.test(val)) {
          newErrors[el.name] = { hasError: true, message: "Phone number must contain 11 digits" };
        }
        if (el.name === "Message" && val.length < 10) {
          newErrors.Message = { hasError: true, message: "Message is too short (min 10 characters)" };
        }
      }
    });

    if (!privacyChecked) {
      newErrors.Privacy = { hasError: true, message: "You must agree to the privacy policy" };
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && resData?.ok !== 200) {
      sendData(values);
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit}>
      <fieldset disabled={isLocked} style={{ padding: 0 }}>
        <div className={classNames("form", { "successfully-sent": isLocked })}>
          {elements.map((element, index) => {
            if (element.type === "input" && !element.doubleInput)
              return (
                <Input
                  id={`${element.title}-${index}`}
                  key={`${element.title}-${index}`}
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

            if (element.type === "select")
              return (
                <div
                  className={classNames("form-select", {
                    "form-select--large": element.modification === "Large",
                  })}
                  key={`${element.title}-${index}`}
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
                <div className="input--double" key={`${element.title}-${index}`}>
                  <h3 className="input--double-label h6">{element.title}</h3>
                  <div className="input--double-wrapper">
                    <div
                      className="input--double-phone-wrapper input-wrapper"
                      id="phone-form-input"
                      onClick={handleDoubleInput}
                    >
                      <Icon name="phone" width="24px" height="24px" userSelect={false} />
                      <IMaskInput
                        mask={"+{7} (000) 000-00-00"}
                        type="text"
                        placeholder="Enter Your Number"
                        onChange={(e) => handleChange("AdditionalPhone", e.currentTarget.value)}
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
                      <Icon name="email" width="24px" height="24px" userSelect={false} />
                      <input
                        type="text"
                        placeholder="Enter Your Email"
                        onChange={(e) => handleChange("AdditionalEmail", e.currentTarget.value)}
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
            <label htmlFor="user-message" className="h6">Message</label>
            <div className="form-textarea-wrapper">
              <textarea
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
              <label className="form-send__privacy-label description" htmlFor="form-checkbox">
                <span>I agree with </span>
                <Link to="/"><u>Terms of Use</u></Link>
                <span> and </span>
                <Link to="/"><u>Privacy Policy</u></Link>
              </label>
            </div>
            <Button
              className={classNames("form-send-button", { deactivated: resData?.ok === 200 })}
              title="Send Your Message"
              label="Send Your Message"
              mode="purple"
              type="submit"
            />
          </div>
        </div>
      </fieldset>
      {resData?.ok === 200 && (
        <div className="form-suc-message">{resData.message}</div>
      )}
    </form>
  );
};

export default Form;
