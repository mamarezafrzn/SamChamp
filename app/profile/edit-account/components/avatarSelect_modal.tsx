import Image from "next/image";
import { FC } from "react";
import profileImg from "../../../../public/images/Brentford.svg";

const AvatarSelectModal: FC = () => {
  return (
    // <div className="w-full h-screen absolute flex items-center bg-black">
    <div className="w-xl h-screen flex flex-col gap-8 px-6 py-8">
      <div className="flex flex-row justify-between">
        <h1>Account</h1>
        <button className="bg-grey-onyx rounded-3xl text-white py-1 px-4">
          Skip
        </button>
      </div>
      <div>
        <div className="relative w-fit m-auto mb-10">
          <Image src={profileImg} alt="Profile Picture" />
        </div>
      </div>
    </div>
    // </div>
  );
};

export default AvatarSelectModal;
