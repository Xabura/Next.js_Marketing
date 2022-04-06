import classes from "../styles/User.module.css";

import { useContext } from "react";
import UserContext from "../context/auth-context";
import Link from "next/link";

import LoggedUser from "./LoggedUser";

const User = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <section className={classes.section}>
      {isLoggedIn ? (
        <LoggedUser />
      ) : (
        <div className={classes.card}>
          <p>You have to be Logged In to access this page!</p>
          <Link href={"/login"}>
            <button className={classes.loginBtn} type="button">
              Log In
            </button>
          </Link>
          <p>or</p>
          <Link href={"/sign-up"}>
            <button type="button">Create account</button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default User;
