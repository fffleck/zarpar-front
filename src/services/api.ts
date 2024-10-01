import axios from "axios";

const api = axios.create({
  baseURL: "http://18.222.233.16:3334", // testes
  // baseURL: "http://localhost:3334", // testes
});

export default api;
