"use client";

import { FC, useId, useState } from "react";

interface DateParts {
  day: string;
  month: string;
  year: string;
}

interface BirthdayInputProps {
  /** Receives the date as `YYYY-MM-DD`, or `""` while all fields are empty. */
  onDateChange: (date: string) => void;
  error?: string;
}

const toDateString = ({ day, month, year }: DateParts) =>
  day || month || year
    ? `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    : "";

const INPUT_CLASSES =
  "text-center bg-transparent text-gray-200 placeholder-gray-500 outline-none";

const BirthdayInput: FC<BirthdayInputProps> = ({ onDateChange, error }) => {
  const labelId = useId();
  const [dateInput, setDateInput] = useState<DateParts>({
    day: "",
    month: "",
    year: "",
  });

  const inputChangeHandler = (field: keyof DateParts, value: string) => {
    const next = { ...dateInput, [field]: value.replace(/\D/g, "") };
    setDateInput(next);
    onDateChange(toDateString(next));
  };

  return (
    <div className="flex flex-col text-white text-sm font-normal gap-1">
      <label id={labelId}>Birthday</label>
      <div
        role="group"
        aria-labelledby={labelId}
        className={`${
          error && "border-red-error"
        } flex items-center justify-around w-full h-[3.5rem] bg-grey-smoke border border-grey-silver rounded-2xl px-5 py-4`}
      >
        <input
          type="text"
          inputMode="numeric"
          aria-label="Day"
          placeholder="DD"
          maxLength={2}
          value={dateInput.day}
          onChange={(e) => inputChangeHandler("day", e.target.value)}
          className={`w-12 ${INPUT_CLASSES}`}
        />
        <span className="text-gray-500">|</span>
        <input
          type="text"
          inputMode="numeric"
          aria-label="Month"
          placeholder="MM"
          maxLength={2}
          value={dateInput.month}
          onChange={(e) => inputChangeHandler("month", e.target.value)}
          className={`w-12 ${INPUT_CLASSES}`}
        />
        <span className="text-gray-500">|</span>
        <input
          type="text"
          inputMode="numeric"
          aria-label="Year"
          placeholder="YYYY"
          maxLength={4}
          value={dateInput.year}
          onChange={(e) => inputChangeHandler("year", e.target.value)}
          className={`w-16 ${INPUT_CLASSES}`}
        />
      </div>
      {error && <p className="text-red-error">{error}</p>}
    </div>
  );
};

export default BirthdayInput;
