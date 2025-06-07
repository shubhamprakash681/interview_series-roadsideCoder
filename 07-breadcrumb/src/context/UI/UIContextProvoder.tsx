import React, { useState } from "react";
import UiContext, { defaultValues, type IUIContext } from "./UiContext";

interface UIContextProviderProps {
  children: React.ReactNode;
}

const UIContextProvider: React.FC<UIContextProviderProps> = ({ children }) => {
  const [isSmallerDisplay, setIsSmallerDisplay] = useState<IUIContext["isSmallerDisplay"]>(
    defaultValues.isSmallerDisplay
  );
  const [theme, setTheme] = useState<IUIContext["theme"]>(defaultValues.theme);

  const changeTheme = (theme: IUIContext["theme"]) => {
    setTheme(theme);
  };
  const changeIsSmallerDisplay = (value: IUIContext["isSmallerDisplay"]) => {
    setIsSmallerDisplay(value);
  };

  return (
    <UiContext.Provider
      value={{
        isSmallerDisplay,
        theme,
        changeTheme,
        changeIsSmallerDisplay,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export default UIContextProvider;
