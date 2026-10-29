"use client";

import { FC, useState } from "react";
import Image from "next/image";

import { fieldLabel } from "@/components/form/field";
import FormInput from "@/components/form/form-input";

import { cn } from "@/lib/cn";
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
        <p className={fieldLabel}>Which platforms do you play on?</p>
        <div className="flex w-full justify-between gap-4">
          {PLATFORMS.map((platform) => (
            <button
              key={platform.id}
              type="button"
              aria-pressed={selectedPlatform === platform.id}
              // Selected tiles use the secondary colours; unselected ones look like fields.
              className={cn(
                "flex h-12 w-full cursor-pointer flex-col items-center justify-center rounded-lg border text-white transition",
                selectedPlatform === platform.id
                  ? "border-secondary-border bg-secondary"
                  : "border-field bg-field",
              )}
              onClick={() => toggleSelection(platform.id)}
            >
              <Image src={platform.icon} alt={platform.label} />
            </button>
          ))}
        </div>
      </div>
      <div
        className={cn(
          "overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out",
          selectedPlatform ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
        )}
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
