import { useEffect, useState } from "react";

const ProgressBar = ({ progress }) => {
  const [animatedLoad, setAnimatedLoad] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedLoad(progress), 100);

    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="progressBar">
      <div
        className="progress"
        style={{ width: `${animatedLoad}%` }}
      >{`${progress}%`}</div>
    </div>
  );
};

export default ProgressBar;
