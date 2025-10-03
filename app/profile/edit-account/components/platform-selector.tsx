"use client";
import { FC, useState } from "react";
import Image from "@/node_modules/next/image";
import pcIcon from "../../../../public/images/pc-icon.svg";
import xboxIcon from "../../../../public/images/xbox-icon.svg";
import playstationIcon from "../../../../public/images/playstation-icon.svg";
import FormInput from "@/components/form/form-input";

const PlatformSelector: FC = ({ platformChangeHandler }) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState();
  const [gamerTag, setGamerTag] = useState();

  const platforms = [
    { id: "headphones", icon: pcIcon, label: "PC" },
    { id: "xbox", icon: xboxIcon, label: "Xbox" },
    { id: "ps4", icon: playstationIcon, label: "PlayStation" },
  ];

  const onGamerTagChange = (value: string) => {
    setGamerTag(value);
    platformChangeHandler({
      game_id: value,
      game_machine: selectedPlatforms || "",
    });
  };

  const toggleSelection = (id: string): void => {
    const newPlatform = selectedPlatforms === id ? null : id;
    setSelectedPlatforms(newPlatform);
    platformChangeHandler({ game_id:gamerTag, game_machine: newPlatform || "" });
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
                selectedPlatforms == platform.id
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
          selectedPlatforms ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <FormInput
          label="Gamer Tag"
          placeholder="EX. Thehunter"
          type="text"
          sendValue={onGamerTagChange}
        />
      </div>
    </>
  );
};

export default PlatformSelector;
