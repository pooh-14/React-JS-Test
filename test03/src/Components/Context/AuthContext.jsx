import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const initialState = { user: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function Login(userData) {
    dispatch({
      type: "LOGIN",
      payload: userData,
    });
  }

  function Logout() {
    localStorage.removeItem("Current-user")
    dispatch({
      type: "LOGOUT",
    });
  }

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("Current-user"));
    if (userData) {
      dispatch({
        type: "LOGIN",
        payload: userData,
      });
    }
  });

  return (
    <AuthContext.Provider value={{ state, Login, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};




