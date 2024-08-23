import { useParams } from "react-router-dom";
import { CompaniesContext } from "../../components/layout/Body";
import { Suspense, useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/common/Loading";
import useTypeProducts from "../../hooks/useTypeProducts";
import CustomDropzone from "../../components/common/CustomDropzone";

const ViewProduct = () => {
    const { id } = useParams();
    const { axiosDataGet } = useAxios();
    const { typeProducts } = useTypeProducts();
    const { companies, countries } = useContext(CompaniesContext);
    const [product, setProduct] = useState();



    const handleFetch = async () => {
        const reponse = await axiosDataGet({
            url: `/product/${id}`,
        });

        if (reponse && !reponse.errors) {
            const _products = {
                id: reponse.data[0].id,
                name: reponse.data[0].name,
                type_product: reponse.data[0].type_product.id,
                quantity: reponse.data[0].quantity,
                company: reponse.data[0].company?.map((c) => c.id),
                country: reponse.data[0].country?.map((c) => c.id),
                imported: Number(reponse.data[0].imported),
                caducated: Number(reponse.data[0].caducated),
                photo: reponse.data[0].photo ?? null,
            }

            setProduct(_products);
        }
    }

    useEffect(() => {
        handleFetch();
    }, []);

    return (
        < Suspense fallback={< Loading />}>
            <form>
                <div className="flex flex-col bg-white rounded shadow-md mt-4">
                    <div className="flex-row">
                        <div className="mx-3 md:flex mb-6">
                            <div className="basis-1/3 md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name-product">
                                    Name
                                </label>
                                <input readOnly value={product?.name ?? ''} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" name="name" id="name-product" type="text" placeholder="Apple" />
                            </div>
                            <div className="basis-1/3 md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="type-product">
                                    Type Product
                                </label>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row">
                                        <select disabled name="type_product" value={product?.type_product} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
                                            {typeProducts && typeProducts.length > 0 ? (
                                                typeProducts.map((type_product) => (
                                                    <option key={type_product.id} value={type_product.id}>{type_product.description}</option>
                                                ))
                                            ) : (<option value="">Cargando...</option>)}
                                        </select>
                                    </div>
                                </div>
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
                                        <select disabled name="company" multiple value={product?.company} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
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
                                        <select disabled name="country" multiple value={product?.country} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
                                            {countries && countries.length > 0 ? (
                                                countries.map((c) => (
                                                    <option key={c.id} value={c.id ?? ''}>{c.name}</option>
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
                                    <input readOnly checked={product?.imported ?? ''} className="h-6 w-6 cursor-pointer" name="imported" id="imported-product" type="checkbox" />
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="caducated-product">
                                        Caducated
                                    </label>
                                    <input readOnly checked={product?.caducated ?? ''} className="h-6 w-6 cursor-pointer" name="caducated" id="caducated-product" type="checkbox" />
                                </div>
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="quantity-product">
                                        Quantity
                                    </label>
                                    <input readOnly value={product?.quantity ?? ''} className="appearance-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="quantity" id="quantity-product" type="number" min="0" placeholder="10000" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 mb-4">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <CustomDropzone image={product?.photo} fnc={() => { }} disabled={true} />
                        </div>
                    </div>
                </div>
            </form>
        </Suspense>
    )
}

export default ViewProduct;