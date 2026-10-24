import { ChangeEvent, FC, useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";

import { API_ROUTES } from "@/app/constants/apiRoutes";

import { api } from "@/lib/api";
import { toApiError } from "@/lib/api-error";
import type { ApiResponse } from "@/types/api";
import type { Team, TeamsByLeague } from "@/types/profile";

import arrowLeft from "/public/images/Arrow-Left.svg";
import searchImg from "/public/images/Search.svg";

interface AvatarSelectModalProps {
  hideModal: () => void;
  onChangeAvatar: (flag: string, id: number) => void;
  /** Currently selected avatar: a team flag URL or the bundled default image. */
  avatar: string | StaticImageData;
}

const MAX_LEAGUES_SHOWN = 5;

const AvatarSelectModal: FC<AvatarSelectModalProps> = ({
  hideModal,
  onChangeAvatar,
  avatar,
}) => {
  const [teams, setTeams] = useState<TeamsByLeague | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [avatarFlag, setAvatarFlag] = useState(avatar);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    api
      .get<ApiResponse<{ leagues: TeamsByLeague }>>(API_ROUTES.USER.TEAMS)
      .then(({ data }) => setTeams(data.data.leagues))
      .catch((error) => setError(toApiError(error).message));
  }, []);

  const avatarClickHandler = (team: Team) => {
    setAvatarFlag(team.flag);
    onChangeAvatar(team.flag, team.id);
  };

  const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Keep only matching teams, and drop leagues left with none.
  const filteredTeams: TeamsByLeague | null = searchInput
    ? Object.fromEntries(
        Object.entries(teams ?? {})
          .map(([league, teamList]): [string, Team[]] => [
            league,
            teamList.filter((team) =>
              team.title.toLowerCase().includes(searchInput.toLowerCase()),
            ),
          ])
          .filter(([, filtered]) => filtered.length > 0),
      )
    : teams;

  const renderTeams = () => {
    if (error) return <p className="text-red-error">{error}</p>;
    if (!filteredTeams) return <p>Loading...</p>;
    if (Object.keys(filteredTeams).length === 0) {
      return <p className="text-white">No results found</p>;
    }

    return Object.entries(filteredTeams)
      .slice(0, MAX_LEAGUES_SHOWN)
      .map(([league, teamList]) => (
        <div key={league} className="mb-6">
          <h2 className="mb-[1.2rem] text-xl font-medium text-white">
            {league}
          </h2>
          <ul className="flex flex-row flex-wrap gap-[1.2rem]">
            {teamList.map((team) => (
              <li key={team.id} className="ml-4">
                <button
                  type="button"
                  onClick={() => avatarClickHandler(team)}
                  className="block cursor-pointer"
                >
                  <img
                    src={team.flag}
                    alt={team.title}
                    className="w-[65px] h-[65px]"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      ));
  };

  return (
    <div className="absolute top-0 left-0 w-screen min-h-screen z-10 bg-black-rich">
      <div className="max-w-xl h-auto m-auto flex flex-col gap-8 px-6 py-8">
        <div className="flex flex-row justify-between">
          <button
            onClick={hideModal}
            className="text-white py-1 px-4 flex items-center gap-[0.5rem]"
          >
            <Image src={arrowLeft} alt="Back" />
            <h1>back</h1>
          </button>
        </div>
        <div className="relative w-fit m-auto mb-10">
          <Image
            src={avatarFlag}
            alt="Profile Picture"
            width={100}
            height={100}
            className="w-[100px] h-[100px] object-contain"
          />
        </div>
        <div className="relative">
          <span className="absolute left-[1rem] top-[.85rem]">
            <Image src={searchImg} alt="search" />
          </span>
          <input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={onSearchChangeHandler}
            className="w-full h-[3rem] p-[1rem] rounded-2xl bg-grey-dark pl-[3rem]"
          />
        </div>
        <div className="container mx-auto p-4">{renderTeams()}</div>
      </div>
    </div>
  );
};

export default AvatarSelectModal;
