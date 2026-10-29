import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";

import Button from "@/components/ui/button";
import Page from "@/components/ui/page";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchClubs } from "@/store/slices/clubs/clubsActions";

import type { Club, League } from "@/types/club";

import arrowLeft from "@/public/images/Arrow-Left.svg";
import searchImg from "@/public/images/Search.svg";

interface AvatarSelectModalProps {
  hideModal: () => void;
  onSelect: (club: Club) => void;
  /** The avatar currently shown: a club logo URL or the bundled default image. */
  avatar: string | StaticImageData;
}

const AvatarSelectModal: FC<AvatarSelectModalProps> = ({
  hideModal,
  onSelect,
  avatar,
}) => {
  const dispatch = useAppDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { leagues, error } = useAppSelector((state) => state.clubs);
  const [preview, setPreview] = useState(avatar);
  const [searchInput, setSearchInput] = useState("");

  // A modal <dialog> keeps focus inside, makes the page behind inert and closes on Escape.
  // The page behind is also kept from scrolling, and focus returns to the opener on close.
  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    dialog?.showModal();
    // Focus the dialog itself rather than its first button, so no focus ring appears on open.
    dialog?.focus();
    document.body.style.overflow = "hidden";

    return () => {
      dialog?.close();
      document.body.style.overflow = "";
      if (opener instanceof HTMLElement) opener.focus();
    };
  }, []);

  // The edit page usually loaded the clubs already; load them if not.
  useEffect(() => {
    if (!leagues) dispatch(fetchClubs());
  }, [leagues, dispatch]);

  const clubClickHandler = (club: Club) => {
    setPreview(club.logo);
    onSelect(club);
  };

  const onSearchChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  // Keep only matching clubs, and drop leagues left with none.
  const query = searchInput.toLowerCase();
  const filteredLeagues: League[] | null =
    leagues && query
      ? leagues
          .map((league) => ({
            ...league,
            clubs: league.clubs.filter((club) =>
              club.name.toLowerCase().includes(query),
            ),
          }))
          .filter((league) => league.clubs.length > 0)
      : leagues;

  const renderClubs = () => {
    if (error) {
      return (
        <div className="flex flex-col gap-4">
          <p className="text-danger">{error.message}</p>
          <Button onClick={() => dispatch(fetchClubs())}>Try again</Button>
        </div>
      );
    }
    if (!filteredLeagues) return <p>Loading...</p>;
    if (filteredLeagues.length === 0) {
      return <p className="text-white">No results found</p>;
    }

    return filteredLeagues.map((league) => (
      <div key={league.id} className="mb-6">
        <h2 className="mb-[1.2rem] text-xl font-medium text-white">
          {league.name}
        </h2>
        <ul className="flex flex-row flex-wrap gap-[1.2rem]">
          {league.clubs.map((club) => (
            <li key={club.id} className="ml-4">
              <button
                type="button"
                onClick={() => clubClickHandler(club)}
                className="block cursor-pointer"
              >
                <Image
                  src={club.logo}
                  alt={club.name}
                  width={65}
                  height={65}
                  // Load the logo URL as-is: the edit page preloads these exact URLs, so the
                  // browser reuses them (Next's optimizer would request different ones).
                  // They're already small and cached by our logo proxy.
                  unoptimized
                  // Logos are portrait (e.g. 139×181); keep their proportions inside the square.
                  className="size-[65px] object-contain"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      aria-label="Choose your avatar"
      onCancel={(event) => {
        event.preventDefault();
        hideModal();
      }}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-y-auto overscroll-contain border-0 bg-background p-0 text-inherit outline-none"
    >
      <Page
        className="m-auto max-w-xl"
        title={
          <button
            type="button"
            onClick={hideModal}
            className="flex items-center gap-2 px-4 py-1 text-white"
          >
            <Image src={arrowLeft} alt="" />
            {/* Same look as the global h1 style, without being a page heading. */}
            <span className="text-heading font-medium">back</span>
          </button>
        }
      >
        <div className="relative m-auto mb-10 w-fit">
          <Image
            src={preview}
            alt="Profile Picture"
            width={100}
            height={100}
            className="size-[100px] object-contain"
          />
        </div>
        <div className="relative">
          <span className="absolute left-4 top-[.85rem]">
            <Image src={searchImg} alt="" />
          </span>
          <input
            type="text"
            placeholder="Search"
            aria-label="Search teams"
            value={searchInput}
            onChange={onSearchChangeHandler}
            className="h-12 w-full rounded-2xl bg-field-alt p-4 pl-12"
          />
        </div>
        <div className="container mx-auto p-4">{renderClubs()}</div>
      </Page>
    </dialog>
  );
};

export default AvatarSelectModal;
