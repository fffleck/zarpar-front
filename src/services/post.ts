import axios from "axios";

const post = axios.create({
  baseURL: "https://zarpar-services-3a7856d27138.herokuapp.com/",
  // baseURL: "http://localhost:3334", // testes
  headers: {
    'Content-Type': 'multipart/form-data',
  }
});

export default post;
