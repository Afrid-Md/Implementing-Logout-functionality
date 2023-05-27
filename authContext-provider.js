import React, { useState } from "react";
import AuthContext from "./auth-context";

const AuthContextProvider=(props)=> {
  const initialToken=localStorage.getItem('token');
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logInHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);

    setTimeout(()=>{
      localStorage.clear();
      authcontext.logout();
    },500000);
  };

  const logOutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
  };


  const authcontext = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: logInHandler,
    logout: logOutHandler,
  };

  return (
    <AuthContext.Provider value={authcontext}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
