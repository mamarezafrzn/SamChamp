"use client";

import { FC, useId, useState } from "react";

import { cn } from "@/lib/cn";

import { fieldBox, FieldError, fieldLabel } from "./field";

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

const PART_INPUT =
  "bg-transparent text-center text-foreground-soft outline-none placeholder:text-hint";

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
    <div className={cn(fieldLabel, "flex flex-col gap-1")}>
      <label id={labelId}>Birthday</label>
      <div
        role="group"
        aria-labelledby={labelId}
        className={cn(fieldBox(!!error), "flex items-center justify-around")}
      >
        <input
          type="text"
          inputMode="numeric"
          aria-label="Day"
          placeholder="DD"
          maxLength={2}
          value={dateInput.day}
          onChange={(e) => inputChangeHandler("day", e.target.value)}
          className={cn("w-12", PART_INPUT)}
        />
        <span className="text-hint">|</span>
        <input
          type="text"
          inputMode="numeric"
          aria-label="Month"
          placeholder="MM"
          maxLength={2}
          value={dateInput.month}
          onChange={(e) => inputChangeHandler("month", e.target.value)}
          className={cn("w-12", PART_INPUT)}
        />
        <span className="text-hint">|</span>
        <input
          type="text"
          inputMode="numeric"
          aria-label="Year"
          placeholder="YYYY"
          maxLength={4}
          value={dateInput.year}
          onChange={(e) => inputChangeHandler("year", e.target.value)}
          className={cn("w-16", PART_INPUT)}
        />
      </div>
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
};

export default BirthdayInput;
