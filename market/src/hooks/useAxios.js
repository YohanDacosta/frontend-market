import { useState, useEffect } from "react";
import api from "../services/api";
import axios from "axios";

const useAxios = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState("");

    const { axios_instance } = api();

    let controller = new AbortController();

    useEffect(() => {
        return () => controller?.abort();
    }, []);

    const fetchData = async({
        url, 
        method, 
        data = {}, 
        params = {},
    }) => {
        setLoading(true);

        controller.abort();
        controller = new AbortController();

        try {
            const response = await axios_instance({
                url,
                method,
                data,
                params,
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

    return {loading, errors, fetchData};
};

export default useAxios;


