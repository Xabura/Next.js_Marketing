import { useRouter } from "next/router";
import { useContext, useState } from "react";
import UserContext from "../context/auth-context";

const useAuthHttp = (url, email, password) => {
  const authCtx = useContext(UserContext);
  const router = useRouter();
  const [message, setMessage] = useState('');

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
  })
    .then((res) => {
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
        setMessage(err.message);
    });

    return message;
};

export default useAuthHttp;
