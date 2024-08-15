import axios from "axios";

const BASE_URL = "/api";

export const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});
