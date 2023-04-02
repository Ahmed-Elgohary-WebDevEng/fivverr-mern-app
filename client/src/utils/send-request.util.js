import axios from "axios";

const sendRequest = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
})

export default sendRequest