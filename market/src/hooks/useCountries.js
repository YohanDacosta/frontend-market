import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useCountries = () => {
    const { data, fetchData } = useAxios();
    const [ countries, setCountries ] = useState(null); 
    
    useEffect(() => {
        fetchData({
            url: "/countries",
            method: "GET"
        });
    }, []);

    useEffect(() => {
        if (data && !data.errors) {
            const _countries = data.data.map((country) => { 
                return {
                    "id": country.id, 
                    "name": country.name,
                }
            });

            setCountries(_countries);
        }
    }, [data]);

    return { countries };
}

export default useCountries;