import axios from "axios";

const api = axios.create({
  baseURL: "http://3.129.16.6:3334", // testes
  // baseURL: "http://localhost:3334", // testes
});

export default api;
