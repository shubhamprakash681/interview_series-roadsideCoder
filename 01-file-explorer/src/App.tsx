import React, { useCallback, useState } from "react";
import { initialEplorerData, type ExplorerItem } from "./data/explorerData";
import Folder from "./components/Folder";

const App: React.FC = () => {
  const [explorerData, setExplorerData] = useState<ExplorerItem>(initialEplorerData);

  const [sidebarWidth, setSidebarWidth] = useState<number>(30);
  const [isSidebarResizing, setIsSidebarResizing] = useState<boolean>(false);

  const sidebarResizeHandler: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (isSidebarResizing) {
        setSidebarWidth((e.clientX / window.innerWidth) * 100);
      }
    },
    [window.innerWidth, isSidebarResizing]
  );

  return (
    <div className="app-container" onMouseMove={sidebarResizeHandler} onMouseUp={() => setIsSidebarResizing(false)}>
      <div className="sidebar-panel-wrapper" style={{ width: `${sidebarWidth}%` }}>
        <div className="sidebar-panel">
          <Folder
            folderData={explorerData}
            explorerData={explorerData}
            setExplorerData={setExplorerData}
            key={explorerData.id}
          />
        </div>

        <div id="sidebar-resizer" onMouseDown={() => setIsSidebarResizing(true)} />
      </div>
    </div>
  );
};

export default App;
