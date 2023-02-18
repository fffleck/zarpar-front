import axios from "axios";

const api = axios.create({
    //baseURL: "https://karavel-api.herokuapp.com"
    baseURL: "http://localhost:3333" // testes
})

export default api;