import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const token = localStorage.getItem("token");

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
