import { useEffect, useState } from "react";
import useAxios from "./useAxios";

const useProducts = () => {
    const { data, errors, fetchData } = useAxios();
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        fetchData({
            url: `/products`,
            method: "GET"
        });
    }, []);

    useEffect(() => {
        if (data && !data.errors) {
            setProducts(data.data);
        }
    }, [data]);

    return { errors, products };
}

export default useProducts;