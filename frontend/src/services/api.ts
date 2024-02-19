import axios from "axios";

const api = axios.create({
  // baseURL: "https://zarpar-services-3a7856d27138.herokuapp.com/",
  baseURL: "http://localhost:3334", // testes
});

export default api;
