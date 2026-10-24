import { FC } from "react";

interface FormButtonProps {
  title: string;
  type?: "button" | "submit" | "reset";
  /** Extra Tailwind classes appended to the base style. */
  styles?: string;
}

const FormButton: FC<FormButtonProps> = ({
  title,
  type = "button",
  styles = "",
}) => {
  return (
    <button
      type={type}
      className={`bg-yellow-sun w-full h-12 text-center text-base font-medium py-3 px-5 text-grey-charcoal rounded-2xl hover:bg-yellow-sun-dark ${styles}`}
    >
      {title}
    </button>
  );
};

export default FormButton;
