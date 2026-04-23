import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-app-dl5r.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;