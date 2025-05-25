import { useState } from "react";

type GridCellProps = {
  isActive: boolean;
  disableInput: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const GridCell: React.FC<GridCellProps> = ({ isActive, disableInput, onClick }) => {
  return <button disabled={disableInput} className={`cell ${isActive && "active"}`} onClick={onClick} />;
};

const App = () => {
  const config = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const [disableInput, setDisableInput] = useState<boolean>(false);
  const [clickOrder, setClickOrder] = useState<number[]>([]);

  const activateCell = (cellIndex: number) => {
    const newClickOrder = Array.from(new Set(clickOrder.concat(cellIndex)));
    setClickOrder(newClickOrder);

    if (newClickOrder.length === config.flat().filter((cell) => cell === 1).length) {
      deactivateCells();
    }
  };

  const deactivateCells = () => {
    setDisableInput(true);

    const interval = setInterval(() => {
      setClickOrder((prevOrder) => {
        if (prevOrder.length === 0) {
          setDisableInput(false);
          clearInterval(interval);
          return [];
        }

        const newOrder = [...prevOrder];
        newOrder.pop();
        return newOrder;
      });
    }, 100);

    return () => clearInterval(interval);
  };

  return (
    <div className="app-container">
      <h1 className="text-center">Grid Game</h1>

      <div className="grid-container">
        {config.flat().map((cell, flatenIndex) => (
          <div key={`grid-cell-item-${flatenIndex}`} style={{ width: "100%" }}>
            {cell === 1 && (
              <GridCell
                isActive={clickOrder.includes(flatenIndex)}
                onClick={() => activateCell(flatenIndex)}
                disableInput={disableInput}
              />
            )}
          </div>
        ))}
      </div>

      <div className="text-center">
        <p>Welcome to Grid Game!</p>
        <p>Click on eachh grid to activate them</p>
        <p>Grids will be deactivated in reverse order once all Grids are acive</p>
      </div>
    </div>
  );
};

export default App;
