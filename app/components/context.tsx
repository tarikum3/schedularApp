"use client";
import React, { FC, ReactNode, useCallback, useMemo } from "react";
import { ThemeProvider } from "next-themes";

export interface State {
  displayModal: boolean;

  modalView: string;
  dropDownView: string;
}

const initialState = {
  displayModal: false,
  modalView: "LOGIN_VIEW",
  dropDownView: "",
};

type Action =
  | {
      type: "OPEN_MODAL";
    }
  | {
      type: "CLOSE_MODAL";
    }
  | {
      type: "SET_MODAL_VIEW";
      view: UI_VIEWS;
    }
  | {
      type: "SET_DROPDOWN_VIEW";
      view: string;
    };
type UI_VIEWS =
  | "SIGNUP_VIEW"
  | "LOGIN_VIEW"
  | "FORGOT_VIEW"
  | "RESET_VIEW"
  | "DROPDOWN_VIEW";

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = "UIContext";

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case "OPEN_MODAL": {
      return {
        ...state,
        displayModal: true,
        displaySidebar: false,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        displayModal: false,
      };
    }
    case "SET_MODAL_VIEW": {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case "SET_DROPDOWN_VIEW": {
      return {
        ...state,
        dropDownView: action.view,
      };
    }
  }
}

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openModal = useCallback(
    () => dispatch({ type: "OPEN_MODAL" }),
    [dispatch]
  );
  const closeModal = useCallback(
    () => dispatch({ type: "CLOSE_MODAL" }),
    [dispatch]
  );

  const setModalView = useCallback(
    (view: UI_VIEWS) => dispatch({ type: "SET_MODAL_VIEW", view }),
    [dispatch]
  );
  const setDropDownView = useCallback(
    (view: string) => dispatch({ type: "SET_DROPDOWN_VIEW", view }),
    [dispatch]
  );
  const value = useMemo(
    () => ({
      ...state,

      openModal,
      closeModal,
      setModalView,
      setDropDownView,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: FC<{ children?: ReactNode }> = ({
  children,
}) => (
  <UIProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </UIProvider>
);
