import Axios from "axios";


const baseURL = "http://localhost:3000/api";
const axios = Axios.create({
    baseURL,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true,
    withXSRFToken: true
})

export default axios;