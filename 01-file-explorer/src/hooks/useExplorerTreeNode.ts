import type { ExplorerItem } from "../data/explorerData";

const useExplorerTreeNode = (
  explorerData: ExplorerItem,
  setExplorerData: React.Dispatch<React.SetStateAction<ExplorerItem>>
) => {
  const insertItem = (itemToInsert: ExplorerItem, parentId: string) => {
    const newExplorerData = JSON.parse(JSON.stringify(explorerData));

    const dfsInsert = (rootFolder: ExplorerItem) => {
      if (rootFolder.id === parentId) {
        rootFolder.items.unshift(itemToInsert);

        setExplorerData(newExplorerData);
        return;
      }

      rootFolder.items.forEach((folder) => {
        if (folder.isFolder) {
          dfsInsert(folder);
        }
      });
    };

    dfsInsert(newExplorerData);
  };

  const deleteItem = (itemId: string) => {
    if (explorerData.id === itemId) {
      alert("Cannot delete root folder");
      return;
    }

    const newExplorerData = JSON.parse(JSON.stringify(explorerData));

    const dfsDelete = (rootFolder: ExplorerItem) => {
      const foundAt = rootFolder.items.findIndex((rootItem) => rootItem.id === itemId);

      if (foundAt > -1) {
        rootFolder.items = rootFolder.items.filter((item) => item.id !== itemId);

        setExplorerData(newExplorerData);
        return;
      }

      rootFolder.items.forEach((folder) => {
        if (folder.isFolder) {
          dfsDelete(folder);
        }
      });
    };

    dfsDelete(newExplorerData);
  };

  const renameItem = (updatedName: string, itemId: string) => {
    const newExplorerData = JSON.parse(JSON.stringify(explorerData));

    const dfsSearchAndUpdate = (rootFolder: ExplorerItem) => {
      if (rootFolder.id === itemId) {
        rootFolder.name = updatedName;

        setExplorerData(newExplorerData);
        return;
      }

      rootFolder.items.forEach((folder) => {
        dfsSearchAndUpdate(folder);
      });
    };

    dfsSearchAndUpdate(newExplorerData);
  };

  return { insertItem, deleteItem, renameItem };
};

export default useExplorerTreeNode;
