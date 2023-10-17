import { createContext } from "react";

const AuthContext = createContext({
  user: null,
  userData: null,
  setContext() {},
});

export default AuthContext;
