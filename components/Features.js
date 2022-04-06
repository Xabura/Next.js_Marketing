import classes from "../styles/Features.module.css";

import { useState, useEffect } from "react";

import useHttp from "../hooks/useHttp";

const Features = ({ pathTitle }) => {
  const fetchedFeature = useHttp();

  const [feature, setFeature] = useState();

  useEffect(() => {
    if (fetchedFeature) {
      setFeature(fetchedFeature.find((feature) => feature.title === pathTitle));
    }
  }, [pathTitle, fetchedFeature]);

  return (
    <section className={classes.section}>
      <h1>Features</h1>

      {fetchedFeature && feature && (
        <div key={feature.title}>
          <div className={classes.imgDiv}>
            <img src={feature.img} alt="image" />
          </div>
          <h2>{feature.title}</h2>
          <p>{feature.description}</p>
        </div>
      )}
    </section>
  );
};

export default Features;
