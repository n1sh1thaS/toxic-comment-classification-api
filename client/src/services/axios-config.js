import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/";
const token = localStorage.getItem("token");
if (token) axios.defaults.headers.common["JWT"] = token;
export default axios;
