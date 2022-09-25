import { Routes, Route } from "react-router-dom";
import Client from "../pages/client";
import Home from "../pages/home";
import Login from "../pages/login";
import Signup from "../pages/register";

const Rotas = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/client/*" element={<Client />} />
      <Route path="/register/*" element={<Signup />} />
      <Route path="/login/*" element={<Login />} />
    </Routes>
  );
};
export default Rotas;
