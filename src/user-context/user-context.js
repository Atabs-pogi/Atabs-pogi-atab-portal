import React, { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

const UserContext = createContext();

const initialState = {
  info: {
    id: null,
    firstName: "",
    lastName: "",
    role: "",
  },
};

function userReducer(state, { action, payload }) {
  const newState = { ...(state || initialState) };
  switch (action) {
    case "Login":
      newState.info = payload;
      break;
    case "Logout":
      newState.info = null;
      break;
    default:
  }
  return newState;
}

function createDispatchService(dispatch) {
  return {
    login: (user) =>
      dispatch({
        action: "Login",
        payload: user,
      }),
    logout: () =>
      dispatch({
        action: "Logout",
      }),
  };
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);
  const value = useMemo(() => [state, createDispatchService(dispatch)], [state, dispatch]);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext should be used inside UserProvider");
  }
  return context;
}

export { UserProvider, useUserContext };

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
