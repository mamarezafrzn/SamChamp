import { FC } from "react";
import Image from "@/node_modules/next/image";
import FormInput from "@/components/form/form-input";
import FormButton from "@/components/form/form-button";
import frameImg from "../../../public/images/new-pass-frame.svg";

const NewPassword: FC = () => {
  return (
    <div className="w-full min-h-screen relative">
      <div className="absolute bottom-0 w-full max-h-full overflow-y-auto">
      <Image
        src={frameImg}
        alt="Frame image"
        className="w-auto mb-[-3%] mx-auto"
      />
      <div className="rounded-t-[2rem] bg-grey-charcoal p-6 pt-10">
        <form className="flex flex-col gap-4">
          <h1 className="mb-2">New Password</h1>
          <FormInput
            label="Password"
            placeholder="Strong#Pass1"
            type="password"
          />
          <FormInput
            label="Confirm Password"
            placeholder="Re-type your password"
            type="password"
          />
          <FormButton title="Continue" styles="my-2" />
        </form>
      </div>
      </div>
    </div>
  );
};

export default NewPassword;
