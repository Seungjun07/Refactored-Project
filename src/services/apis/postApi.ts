import axios from "axios";

const postApi = axios.create({
  baseURL: "https://nova-platform.kr/",
  withCredentials: true,
});

export default postApi;
