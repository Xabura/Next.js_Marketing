import { useState, useEffect } from "react";

const useHttp = () => {
  const [features, setFeatures] = useState(null);

  const url =
    "https://react-3a030-default-rtdb.europe-west1.firebasedatabase.app/features.json";

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setFeatures(Object.values(data)));
  }, [url]);

  if (features) {
    return features;
  }
};

export default useHttp;
