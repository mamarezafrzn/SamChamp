"use client";
import Image from "@/node_modules/next/image";
import { FC, Fragment, useEffect, useState } from "react";
import profileImg from "../../../public/images/Brentford.svg";
import editImg from "../../../public/images/Edit.svg";
import FormInput from "@/components/form/form-input";
import FormButton from "@/components/form/form-button";
import BirthdayInput from "@/components/form/form-birthday-input";
import PlatformSelector from "./components/platform-selector";
import Cookies from "js-cookie";
import AvatarSelectModal from "./components/avatarSelect_modal";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "@/store/slices/profile/profileActions";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_ROUTES } from "@/app/constants/apiRoutes";

// Define the shape of the API response
interface ApiResponse {
  data: {
    [key: string]: string; // Adjust based on your API response structure
  };
}

// Define the shape of the error response
interface ErrorResponse {
  response?: {
    data?: {
      data?: {
        [key: string]: string; // Adjust based on your API error structure
      };
    };
  };
}

const EditAccount: FC = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [avatar, setAvatar] = useState({ flag: profileImg, id: "27" });
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [userId, setUserId] = useState();
  const [birthday, setBirthday] = useState();
  const [platform, setPlatform] = useState([{ game_machine: "", game_id: "" }]);

  const onShowModal = () => {
    setShowModal(true);
  };
  const onHideModal = () => {
    setShowModal(false);
  };

  const onChangeAvatar = (flag, id) => {
    setAvatar({ flag, id });
  };

  const nameChangeHandler = (value: string) => {
    setName(value);
  };
  const lastNameChangeHandler = (value: string) => {
    setLastName(value);
  };
  const idChangeHandler = (value: string) => {
    setUserId(value);
  };
  const birthdayChangeHandler = (value: string) => {
    setBirthday(value);
  };
  const platformChangeHandler = (
    data: [
      {
        game_id: string;
        game_machine: string;
      }
    ]
  ) => {
    setPlatform(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData ={
      "firstname": name || "",
      "lastname" : lastName || "",
      "birthday" : birthday || "",
      "team": avatar.id || "",
      "platforms":[platform]
    }

    dispatch(updateUserProfile(formData));
  };

  // useEffect(()=>{
  //   isUserLoggedIn()

  // },[name])
  // const isUserLoggedIn = async() =>{
  //   const token = Cookies.get("authToken")
  //   try{
  //     const response:AxiosResponse<ApiResponse> = await axios.get(`${API_ROUTES.MAIN}${API_ROUTES.USER.PROFILE}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     console.log("success!!", response)
  //   }catch(error){
  //     const axiosError = error as AxiosError<ErrorResponse>;

  //     if (axiosError.response?.data?.data) {
  //       const errorKeys = Object.keys(axiosError.response.data.data);

  //       errorKeys.forEach((key) => {
  //         console.log(`${key}: ${axiosError.response?.data?.data[key]}`);
  //       });
  //     } else {
  //       console.log("Authentication failed. No error data found.");
  //     }
  //   }
  // }
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
          <div
            onClick={onShowModal}
            className="relative w-fit m-auto mb-10 cursor-pointer"
          >
            <Image
              src={avatar.flag || profileImg}
              alt="Profile Picture"
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-contain"
            />
            <button
              type="button"
              className="bg-yellow-sun rounded-full p-2.5 absolute bottom-0 right-0"
            >
              <Image src={editImg} alt="Edit profile picture" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <FormInput
              label="Name"
              placeholder="EX. John"
              type="text"
              sendValue={nameChangeHandler}
            />
            <FormInput
              label="Last Name"
              placeholder="EX. Wick"
              type="text"
              sendValue={lastNameChangeHandler}
            />
            <FormInput
              label="ID"
              placeholder="Maximum 14 characters"
              type="text"
              count={14}
              sendValue={idChangeHandler}
            />
            <BirthdayInput onDateChange={birthdayChangeHandler} />
            <PlatformSelector platformChangeHandler={platformChangeHandler} />
          </div>
          <FormButton type="submit" title="save changes" styles="mt-10" />
        </form>
      </div>
    </Fragment>
  );
};

export default EditAccount;
