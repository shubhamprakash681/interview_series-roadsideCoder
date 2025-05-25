import { useEffect, useState } from "react";
import Loader from "./components/Loader";

const App = () => {
  const [loaderPercent, setLoaderPercent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoaderPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }

        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <Loader loaderPercentage={loaderPercent} key="main-loader" />;
};

export default App;
