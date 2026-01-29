import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_KEY;

const mainApi = axios.create({
  baseURL: `${BASE_URL}`,
  withCredentials: true,
});

export default mainApi;
