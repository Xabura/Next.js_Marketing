import { Fragment } from "react/cjs/react.production.min";

import Header from "../components/Header";
import WelcomePage from "../components/WelcomePage";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <Fragment>
        <Header />
        <WelcomePage />
        <Footer />
    </Fragment>
  );
}
