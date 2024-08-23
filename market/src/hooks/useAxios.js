import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    let controller = new AbortController();

    useEffect(() => {
        return () => controller?.abort();
    }, []);

    const axios_instance = axios.create({
        baseURL: BASE_URL,
    });

    const axiosDataPost = async ({url, formData}) => {
        setLoading(true);

        controller.abort();
        controller = new AbortController();

        try {
            const response = await axios_instance.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                signal: controller.signal
            });

            return response?.data;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request cancelled", error.message);
            } else {
                setErrors(error.response ? error.response.data : error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    const axiosDataGet = async({ url }) => {
        setLoading(true);

        controller.abort();
        controller = new AbortController();

        try {
            const response = await axios_instance.get(url, {
                headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                },
                signal: controller.signal,
            });
            
            return response?.data;

        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request cancelled", error.message);
            }else {
                setErrors(error.response ? error.response.data : error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    return {loading, errors, BASE_URL, axiosDataGet, axiosDataPost};
};

export default useAxios;


