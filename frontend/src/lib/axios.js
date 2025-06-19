import axios from "axios";
const api = axios.create(
    {
        baseURL : "https://takenote-u53s.onrender.com/api"
    }
)
export default api;