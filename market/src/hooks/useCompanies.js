import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useCompanies = () => {
    const { data, fetchData } = useAxios();
    const [ companies, setCompanies ] = useState(null); 
    
    useEffect(() => {
        fetchData({
            url: "/companies",
            method: "GET"
        });
    }, []);

    useEffect(() => {
        if (data && !data.errors) {
            const _companies = data.data.map((company) => { 
                return {
                    "id": company.id, 
                    "name": company.name,
                }
            });

            setCompanies(_companies);
        }
    }, [data]);

    return { companies };
}

export default useCompanies;