"use client";

import { FC, HTMLInputTypeAttribute, useState } from "react";
import Image from "next/image";

import hideImg from "../../public/images/hide.svg";
import visibilityImg from "../../public/images/visibility.svg";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
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
  count,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const isPasswordType = type === "password";
  return (
    <label className="relative w-full text-white text-sm font-normal flex flex-col gap-1">
      {label}
      <input
        type={isPasswordType && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={count}
        className={`${
          error && "border-red-error"
        } w-full h-[3.5rem] bg-grey-smoke border border-grey-silver rounded-2xl px-5 py-4`}
      />
      {count !== undefined && (
        <p className="absolute top-0 right-0">
          {value.length}/{count}
        </p>
      )}
      {isPasswordType && (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`absolute h-[3.5rem] ${
            error ? "bottom-6" : "bottom-0"
          } right-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none`}
        >
          {isPasswordVisible ? (
            <Image src={visibilityImg} alt="Hide password" />
          ) : (
            <Image src={hideImg} alt="Show password" />
          )}
        </button>
      )}
      {error && <p className="text-red-error">{error}</p>}
    </label>
  );
};

export default FormInput;
