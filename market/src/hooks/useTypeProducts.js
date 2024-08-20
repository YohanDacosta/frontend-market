import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useTypeProducts = () => {
    const { fetchData } = useAxios();
    const [ typeProducts, setTypeProducts ] = useState(null); 
    
    const handleFetch = async () => {
        const reponse = await fetchData({
            url: "/type_products",
            method: "GET"
        });

        if (reponse && !reponse.errors) {
            setTypeProducts(reponse?.data);
        }
    }
    
    useEffect(() => {
        handleFetch();
    }, []);

    return { typeProducts };
}

export default useTypeProducts;