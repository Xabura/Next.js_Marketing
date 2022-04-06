import React, { useState, useEffect } from "react";

const UserContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

let logoutTimer;

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);

    logoutTimer = setTimeout(logoutHandler, 3600000);
  };

  const contextValues = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <UserContext.Provider value={contextValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
