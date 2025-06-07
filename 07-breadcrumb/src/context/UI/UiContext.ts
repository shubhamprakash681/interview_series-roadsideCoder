import { createContext } from "react";

export interface IUIContext {
  isSmallerDisplay: boolean;
  theme: "dark" | "light";
  changeTheme?: (theme: IUIContext["theme"]) => void;
  changeIsSmallerDisplay?: (value: IUIContext["isSmallerDisplay"]) => void;
}

export const defaultValues: IUIContext = {
  isSmallerDisplay: true,
  theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
};

const UiContext = createContext<IUIContext>(defaultValues);

export default UiContext;
