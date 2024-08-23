import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useCountries = () => {
    const { axiosDataGet } = useAxios();
    const [ countries, setCountries ] = useState(null); 
    
    const handleFetch = async () => {
        const reponse = await axiosDataGet({
            url: "/countries",
        });

        if (reponse && !reponse.errors) {
            const _countries = reponse.data.map((country) => { 
                return {
                    "id": country.id, 
                    "name": country.name,
                }
            });

            setCountries(_countries);
        }
    }
    
    useEffect(() => {
        handleFetch();
    }, []);

    return { countries };
}

export default useCountries;