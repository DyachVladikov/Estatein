import { useRef, useState } from "react";
import type { ElementsCfg } from "./Form";

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

export const INITIAL_VALUES: FormValues = {
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

export function useFormState(elements: ElementsCfg[]) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const phoneRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  const [activeCheckBox, setActiveCheckBox] = useState("phone-form-input");

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

  const getSubmitErrors = () => validate(elements, values, privacyChecked);

  const togglePrivacy = () => {
    setPrivacyChecked((prev) => !prev);
    clearError("Privacy");
  };

  return {
    values,
    formErrors,
    setFormErrors,
    privacyChecked,
    phoneRef,
    emailRef,
    handleChange,
    clearError,
    handleDoubleInput,
    getSubmitErrors,
    togglePrivacy,
  };
}

export type { FormValues, FormErrors, FormError };
