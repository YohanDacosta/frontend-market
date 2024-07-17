import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export default function api() {
    const axios_instance = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });

    return { axios_instance };
}