"use client";
import { FC, useState } from "react";

const BirthdayInput: FC = (props) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("Error text");
  return (
    <div className="flex flex-col text-white text-sm font-normal gap-1">
      <label>Birthday</label>
      <div
        className={`${
          error && "border-red-error"
        } flex items-center justify-around w-full h-[3.5rem] bg-grey-smoke border border-grey-silver rounded-2xl px-5 py-4`}
      >
        <input
          type="text"
          placeholder="DD"
          maxLength={2}
          className="w-12 text-center bg-transparent text-gray-200 placeholder-gray-500 outline-none"
        />
        <span className="text-gray-500">|</span>
        <input
          type="text"
          placeholder="MM"
          maxLength={2}
          className="w-12 text-center bg-transparent text-gray-200 placeholder-gray-500 outline-none"
        />
        <span className="text-gray-500">|</span>
        <input
          type="text"
          placeholder="YYYY"
          maxLength={4}
          className="w-16 text-center bg-transparent text-gray-200 placeholder-gray-500 outline-none"
        />
      </div>
      {error && errorText && <p className="text-red-error">{errorText}</p>}
    </div>
  );
};

export default BirthdayInput;
