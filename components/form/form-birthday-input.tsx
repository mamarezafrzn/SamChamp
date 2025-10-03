"use client";
import { FC, useEffect, useState } from "react";

interface BirthdayInputProps {
  onDateChange: (date: string) => void; // Function to send date to parent
}

const BirthdayInput: React.FC<BirthdayInputProps> = ({ onDateChange }) => {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("Error text");
  const [dateInput, setDateInput] = useState({ day: "", month: "", year: "" });


  const inputChangeHandler = (field: string, value: string) => {
    setDateInput((prevState) => ({
      ...prevState,
      [field]: value,
  }));
  };
      // Debounce effect to send updates to parent after typing settles
      useEffect(() => {
        const timeout = setTimeout(() => {
            onDateChange(`${dateInput.year}-${dateInput.month}-${dateInput.day}`);
        }, 10); // Delay of 300ms (adjust as needed)

        return () => clearTimeout(timeout); // Cleanup the timeout on unmount or new input
    }, [dateInput, onDateChange]);

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
          onChange={(e) => inputChangeHandler("day", e.target.value)}
          className="w-12 text-center bg-transparent text-gray-200 placeholder-gray-500 outline-none"
        />
        <span className="text-gray-500">|</span>
        <input
          type="text"
          placeholder="MM"
          maxLength={2}
          onChange={(e) => inputChangeHandler("month", e.target.value)}
          className="w-12 text-center bg-transparent text-gray-200 placeholder-gray-500 outline-none"
        />
        <span className="text-gray-500">|</span>
        <input
          type="text"
          placeholder="YYYY"
          maxLength={4}
          onChange={(e) => inputChangeHandler("year", e.target.value)}
          className="w-16 text-center bg-transparent text-gray-200 placeholder-gray-500 outline-none"
        />
      </div>
      {error && errorText && <p className="text-red-error">{errorText}</p>}
    </div>
  );
};

export default BirthdayInput;
