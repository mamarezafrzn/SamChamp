"use client";
import { FC, useState } from "react";
import Image from "@/node_modules/next/image";
import pcIcon from "../../../../public/images/pc-icon.svg";
import xboxIcon from "../../../../public/images/xbox-icon.svg";
import playstationIcon from "../../../../public/images/playstation-icon.svg";
import FormInput from "@/components/form/form-input";

const PlatformSelector: FC = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platforms = [
    { id: "playstation", icon: pcIcon, label: "PlayStation" },
    { id: "xbox", icon: xboxIcon, label: "Xbox" },
    { id: "headphones", icon: playstationIcon, label: "Headphones" },
  ];

  const toggleSelection = (id: string): void => {
    setSelectedPlatforms((prev) =>
      prev.includes(id)
        ? prev.filter((platform) => platform !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <p className=" text-white text-sm font-normal">
          Which platforms do you play on?
        </p>
        <div className="flex justify-between gap-4 w-full">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className={`flex flex-col items-center justify-center w-full h-12 rounded-lg cursor-pointer transition border text-white ${
                selectedPlatforms.includes(platform.id)
                  ? "border-yellow-dark bg-brown-umber"
                  : "border-grey-smoke bg-grey-smoke"
              }`}
              onClick={() => toggleSelection(platform.id)}
            >
              <Image src={platform.icon} alt={platform.label} />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          selectedPlatforms.length >= 1
            ? "max-h-40 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <FormInput label="Gamer Tag" placeholder="EX. Thehunter" type="text" />
      </div>
    </>
  );
};

export default PlatformSelector;
