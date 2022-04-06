import classes from "../styles/WelcomePage.module.css";

import useHttp from "../hooks/useHttp";
import Link from "next/link";

const WelcomePage = () => {
  const features = useHttp();

  return (
    <section className={classes.section}>
      <h1>Marketing Website</h1>
      <p>This is some description about this web page</p>
      {features ? <ul>
        {features.map((feature) => (
          <li key={feature.title}>
            <div>
              <img src={feature.img} alt={feature.title + " image"} />
            </div>
            <Link href={feature.title}>
              <h2>{feature.title}</h2>
            </Link>
          </li>
        ))}
      </ul> : <h1>LOADING...</h1>}
    </section>
  );
};

export default WelcomePage;
