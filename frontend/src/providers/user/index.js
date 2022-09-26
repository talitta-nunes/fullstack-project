import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    token: localStorage.getItem("@FST:token") || "",
    info: JSON.parse(localStorage.getItem("@FST:info")) || {},
  });

  const login = (user) => {
    api
      .post("/users/login", user)
      .then((response) => {
        toast.success("Bem vindo!");
        localStorage.setItem("@FST:token", response.data.token);
        localStorage.setItem("@FST:info", JSON.stringify(response.data.user));
        setUser({ token: response.data.token, info: response.data.user });

        navigate("/client");
      })
      .catch((err) => {
        toast.error("Email ou senha inválidos");
        console.log(err);
      });
  };

  const logout = () => {
    localStorage.clear();
    setUser({ token: "", info: "" });
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
