"use client";

import { FC, Fragment, SubmitEvent, useState } from "react";
import Image, { type StaticImageData } from "next/image";

import BirthdayInput from "@/components/form/form-birthday-input";
import FormButton from "@/components/form/form-button";
import FormInput from "@/components/form/form-input";

import { useAppDispatch } from "@/store/hooks";
import { updateUserProfile } from "@/store/slices/profile/profileActions";

import type { Platform } from "@/types/profile";
import { validateBirthday } from "@/utils/validation";

import AvatarSelectModal from "./components/avatar-select-modal";
import PlatformSelector from "./components/platform-selector";

import profileImg from "@/public/images/Brentford.svg";
import editImg from "@/public/images/Edit.svg";

interface Avatar {
  flag: string | StaticImageData;
  /** Team ID, sent to the API as `team`. */
  id: number;
}

const DEFAULT_AVATAR: Avatar = { flag: profileImg, id: 27 };

const EditAccount: FC = () => {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState<Avatar>(DEFAULT_AVATAR);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  // TODO: include in the request once the API field name is confirmed.
  const [userId, setUserId] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [platform, setPlatform] = useState<Platform>({
    game_machine: "",
    game_id: "",
  });

  const onShowModal = () => {
    setShowModal(true);
  };
  const onHideModal = () => {
    setShowModal(false);
  };

  const onChangeAvatar = (flag: string, id: number) => {
    setAvatar({ flag, id });
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const error = validateBirthday(birthday);
    setBirthdayError(error);
    if (error) return;

    dispatch(
      updateUserProfile({
        firstname: name,
        lastname: lastName,
        birthday,
        team: avatar.id,
        platforms: [platform],
      }),
    );
  };

  return (
    <Fragment>
      {showModal && (
        <AvatarSelectModal
          hideModal={onHideModal}
          onChangeAvatar={onChangeAvatar}
          avatar={avatar.flag}
        />
      )}
      <div className="w-full flex flex-col gap-8 px-6 py-8">
        <div className="flex flex-row justify-between">
          <h1>Account</h1>
          <button className="bg-grey-onyx rounded-3xl text-white py-1 px-4">
            Skip
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={onShowModal}
            aria-label="Change profile picture"
            className="relative block w-fit m-auto mb-10 cursor-pointer"
          >
            <Image
              src={avatar.flag || profileImg}
              alt="Profile Picture"
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-contain"
            />
            <span className="bg-yellow-sun rounded-full p-2.5 absolute bottom-0 right-0">
              <Image src={editImg} alt="" />
            </span>
          </button>
          <div className="flex flex-col gap-4">
            <FormInput
              label="Name"
              placeholder="EX. John"
              type="text"
              value={name}
              onChange={setName}
            />
            <FormInput
              label="Last Name"
              placeholder="EX. Wick"
              type="text"
              value={lastName}
              onChange={setLastName}
            />
            <FormInput
              label="ID"
              placeholder="Maximum 14 characters"
              type="text"
              count={14}
              value={userId}
              onChange={setUserId}
            />
            <BirthdayInput onDateChange={setBirthday} error={birthdayError} />
            <PlatformSelector platformChangeHandler={setPlatform} />
          </div>
          <FormButton type="submit" title="save changes" className="mt-10" />
        </form>
      </div>
    </Fragment>
  );
};

export default EditAccount;
