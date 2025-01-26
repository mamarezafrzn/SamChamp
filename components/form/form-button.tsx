// 'use client';
import { FC } from "react";

const FormButton: FC = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`bg-yellow-sun w-full h-12 text-center text-base font-medium py-3 px-5 text-grey-charcoal rounded-2xl hover:bg-yellow-sun-dark ${props.styles}`}
    >
      {props.title}
    </button>
  );
};

export default FormButton;
