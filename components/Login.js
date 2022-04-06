import classes from "../styles/Login.module.css";

import { useState, useContext } from "react";
import { useRouter } from "next/router";
import UserContext from "../context/auth-context";

const Login = () => {
  const authCtx = useContext(UserContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);

  const emailChange = (event) => {
    setEmail(event.target.value);
    if (event.target.value !== "") {
      setEmailIsValid(true);
    }
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value !== "") {
      setPasswordIsValid(true);
    }
  };

  const loginSubmitHandler = (event) => {
    event.preventDefault();

    if (passwordIsValid && emailIsValid) {
      setLoading(true);
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDKSRMYOSiE_pC6onABlzT-pduc-Go9O1E",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
        }
      )
        .then((res) => {
          setLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              throw new Error(data.error.message);
            });
          }
        })
        .then((data) => {
          authCtx.login(data.idToken);
          router.push("/user-page");
        })
        .catch((err) => {
          setErrorMsg(err.message);
        });
    }
  };

  return (
    <section className={classes.section}>
      <form onSubmit={loginSubmitHandler} className={classes.card}>
        <label>User email</label>
        <input
          onChange={emailChange}
          name="email"
          type="text"
          placeholder="email..."
        />
        <label>User password</label>
        <input
          onChange={passwordChange}
          name="password"
          type="password"
          placeholder="password..."
        />

        <button type="submit">Log In</button>
        {loading ? <p>Loading...</p> : <p>{errorMsg}</p>}
      </form>
    </section>
  );
};

export default Login;
