import ProgressBar from "./ProgressBar";
import "./styles.css";

export default function App() {
  const values = [10, 90, 50, 42];
  return (
    <div className="App">
      <h1>Progress Bar</h1>
      <div>
        {values.map((value, i) => {
          return <ProgressBar progress={value} key={i} />;
        })}
      </div>
    </div>
  );
}
