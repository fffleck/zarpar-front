import axios from "axios";

const api = axios.create({
  baseURL: "https://zarpar-services-3a7856d27138.herokuapp.com/",
  // baseURL: "http://54.215.34.99:3333", // testes
});

export default api;
