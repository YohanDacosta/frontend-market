import { useState, useEffect } from "react";
import api from "../services/api";
import axios from "axios";

const useAxios = () => {
    const [ data, setData ] = useState(null);
    const [ errors, setErrors ] = useState("");
    const [ loading, setLoading ] = useState(false);
    
    const { axios_instance } = api();

    let controller = new AbortController();

    useEffect(() => {
        return () => controller?.abort();
    }, []);

    const fetchData = async({url, method, data = {}, params = {}}) => {
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
            setData(response.data);   
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

    return {data, errors, loading, fetchData};
};

export default useAxios;


