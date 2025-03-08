"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { auth } from "@/firebase/firebase";
import { signOutUser } from "@/firebase/auth";
import { useHeaderStore, CurrentUser } from "@/app/lib/headerStore";
import "./Header.css";

const Header = () => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    currentUser,
    setCurrentUser,
    isSideBarOpen,
  } = useHeaderStore();

  const router = useRouter();

  const handleLogOutOnClick = async () => {
    try {
      const result = await signOutUser();
      if (result) {
        router.push("/");
      } else {
        console.error("Logout unsuccessful");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  //check if user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsUserLoggedIn(true);
        if (user.email && user.displayName) {
          const [name, surname] = user.displayName.split(" ");
          const input: CurrentUser = {
            id: user.uid,
            image: "",
            name,
            surname,
            email: user.email,
            type: "",
          };

          //TODO: to fetch user from db - to get image and type

          setCurrentUser(input);
        }
      } else {
        setIsUserLoggedIn(false);
        console.log("No user logged in");
      }
    });

    return () => unsubscribe();
  }, [setIsUserLoggedIn, setCurrentUser]);

  return (
    <header>
      <div className="mobile-header">
        <Link href="/">
          <div className="logo-container">
            <Image
              src="/icons/logo.png"
              alt="logo"
              width={60}
              height={60}
              priority
            />
            <p>Song Sieve</p>
          </div>
        </Link>

        <Link href="/signin">
          <div className="login-container">
            {isUserLoggedIn ? (
              <>
                <p
                  className="header-logout-button"
                  onClick={handleLogOutOnClick}
                >
                  Log out
                </p>
                <Image
                  src="/icons/login-icon.svg"
                  alt="logo"
                  width={35}
                  height={35}
                />
              </>
            ) : (
              <>
                <p>Log in</p>
                <Image
                  src="/icons/login-icon.svg"
                  alt="logo"
                  width={35}
                  height={35}
                />
              </>
            )}
          </div>
        </Link>
      </div>

      <div className="desktop-header">
        <div className={`header-arrows ${isSideBarOpen ? "" : "margin-left"}`}>
          <div className="rotate-arrow" onClick={() => window.history.back()}>
            <Image
              src="/icons/arrow-icon.svg"
              alt="logo"
              width={15}
              height={15}
            />
          </div>

          <div onClick={() => window.history.forward()}>
            <Image
              src="/icons/arrow-icon.svg"
              alt="logo"
              width={15}
              height={15}
            />
          </div>
        </div>
        <div className="login-account-container">
          {isUserLoggedIn ? (
            <Link href="/">
              <button onClick={handleLogOutOnClick}>Log out</button>
            </Link>
          ) : (
            <Link href="/signin">
              <button> Log in</button>
            </Link>
          )}

          {isUserLoggedIn && (
            <Link href="/">
              <div className="login-container">
                {currentUser && <p>{currentUser.name}</p>}
                <Image
                  src="/icons/login-icon.svg"
                  alt="logo"
                  width={35}
                  height={35}
                />
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
