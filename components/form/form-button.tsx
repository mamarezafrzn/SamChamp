import { FC } from "react";

interface FormButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  /** Extra Tailwind classes appended to the base style. */
  className?: string;
}

const FormButton: FC<FormButtonProps> = ({
  title,
  type = "button",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-yellow-sun w-full h-12 text-center text-base font-medium py-3 px-5 text-grey-charcoal rounded-2xl hover:bg-yellow-sun-dark disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {title}
    </button>
  );
};

export default FormButton;
