import { useMemo, useState } from "react";

const App = () => {
  const [count, setCount] = useState<number>(0);

  const [favColor, setFavColor] = useState<"red" | "green">("red");

  const calculateSquare = (num: number): number => {
    console.log("Recalculating square...");

    return num * num;
  };

  const memoizedSquare = useMemo(() => {
    return calculateSquare(count);
  }, [count]);

  return (
    <div id="app-container">
      <h1 style={{ textAlign: "center" }}>Custom useMemo hook implementation</h1>

      <h3>Count: {count}</h3>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
        <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      </div>

      <h3>
        Result of expensive calculation, squared value:
        <p
          style={{
            display: "inline",
            marginLeft: "7px",
            padding: "3px 6px",
            backgroundColor: "lightyellow",
            color: "darkgreen",
            fontWeight: "bolder",
            fontSize: "1.2rem",
          }}
        >
          {memoizedSquare}
        </p>
      </h3>

      <h2>Another State</h2>
      <h3>
        Fav Color:{" "}
        <p
          style={{
            display: "inline",
            marginLeft: "7px",
            padding: "3px 6px",
            backgroundColor: "lightyellow",
            color: "darkgreen",
            fontWeight: "bolder",
            fontSize: "1.2rem",
          }}
        >
          {favColor}
        </p>
      </h3>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button onClick={() => setFavColor("red")}>Red</button>
        <button onClick={() => setFavColor("green")}>Green</button>
      </div>

      <div style={{ textAlign: "center" }}>
        <p>Notice that calculateSquare() is getting called even when favColor is changing</p>
        <p>So we need to memoize (cache) calculateSquare()</p>
      </div>
    </div>
  );
};

export default App;
