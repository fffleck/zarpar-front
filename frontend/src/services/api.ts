import axios from "axios";

const api = axios.create({
  // baseURL: "https://karavel-api-1226bbda6c0b.herokuapp.com",
  baseURL: "http://184.72.22.149:3333", // testes
});

export default api;
