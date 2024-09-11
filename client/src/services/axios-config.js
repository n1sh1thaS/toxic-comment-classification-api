import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/";
const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["Authorization"] = `JWT ${token}`;
export default axios;
