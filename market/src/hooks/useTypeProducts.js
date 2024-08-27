import { useEffect, useState } from "react";
import {useAxios} from "../hooks";

const useTypeProducts = () => {
    const { axiosDataGet } = useAxios();
    const [ typeProducts, setTypeProducts ] = useState(null); 
    
    const handleFetch = async () => {
        const reponse = await axiosDataGet({
            url: "/type_products"
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