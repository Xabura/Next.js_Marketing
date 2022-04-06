import Header from "../components/Header";
import Login from "../components/Login";
import Footer from "../components/Footer";
import { Fragment } from "react";

const LoginPage = () => {
  return (
    <Fragment>
      <Header />
      <Login />
      <Footer />
    </Fragment>
  );
};

export default LoginPage;
