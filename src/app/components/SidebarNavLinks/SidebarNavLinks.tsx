"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSidebarStore } from "@/app/lib/sidebarStore";

const SidebarNavLinks = () => {
  const { isUserLoggedIn, setIsPopupLoginOpen, setPopupLoginText } =
    useSidebarStore();
  const router = useRouter();

  const handleLinkToFavouriteTracks = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("open your favourite songs");
    } else {
      router.push("/favourite_tracks");
    }
  };

  const handleLinkToMyLibrary = () => {
    if (!isUserLoggedIn) {
      setIsPopupLoginOpen(true);
      setPopupLoginText("open your library");
    } else {
      router.push("/my_library");
    }
  };

  return (
    <nav className="sidebar-menu">
      <ul>
        <li>
          <Link href="/">
            <Image
              src="/icons/home-icon.svg"
              alt="Home"
              width={25}
              height={25}
            />
            <p>Home</p>
          </Link>
        </li>
        <li onClick={handleLinkToFavouriteTracks}>
          <Image
            src="/icons/heart-icon.svg"
            alt="Favourite tracks"
            width={25}
            height={25}
          />
          <p>Favourite tracks</p>
        </li>
        <li onClick={handleLinkToMyLibrary}>
          <Image
            src="/icons/bookmark-icon.svg"
            alt="My library"
            width={25}
            height={25}
          />
          <p>My library</p>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNavLinks;
