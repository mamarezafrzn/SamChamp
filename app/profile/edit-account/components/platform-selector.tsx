"use client";

import { FC, useState } from "react";
import Image from "next/image";

import FormInput from "@/components/form/form-input";

import type { Platform } from "@/types/profile";

import pcIcon from "@/public/images/pc-icon.svg";
import playstationIcon from "@/public/images/playstation-icon.svg";
import xboxIcon from "@/public/images/xbox-icon.svg";

interface PlatformSelectorProps {
  platformChangeHandler: (platform: Platform) => void;
}

// `id` is the value sent to the API as `game_machine`.
const PLATFORMS = [
  { id: "headphones", icon: pcIcon, label: "PC" },
  { id: "xbox", icon: xboxIcon, label: "Xbox" },
  { id: "ps4", icon: playstationIcon, label: "PlayStation" },
];

const PlatformSelector: FC<PlatformSelectorProps> = ({
  platformChangeHandler,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [gamerTag, setGamerTag] = useState("");

  const onGamerTagChange = (value: string) => {
    setGamerTag(value);
    platformChangeHandler({
      game_id: value,
      game_machine: selectedPlatform ?? "",
    });
  };

  // Clicking the selected platform again deselects it.
  const toggleSelection = (id: string) => {
    const newPlatform = selectedPlatform === id ? null : id;
    setSelectedPlatform(newPlatform);
    platformChangeHandler({
      game_id: gamerTag,
      game_machine: newPlatform ?? "",
    });
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <p className=" text-white text-sm font-normal">
          Which platforms do you play on?
        </p>
        <div className="flex justify-between gap-4 w-full">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              type="button"
              aria-pressed={selectedPlatform === platform.id}
              className={`flex flex-col items-center justify-center w-full h-12 rounded-lg cursor-pointer transition border text-white ${
                selectedPlatform === platform.id
                  ? "border-yellow-dark bg-brown-umber"
                  : "border-grey-smoke bg-grey-smoke"
              }`}
              onClick={() => toggleSelection(platform.id)}
            >
              <Image src={platform.icon} alt={platform.label} />
            </button>
          ))}
        </div>
      </div>
      <div
        className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
          selectedPlatform ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <FormInput
          label="Gamer Tag"
          placeholder="EX. Thehunter"
          type="text"
          value={gamerTag}
          onChange={onGamerTagChange}
        />
      </div>
    </>
  );
};

export default PlatformSelector;
