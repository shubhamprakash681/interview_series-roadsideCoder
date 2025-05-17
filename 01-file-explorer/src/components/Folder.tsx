import React, { useState } from "react";
import type { ExplorerItem } from "../data/explorerData";
import { AiOutlineFileAdd } from "react-icons/ai";
import { TiFolderAdd } from "react-icons/ti";
import useExplorerTreeNode from "../hooks/useExplorerTreeNode";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

interface FolderProps extends React.HTMLProps<HTMLDivElement> {
  folderData: ExplorerItem;
  explorerData: ExplorerItem;
  setExplorerData: React.Dispatch<React.SetStateAction<ExplorerItem>>;
}

type ItemInput = {
  isOpen: boolean;
  type: "folder" | "file" | null;
  value: string;
};

type RenameInput = {
  isOpen: boolean;
  value: string;
};

const Folder: React.FC<FolderProps> = ({ folderData, explorerData, setExplorerData, ...props }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [renameInput, setRenameInput] = useState<RenameInput>({
    isOpen: false,
    value: folderData.name,
  });
  const [itemInput, setItemInput] = useState<ItemInput>({
    isOpen: false,
    type: null,
    value: "",
  });

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  const { deleteItem, insertItem, renameItem } = useExplorerTreeNode(explorerData, setExplorerData);

  const onAddFolderClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setIsExpanded(true);
    setItemInput({
      isOpen: true,
      type: "folder",
      value: "",
    });
  };

  const onAddFileClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setIsExpanded(true);
    setItemInput({
      isOpen: true,
      type: "file",
      value: "",
    });
  };

  const onRenameItemClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setRenameInput({ ...renameInput, isOpen: true });
  };

  const onDeleteClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();

    setOpenDeleteModal(true);
  };

  const onDeleteConfirm: React.MouseEventHandler<HTMLButtonElement> = () => {
    deleteItem(folderData.id);
    setOpenDeleteModal(false);
  };

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setItemInput({ ...itemInput, value: e.target.value });
  };
  const onRenameInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setRenameInput({ ...renameInput, value: e.target.value });
  };

  const onInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setItemInput({
      isOpen: false,
      type: null,
      value: "",
    });
  };
  const onRenameInputBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    setRenameInput({
      isOpen: false,
      value: folderData.name,
    });
  };

  const onAddItemKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.code === "Enter") {
      e.stopPropagation();

      insertItem(
        {
          id: crypto.randomUUID(),
          name: itemInput.value,
          isFolder: itemInput.type === "folder",
          items: [],
        },
        folderData.id
      );

      setItemInput({
        isOpen: false,
        type: null,
        value: "",
      });
    }
  };
  const onRenmeItemKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" || e.code === "Enter") {
      e.stopPropagation();

      renameItem(renameInput.value, folderData.id);

      setRenameInput({
        ...renameInput,
        isOpen: false,
      });
    }
  };

  if (folderData.isFolder) {
    return (
      <>
        <div {...props}>
          <div className="folder" onClick={() => setIsExpanded(!isExpanded)}>
            <div>
              {isExpanded ? "📂 " : "📁 "}
              {renameInput.isOpen ? (
                <input
                  autoFocus
                  type="text"
                  value={renameInput.value}
                  onChange={onRenameInputChange}
                  onBlur={onRenameInputBlur}
                  onKeyDown={onRenmeItemKeyDown}
                />
              ) : (
                <span>{folderData.name}</span>
              )}
            </div>

            <div className="folder-btn-container">
              <button onClick={onAddFileClick}>
                <AiOutlineFileAdd />
              </button>
              <button onClick={onAddFolderClick}>
                <TiFolderAdd />
              </button>
              <button onClick={onRenameItemClick}>
                <MdOutlineEdit />
              </button>
              <button onClick={onDeleteClick}>
                <MdOutlineDelete />
              </button>
            </div>
          </div>

          {itemInput.isOpen && (
            <div className="input-wrapper">
              <input
                autoFocus
                type="text"
                onChange={onInputChange}
                value={itemInput.value}
                onKeyDown={onAddItemKeyDown}
                onBlur={onInputBlur}
              />
            </div>
          )}

          {isExpanded &&
            (folderData.items.length
              ? folderData.items.map((folderItem) => (
                  <Folder
                    folderData={folderItem}
                    explorerData={explorerData}
                    setExplorerData={setExplorerData}
                    style={{ marginLeft: "20px" }}
                    key={folderItem.id}
                  />
                ))
              : null)}
        </div>

        <DeleteModal isOpen={openDeleteModal} setIsOpen={setOpenDeleteModal} onDeleteConfirm={onDeleteConfirm} />
      </>
    );
  }

  return (
    <>
      <div className="file" {...props}>
        <span>
          {"📄 "}
          {renameInput.isOpen ? (
            <input
              autoFocus
              type="text"
              value={renameInput.value}
              onChange={onRenameInputChange}
              onBlur={onRenameInputBlur}
              onKeyDown={onRenmeItemKeyDown}
            />
          ) : (
            <span>{folderData.name}</span>
          )}
        </span>

        <div className="folder-btn-container">
          <button onClick={onRenameItemClick}>
            <MdOutlineEdit />
          </button>
          <button onClick={onDeleteClick}>
            <MdOutlineDelete />
          </button>
        </div>
      </div>

      <DeleteModal isOpen={openDeleteModal} setIsOpen={setOpenDeleteModal} onDeleteConfirm={onDeleteConfirm} />
    </>
  );
};

interface DeleteModalProps extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDeleteConfirm: React.MouseEventHandler<HTMLButtonElement>;
}
const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, setIsOpen, onDeleteConfirm }) => {
  return (
    <div className={isOpen ? "delete-modal-open" : "delete-modal-closed"}>
      <div className="delete-modal-content">
        <h3>Are you sure you want to delete this item?</h3>

        <div className="delete-modal-btn-container">
          <button onClick={() => setIsOpen(false)}>Cancel</button>
          <button className="delete-confirm-btn" onClick={onDeleteConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Folder;
