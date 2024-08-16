import { useParams } from "react-router-dom";
import { CompaniesContext } from "../../components/layout/Body";
import { Suspense, useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import image from "../../assets/img/not-image.jpg"
import Loading from "../../components/common/Loading";
import useProducts from "../../hooks/useProducts";

const EditProduct = () => {
    const { id } = useParams();
    const { data, fetchData } = useAxios();
    const { companies, countries } = useContext(CompaniesContext);
    const [product, setProduct] = useState({
        name: '',
        type_product: '',
        quantity: '',
        company: [],
        country: [],
        imported: false,
        caducated: false,
    })

    useEffect(() => {
        fetchData({
            url: `/product/${id}`,
            method: "GET"
        });
    }, []);

    useEffect(() => {
        if (data && !data.errors) {
            const _products = {
                name: data.data[0].name,
                type_product: data.data[0].type_product.description,
                quantity: data.data[0].quantity,
                company: data.data[0].company?.map((c) => c.id),
                country: data.data[0].country?.map((c) => c.id),
                imported: data.data[0].imported,
                caducated: data.data[0].caducated,
            }
            setProduct(_products);
        }
    }, [data]);

    const handleChange = (e) => {
        if (e.target.type == "select-multiple") {
            setProduct((preProduct) => ({ ...preProduct, [e.target.name]: e.target.checked }));
        } if (e.target.type == "select-multiple") {
            const { name, selectedOptions } = e.target;
            const values = Array.from(selectedOptions, option => parseInt(option.value, 10));

            setProduct((preProduct) => ({ ...preProduct, [name]: values }));
        } else {
            setProduct((preProduct) => ({ ...preProduct, [e.target.name]: e.target.value }));
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        < Suspense fallback={< Loading />}>
            <form action="" method="post" onSubmit={onSubmit}>
                <div className="flex flex-col bg-white rounded shadow-md mt-4">
                    <div className="flex-row">
                        <div className="mx-3 md:flex mb-6">
                            <div className="basis-1/3 md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name-product">
                                    Name
                                </label>
                                <input value={product?.name} onChange={handleChange} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" name="name" id="name-product" type="text" placeholder="Apple" />
                            </div>
                            <div className="basis-1/3 md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="type-product">
                                    Type Product
                                </label>
                                <input value={product?.type_product} onChange={handleChange} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="type_product" id="type-product" type="text" placeholder="Fruit" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="mx-3 md:flex mb-6">
                            <div className="basis-1/6 md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="company-product">
                                    Company
                                </label>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row">
                                        <select name="company" multiple value={product?.company} onChange={handleChange} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
                                            {companies && companies.length > 0 ? (
                                                companies.map((company) => (
                                                    <option key={company.id} value={company.id}>{company.name}</option>
                                                ))
                                            ) : (<option value="">Cargando...</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-1/6 md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="country-product">
                                    Country
                                </label>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row">
                                        <select name="country" multiple value={product?.country} onChange={handleChange} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
                                            {countries && countries.length > 0 ? (
                                                countries.map((c) => (
                                                    <option key={c.id} value={c.id}>{c.name}</option>
                                                ))
                                            ) : (<option value="">Cargando...</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mx-3 md:flex mb-6">
                                <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="imported-product">
                                        Imported
                                    </label>
                                    <input checked={product?.imported} onChange={handleChange} className="h-6 w-6 cursor-pointer" name="imported" id="imported-product" type="checkbox" />
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="caducated-product">
                                        Caducated
                                    </label>
                                    <input checked={product?.caducated} onChange={handleChange} className="h-6 w-6 cursor-pointer" name="caducated" id="caducated-product" type="checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="quantity-product">
                            Quantity
                        </label>
                        <input value={product?.quantity} onChange={handleChange} className="appearance-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="quantity" id="quantity-product" type="number" min="0" placeholder="10000" />
                    </div>
                    <div className="mt-4">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold" htmlFor="image-product">
                                Photo
                            </label>
                            <input className="h-40 w-44 border border-grey-lighter rounded-md py-3 px-4 m-2" id="image-product" type="image" name="photo" src={image} alt="Not Image" />
                        </div>
                    </div>
                    <div className="flex m-4">
                        <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" onSubmit={onSubmit}>
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </Suspense>
    )
}

export default EditProduct;