// import "dotenv/config";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
