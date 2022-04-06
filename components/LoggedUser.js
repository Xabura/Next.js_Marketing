import { useRef, useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/auth-context";

import classes from "../styles/LoggedUser.module.css";

const LoggedUser = () => {
  const passwordRef = useRef();
  const authCtx = useContext(UserContext);
  const router = useRouter();

  const SubmitHandler = (event) => {
    event.preventDefault();

    if (
      passwordRef.current.value !== "" &&
      passwordRef.current.value.trim().length >= 8
    ) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDKSRMYOSiE_pC6onABlzT-pduc-Go9O1E",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: passwordRef.current.value,
            returnSecureToken: false,
          }),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        if (res.ok) {
          router.push("/");
        } else {
          console.log("something went wrong");
        }
      });
    }
  };

  return (
    <section className={classes.section}>
      <h1>Change Your Password</h1>
      <form onSubmit={SubmitHandler}>
        <label>Change password</label>
        <input ref={passwordRef} type="password" />
        <button type="submit">Change</button>
      </form>
    </section>
  );
};

export default LoggedUser;
