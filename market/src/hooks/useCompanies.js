import { useEffect, useState } from "react";
import {useAxios} from "../hooks";

const useCompanies = () => {
    const { axiosDataGet } = useAxios();
    const [ companies, setCompanies ] = useState(null); 

    const handleFetch = async () => {
        const reponse = await axiosDataGet({
            url: "/companies",
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