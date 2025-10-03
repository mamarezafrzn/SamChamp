import Image from "next/image";
import { FC, useEffect, useState } from "react";
import arrowLeft from "/public/images/Arrow-Left.svg";
import searchImg from "/public/images/Search.svg";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_ROUTES } from "@/app/constants/apiRoutes";
import Cookies from "js-cookie";

interface Team {
  id: number;
  title: string;
  flag: string;
}

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

const AvatarSelectModal: FC = ({ hideModal, onChangeAvatar, avatar }) => {
  const [teams, setTeams] = useState<{ [key: string]: Team[] } | null>(null);
  const [avatarFlag, setAvatarFlag] = useState(avatar);
  const [searchInput, setSearchInput] = useState("");
console.log(avatar)
  async function fetchTeams() {
    const token = Cookies.get("authToken");
    try {
      const response: AxiosResponse<ApiResponse> = await axios.get(
        `${API_ROUTES.MAIN}${API_ROUTES.USER.TEAMS}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTeams(response?.data?.data?.leagues);
      console.log(response?.data?.data?.leagues);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response?.data?.data) {
        const errorKeys = Object.keys(axiosError.response.data.data);

        errorKeys.forEach((key) => {
          console.log(`${key}: ${axiosError.response?.data?.data[key]}`);
        });
      } else {
        console.log("Authentication failed. No error data found.");
      }
    }
  }

  useEffect(() => {
    fetchTeams();
  }, []);

  const avatarClickHandler = (flag, id) => {
    setAvatarFlag(flag);
    onChangeAvatar(flag,id);
  };

  const onSearchChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchInput(event.target.value);
  };

  const filteredTeams = searchInput
    ? Object.fromEntries(
        Object.entries(teams || {})
          .map(([league, teamList]) => [
            league,
            teamList.filter((team) =>
              team.title.toLowerCase().includes(searchInput.toLowerCase())
            ),
          ])
          .filter(([_, filtered]) => filtered.length > 0)
      )
    : teams;

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
        <div className="">
          <div className="relative w-fit m-auto mb-10">
            <Image
              src={avatarFlag}
              alt="Profile Picture"
              width={100}
              height={100}
              className="w-[100px] h-[100px] object-contain"
            />
          </div>
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
        <div>
          <div className="container mx-auto p-4">
            {!filteredTeams ? (
              <p>Loading...</p>
            ) : Object.keys(filteredTeams).length > 0 ? (
              Object.entries(filteredTeams)
                .slice(0, 5) // Show max 5 leagues
                .map(([league, teamList]) => (
                  <div key={league} className="mb-6">
                    <h2 className="mb-[1.2rem] text-xl font-medium text-white">
                      {league}
                    </h2>
                    <ul className="flex flex-row flex-wrap gap-[1.2rem]">
                      {teamList.map((team) => (
                        <li
                          key={team.id}
                          onClick={() => avatarClickHandler(team.flag, team.id)}
                          className="ml-4 cursor-pointer"
                        >
                          <img
                            src={team.flag}
                            alt={team.title}
                            className="w-[65px] h-[65px]"
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
            ) : (
              <p className="text-white">No results found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectModal;
