import classes from "../styles/Header.module.css";

import { useContext } from "react";
import UserContext from "../context/auth-context";

import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { isLoggedIn, logout } = useContext(UserContext);

  const themeHandler = () => {
    document.querySelector("body").classList.toggle("darkTheme");
  };

  const logoutHandler = () => {
    logout();
  };

  return (
    <header className={classes.header}>
      <button onClick={themeHandler}>
        <img
          src="https://static.thenounproject.com/png/1664849-200.png"
          alt="theme"
        />
      </button>

      <div>
        <Link href={"/"}>
          <Image
            src="/images/logo.png"
            alt="LOGO"
            width="100%"
            height="100%"
          />
        </Link>
      </div>
      <nav>
        <ul>
          <li className={classes.navItem}>
            <Link href="/">Home</Link>
          </li>
          {isLoggedIn && (
            <li className={classes.navItem}>
              <Link href="/user-page">Profile</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li className={classes.userButtons}>
              <button className={classes.signIn}>
                <Link href="/sign-up">Sing Up</Link>
              </button>
              <button className={classes.signIn}>
                <Link href="/login">Log In</Link>
              </button>
            </li>
          )}
          {isLoggedIn && (
            <button onClick={logoutHandler} className={classes.signIn}>
              <Link href="/">Log Out</Link>
            </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
