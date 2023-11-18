import { createContext, useContext, useEffect, useState } from "react";
import {
  registerRequest,
  LoginRequest,
  verifyTokenReques,
  LoginoutRequest,
} from "../api/auth";

import Cookies from "universal-cookie";

export const authContext = createContext();
const cookies = new Cookies();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    throw new error("UseAuth must be used in an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [error, setErros] = useState("");
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data.token);
      cookies.set("token", login.data.token);
      setUser(res.data.newUser);
      setIsAuth(true);
    } catch (error) {
      setErros(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const login = await LoginRequest(user);
      console.log(login.data.token);
      cookies.set("token", login.data.token);
      setUser(login.data.logedUserInfo);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
      setErros(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const signout = async () => {
    try {
      const res = await LoginoutRequest();
      console.log(res);
      cookies.remove("token");
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setErros("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    async function checkLogin() {
      let token = cookies.get("token");

      if (!token) {
        setIsAuth(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenReques(token);

        if (!res.data) {
          setIsAuth(false);
          setLoading(false);
        }

        setUser(res.data);
        setIsAuth(true);
        setLoading(false);
      } catch (error) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
        console.log(error);
      }
    }
    checkLogin();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        signin,
        signout,
        user,
        isAuth,
        error,
        loading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
