import { Fragment } from "react/cjs/react.production.min";

import classes from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <p>This web app is made using Next.js/React.js and firebase</p>
      <div>
        <p>@2022 Xabu</p>
        <p className={classes.gitLink}>
          <a href="https://github.com/Xabura">My Github</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
