'use client'
import Image from "@/node_modules/next/image";
import { FC, useState } from "react";
import profileImg from "../../../public/images/Brentford.svg";
import editImg from "../../../public/images/Edit.svg";
import FormInput from "@/components/form/form-input";
import FormButton from "@/components/form/form-button";
import BirthdayInput from "@/components/form/form-birthday-input";
import PlatformSelector from "./components/platform-selector";
import Cookies from "js-cookie";
import AvatarSelectModal from "./components/avatarSelect_modal";

const EditAccount: FC = () => {
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [userId, setUserId] = useState();
  const [birthday, setBirthday] = useState({ day: "", month: "", year: "" });
  const [platform, setPlatform] = useState([
    { platformName: "", gamerTag: "" },
  ]);

  return (
    <div className="w-full flex flex-col gap-8 px-6 py-8">
      {/* <AvatarSelectModal/> */}
      <div className="flex flex-row justify-between">
        <h1>Account</h1>
        <button className="bg-grey-onyx rounded-3xl text-white py-1 px-4">
          Skip
        </button>
      </div>
      <form>
        <div className="relative w-fit m-auto mb-10">
          <Image src={profileImg} alt="Profile Picture" />
          <button className="bg-yellow-sun rounded-full p-2.5 absolute bottom-0 right-0">
            <Image src={editImg} alt="Edit profile picture" />
          </button>
        </div>
        <div className="flex flex-col gap-4">
          <FormInput label="Name" placeholder="EX. John" type="text" />
          <FormInput label="Last Name" placeholder="EX. Wick" type="text" />
          <FormInput
            label="ID"
            placeholder="Maximum 14 characters"
            type="text"
            count={14}
          />
          <BirthdayInput />
          <PlatformSelector />
        </div>
        <FormButton title="save changes" styles="mt-10" />
      </form>
    </div>
  );
};

export default EditAccount;
