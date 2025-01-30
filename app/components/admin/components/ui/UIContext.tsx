
"use client";
import React, { FC, ReactNode, useCallback, useMemo } from "react";
import { ThemeProvider } from "next-themes";

export interface State {
  displayModal: boolean;
  displayLeftSidebar: boolean;
  displayRightSidebar: boolean;
  modalView: UI_VIEWS;
  dropDownView: string;
}

const initialState: State = {
  displayModal: false,
  displayLeftSidebar: false,
  displayRightSidebar: false,
  modalView: "LOGIN_VIEW",
  dropDownView: "",
};

type Action =
  | { type: "OPEN_MODAL" }
  | { type: "CLOSE_MODAL" }
  | { type: "SET_MODAL_VIEW"; view: UI_VIEWS }
  | { type: "SET_DROPDOWN_VIEW"; view: string }
  | { type: "OPEN_LEFT_SIDEBAR" }
  | { type: "CLOSE_LEFT_SIDEBAR" }
  | { type: "OPEN_RIGHT_SIDEBAR" }
  | { type: "CLOSE_RIGHT_SIDEBAR" };

type UI_VIEWS = "SIGNUP_VIEW" | "LOGIN_VIEW" | "FORGOT_VIEW" | "RESET_VIEW" | "DROPDOWN_VIEW";

export const UIContext = React.createContext<State | any>(initialState);
UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action): State {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, displayModal: true };
    case "CLOSE_MODAL":
      return { ...state, displayModal: false };
    case "SET_MODAL_VIEW":
      return { ...state, modalView: action.view };
    case "SET_DROPDOWN_VIEW":
      return { ...state, dropDownView: action.view };
    case "OPEN_LEFT_SIDEBAR":
      return { ...state, displayLeftSidebar: true, displayRightSidebar: false };
    case "CLOSE_LEFT_SIDEBAR":
      return { ...state, displayLeftSidebar: false };
    case "OPEN_RIGHT_SIDEBAR":
      return { ...state, displayRightSidebar: true, displayLeftSidebar: false };
    case "CLOSE_RIGHT_SIDEBAR":
      return { ...state, displayRightSidebar: false };
    default:
      return state;
  }
}

export const UIProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openModal = useCallback(() => dispatch({ type: "OPEN_MODAL" }), []);
  const closeModal = useCallback(() => dispatch({ type: "CLOSE_MODAL" }), []);
  const setModalView = useCallback((view: UI_VIEWS) => dispatch({ type: "SET_MODAL_VIEW", view }), []);
  const setDropDownView = useCallback((view: string) => dispatch({ type: "SET_DROPDOWN_VIEW", view }), []);

  const openLeftSidebar = useCallback(() => dispatch({ type: "OPEN_LEFT_SIDEBAR" }), []);
  const closeLeftSidebar = useCallback(() => dispatch({ type: "CLOSE_LEFT_SIDEBAR" }), []);
  const openRightSidebar = useCallback(() => dispatch({ type: "OPEN_RIGHT_SIDEBAR" }), []);
  const closeRightSidebar = useCallback(() => dispatch({ type: "CLOSE_RIGHT_SIDEBAR" }), []);

  const value = useMemo(
    () => ({
      ...state,
      openModal,
      closeModal,
      setModalView,
      setDropDownView,
      openLeftSidebar,
      closeLeftSidebar,
      openRightSidebar,
      closeRightSidebar,
    }),
    [state]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
};

export const ManagedUIContext: FC<{ children?: ReactNode }> = ({ children }) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
);
