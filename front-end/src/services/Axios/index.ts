// import "dotenv/config";
import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.BACK_URL || "http://localhost:3001/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
