"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { useSidebarStore } from "@/app/lib/sidebarStore";
import SidebarNavLinks from "../SidebarNavLinks/SidebarNavLinks";
import FilterOptions from "../SidebarFilterOptions/FilterOptions";
import "./SideBar.css";

const SideBar = () => {
  const { isSideBarOpen, setIsSideBarOpen, isFavouriteTracksPage } =
    useSidebarStore();
  const [isPlaylistPage, setIsPlaylistPage] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  useEffect(() => {
    const isPlaylist = pathname.includes("playlist");
    setIsPlaylistPage(isPlaylist);
  }, [pathname]);

  return (
    <div className={`sidebar-section ${isSideBarOpen ? "" : "sidebar-hidden"}`}>
      {!isSideBarOpen && (
        <div className="open-sidebar" onClick={toggleSidebar}>
          <Image
            src="/icons/close-sidebar-icon.svg"
            alt="close navbar"
            width={35}
            height={35}
          />
        </div>
      )}
      {isSideBarOpen && (
        <>
          <Link href="/">
            <div className="logo-container">
              <Image src="/icons/logo.png" alt="logo" width={60} height={60} />
              <p>Song Sieve</p>
            </div>
          </Link>
          <div className="close-sidebar" onClick={toggleSidebar}>
            <Image
              src="/icons/close-sidebar-icon.svg"
              alt="close navbar"
              width={35}
              height={35}
            />
          </div>
          <SidebarNavLinks />
          {isPlaylistPage && <FilterOptions />}
          {isFavouriteTracksPage && <FilterOptions />}
        </>
      )}
    </div>
  );
};

export default SideBar;
