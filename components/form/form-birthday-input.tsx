"use client";

import { FC, useEffect, useState } from "react";

interface DateParts {
  day: string;
  month: string;
  year: string;
}

interface BirthdayInputProps {
  /** Receives the date as `YYYY-MM-DD`. */
  onDateChange: (date: string) => void;
  error?: string;
}

const BirthdayInput: FC<BirthdayInputProps> = ({ onDateChange, error }) => {
  const [dateInput, setDateInput] = useState<DateParts>({
    day: "",
    month: "",
    year: "",
  });

  const inputChangeHandler = (field: keyof DateParts, value: string) => {
    setDateInput((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Send the combined date to the parent once typing settles.
  useEffect(() => {
    const timeout = setTimeout(() => {
      onDateChange(`${dateInput.year}-${dateInput.month}-${dateInput.day}`);
    }, 10);

    return () => clearTimeout(timeout);
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
      {error && <p className="text-red-error">{error}</p>}
    </div>
  );
};

export default BirthdayInput;
