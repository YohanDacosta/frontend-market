import { useState, useEffect } from "react";
import api from "../services/api";

const useAxios = () => {
    const [ data, setData ] = useState(null);
    const [ error, setError ] = useState("");
    const [ loading, setLoading ] = useState(false);

    const { axios_instance } = api();

    const fetchData = async({url, method, data = {}, params = {}}) => {
        setLoading(true);

        try {
            const response = await axios_instance({
                url,
                method,
                data,
                params,
            });
            setData(response.data);   
        } catch (error) {
            setError(error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    }

    return {data, error, loading, fetchData};
};

export default useAxios;


