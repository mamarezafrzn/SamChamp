"use client";
import React, { FC, useState } from "react";
import Image from "@/node_modules/next/image";
import visibilityImg from "../../public/images/visibility.svg";
import hideImg from "../../public/images/hide.svg";

interface FormInputProps {
  label?: string;
  placeholder?: string;
  type?: string; // Add type as a prop
  count?: number;
  sendValue: (value: string) => void;
  error?: string;
}

const FormInput: FC<FormInputProps> = ({
  label = "Input",
  placeholder = "Your data",
  type = "type", // Default to "text" if not provided
  count = null,
  error,
  sendValue,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("Error text");
  const [inputCount, setInputCount] = useState(count);
  const [inputData, setInputData] = useState("");

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
    sendValue(e.target.value)
  };

  const isPasswordType = type === "password";
  return (
    <label className="relative w-full text-white text-sm font-normal flex flex-col gap-1">
      {label}
      <input
        type={isPasswordType && isPasswordVisible ? "text" : type}
        placeholder={placeholder}
        value={inputData}
        onChange={onInputChange}
        maxLength={count || undefined}
        className={`${
          error && "border-red-error"
        } w-full h-[3.5rem] bg-grey-smoke border border-grey-silver rounded-2xl px-5 py-4`}
      />
      {count && (
        <p className="absolute top-0 right-0">
          {inputData.length}/{count}
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
            <Image src={visibilityImg} alt="show password" />
          ) : (
            <Image src={hideImg} alt="show password" />
          )}
        </button>
      )}
      {error && <p className="text-red-error">{error}</p>}
    </label>
  );
};

export default FormInput;
