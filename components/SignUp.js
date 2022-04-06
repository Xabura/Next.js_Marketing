import classes from "../styles/SignUp.module.css";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";

import UserContext from "../context/auth-context";

const SignUp = () => {
  const authCtx = useContext(UserContext);
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [emailInput, setEmailInput] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailIsTouched, setEmailIsTouched] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);

  const [fomrIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    if (emailIsValid && passwordIsValid) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  }, [emailIsValid, passwordIsValid]);

  const emailChange = (event) => {
    setEmailIsTouched(true);
    if (event.target.value.trim() !== "") {
      setEmailInput(event.target.value);
      setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
    }
  };
  const passwordChange = (item) => {
    setPasswordIsTouched(true);
    if (item.target.value.trim() !== "" && item.target.value.length >= 5) {
      setPasswordInput(item.target.value);
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    setLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDKSRMYOSiE_pC6onABlzT-pduc-Go9O1E",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        setLoading(false);
        if(res.ok){
          return res.json();
        }else{
          return res.json().then(data => {
            throw new Error(data.error.message)
          })
        }
      })
      .then((data) => {
        authCtx.login(data.idToken);
        router.push("/user-page");
      })
      .catch((err) => {
        setErrorMsg(err.message);
      });
  };

  return (
    <section className={classes.section}>
      <form className={classes.form} onSubmit={submitHandler}>
        <label htmlFor="email">Enter your Email:</label>
        <input
          className={`${classes.input} ${
            !emailIsValid && emailIsTouched ? classes.invalid : ""
          }`}
          onChange={emailChange}
          id="email"
          name="email"
          type="text"
          placeholder="email..."
        />
        <label htmlFor="password">Enter your Password:</label>
        <input
          className={`${classes.input} ${
            !passwordIsValid && passwordIsTouched ? classes.invalid : ""
          }`}
          onChange={passwordChange}
          id="password"
          name="password"
          type="password"
          placeholder="password..."
        />
        <button type="submit" disabled={!fomrIsValid}>
          Submit
        </button>
        {loading ? <p>Loading...</p> : <p>{errorMsg}</p>}
      </form>
    </section>
  );
};

export default SignUp;
