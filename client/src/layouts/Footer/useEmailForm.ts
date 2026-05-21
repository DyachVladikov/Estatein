import { useRef, useState, useEffect } from "react";
import useApi from "@/hooks/useApi";

type FormStatus = "idle" | "error" | "success";

const validateEmail = (value: string): string | null => {
  if (!value) return "Write something before sending";
  if (!value.includes("@")) return "That's not an email";
  return null;
};

export const useEmailForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const { sendData } = useApi<{ ok: number; message: string }>("emails");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 18_000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = inputRef.current?.value ?? "";
    const validationError = validateEmail(value);

    if (validationError) {
      setStatus("error");
      setMessage(validationError);
      return;
    }

    sendData(
      { email: value },
      {
        onSuccess: (res) => {
          if (res.ok === 200) {
            setStatus("success");
            setMessage("Successfully subscribed!");
            if (inputRef.current) inputRef.current.value = "";
          } else {
            setStatus("error");
            setMessage(res.message);
          }
        },
        onError: () => {
          setStatus("error");
          setMessage("Something went wrong. Please try again later.");
        },
      },
    );
  };

  return { inputRef, status, message, handleSubmit };
};
