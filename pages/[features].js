import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Features from "../components/Features";
import Footer from "../components/Footer";

const FeaturesPage = () => {
  const router = useRouter();
  const [pathTitle, setPathTitle] = useState(router.query.features);

  useEffect(() => {
    if (router && router.query) {
      setPathTitle(router.query.features);
    }
  }, [router]);

  return (
    <Fragment>
      <Header />
      {pathTitle && <Features pathTitle={pathTitle} />}
      <Footer />
    </Fragment>
  );
};

export default FeaturesPage;
