import axios from "axios";

const api = axios.create({
  baseURL: "https://fullstack-project-talitta.herokuapp.com",
});

export default api;
