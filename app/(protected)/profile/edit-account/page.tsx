"use client";

import { FC, Fragment, SubmitEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { APP_ROUTES } from "@/app/constants/appRoutes";

import BirthdayInput from "@/components/form/form-birthday-input";
import FormInput from "@/components/form/form-input";
import Button from "@/components/ui/button";
import FormError from "@/components/ui/form-error";
import Page from "@/components/ui/page";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchClubs } from "@/store/slices/clubs/clubsActions";
import { updateUserProfile } from "@/store/slices/profile/profileActions";
import { clearProfileError } from "@/store/slices/profile/profileSlice";

import { getFormErrors } from "@/lib/api-error";
import { preloadImages } from "@/lib/preload-images";
import type { Club } from "@/types/club";
import type { ExtraField, Platform } from "@/types/profile";
import { validateBirthday } from "@/utils/validation";

import AvatarSelectModal from "./components/avatar-select-modal";
import PlatformSelector from "./components/platform-selector";

import profileImg from "@/public/images/Brentford.svg";
import editImg from "@/public/images/Edit.svg";

const PROFILE_FIELDS = ["name", "phone"] as const;

/** The backend has no columns for these, so they're stored as text extra fields. Empty ones are skipped. */
const toExtraFields = (values: Record<string, string>): ExtraField[] =>
  Object.entries(values)
    .filter(([, value]) => value)
    .map(([key, value]) => ({ id: null, key, type: "text", value }));

const EditAccount: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  // A club picked in the picker but not saved yet.
  const [pickedClub, setPickedClub] = useState<Club | null>(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [birthday, setBirthday] = useState("");
  const [birthdayError, setBirthdayError] = useState("");
  const [platform, setPlatform] = useState<Platform>({
    game_machine: "",
    game_id: "",
  });

  const { loading, error } = useAppSelector((state) => state.profile);
  const { leagues, selected: savedClub } = useAppSelector(
    (state) => state.clubs,
  );
  const serverErrors = getFormErrors(error, PROFILE_FIELDS);

  // Show the newly picked club, else the saved one, else the default image.
  const avatar = (pickedClub ?? savedClub)?.logo ?? profileImg;

  // Don't show an error left over from an earlier visit; load the saved club.
  useEffect(() => {
    dispatch(clearProfileError());
    dispatch(fetchClubs());
  }, [dispatch]);

  // Download all club logos in the background now, so the avatar picker opens with
  // them ready (the backend serves them slowly and doesn't let browsers cache them).
  useEffect(() => {
    if (leagues) {
      preloadImages(
        leagues.flatMap((league) => league.clubs.map((club) => club.logo)),
      );
    }
  }, [leagues]);

  const onShowModal = () => {
    setShowModal(true);
  };
  const onHideModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(clearProfileError());
    const error = validateBirthday(birthday);
    setBirthdayError(error);
    if (error) return;

    dispatch(
      updateUserProfile({
        profile: {
          name: [name.trim(), lastName.trim()].filter(Boolean).join(" "),
          phone,
          extraFields: toExtraFields({
            username: userId,
            birthday,
            platform: platform.game_machine,
            gamer_tag: platform.game_id,
          }),
        },
        // Only send the club when it changed.
        clubId:
          pickedClub && pickedClub.id !== savedClub?.id
            ? pickedClub.id
            : undefined,
      }),
    );
  };

  return (
    <Fragment>
      {showModal && (
        <AvatarSelectModal
          hideModal={onHideModal}
          onSelect={setPickedClub}
          avatar={avatar}
        />
      )}
      <Page
        title="Account"
        action={
          <Button variant="chip" onClick={() => router.push(APP_ROUTES.HOME)}>
            Skip
          </Button>
        }
      >
        <form onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={onShowModal}
            aria-label="Change profile picture"
            className="relative m-auto mb-10 block w-fit cursor-pointer"
          >
            <Image
              src={avatar}
              alt="Profile Picture"
              width={100}
              height={100}
              className="size-[100px] object-contain"
            />
            <span className="absolute bottom-0 right-0 rounded-full bg-primary p-2.5">
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
              error={serverErrors.fieldErrors.name}
            />
            <FormInput
              label="Last Name"
              placeholder="EX. Wick"
              type="text"
              value={lastName}
              onChange={setLastName}
            />
            <FormInput
              label="Phone"
              placeholder="EX. +1234567890"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={setPhone}
              error={serverErrors.fieldErrors.phone}
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
            <FormError message={serverErrors.formError} />
          </div>
          <Button type="submit" disabled={loading} className="mt-10">
            save changes
          </Button>
        </form>
      </Page>
    </Fragment>
  );
};

export default EditAccount;
