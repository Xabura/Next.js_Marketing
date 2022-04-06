import Header from "../components/Header";
import Footer from "../components/Footer";
import User from "../components/User";
import { Fragment } from "react";

const UserPage = () => {
  return (
    <Fragment>
      <Header />
      <User />
      <Footer />
    </Fragment>
  );
};

export default UserPage;
