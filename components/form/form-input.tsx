"use client";

import {
  FC,
  HTMLInputAutoCompleteAttribute,
  HTMLInputTypeAttribute,
  useState,
} from "react";
import Image from "next/image";

import { cn } from "@/lib/cn";

import { fieldBox, FieldError, fieldLabel } from "./field";

import hideImg from "@/public/images/hide.svg";
import visibilityImg from "@/public/images/visibility.svg";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  /** Maximum length; also shows a character counter. */
  count?: number;
  error?: string;
}

const FormInput: FC<FormInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  count,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const isPasswordType = type === "password";
  return (
    <label className={cn(fieldLabel, "relative flex w-full flex-col gap-1")}>
      {label}
      <input
        type={isPasswordType && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={count}
        className={fieldBox(!!error)}
      />
      {count !== undefined && (
        <p className="absolute right-0 top-0">
          {value.length}/{count}
        </p>
      )}
      {isPasswordType && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={cn(
            "absolute right-4 flex h-14 items-center focus:outline-none",
            error ? "bottom-6" : "bottom-0",
          )}
        >
          {isPasswordVisible ? (
            <Image src={visibilityImg} alt="Hide password" />
          ) : (
            <Image src={hideImg} alt="Show password" />
          )}
        </button>
      )}
      {error && <FieldError>{error}</FieldError>}
    </label>
  );
};

export default FormInput;
