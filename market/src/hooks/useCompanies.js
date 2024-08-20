import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useCompanies = () => {
    const { fetchData } = useAxios();
    const [ companies, setCompanies ] = useState(null); 

    const handleFetch = async () => {
        const reponse = await fetchData({
            url: "/companies",
            method: "GET",
        });

        if (reponse && !reponse.errors) {
            const _companies = reponse.data.map((company) => { 
                return {
                    "id": company.id, 
                    "name": company.name,
                }
            });

            setCompanies(_companies);
        }
    }
    
    useEffect(() => {
       handleFetch();
    }, []);
    
    return { companies };
}

export default useCompanies;