import { useEffect, useState } from "react";
import { useAxios, useHelpers, useCompanies, useCountries, useTypeProducts } from "../../hooks";
import CustomDropzone from "../../components/common/CustomDropzone";

const AddProduct = () => {
    const { errors, axiosDataPost } = useAxios();
    const { typeProducts } = useTypeProducts();
    const { showToats } = useHelpers();
    const { companies } = useCompanies();
    const { countries } = useCountries();
    const [data, setData] = useState(null);
    const [file, setFile] = useState(null);
    const [product, setProduct] = useState({
        name: "",
        type_product: 1,
        quantity: 0,
        company: [],
        country: [],
        imported: 0,
        caducated: 0,
    })

    const handleChange = (ev) => {
        switch (ev.target.type) {
            case "select-multiple":
                const { name, selectedOptions } = ev.target;
                const values = Array.from(selectedOptions, option => parseInt(option.value, 10));
                setProduct((preProduct) => ({ ...preProduct, [name]: values }));
                break;
            case "checkbox":
                setProduct((preProduct) => ({ ...preProduct, [ev.target.name]: Number(ev.target.checked) }));
                break;
            default:
                setProduct((preProduct) => ({ ...preProduct, [ev.target.name]: ev.target.value }));
                break;
        }
    }

    const handleFetchAdd = async () => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(product));

        if (file && file?.length !== 0) {
            formData.append("file", file);
        }

        try {
            const response = await axiosDataPost({
                url: "/product/add",
                formData
            });

            setData(response);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        handleFetchAdd();
    }

    useEffect(() => {

        if (errors) {
            showToats(errors);
        }

        if (data) {
            showToats(data, "/product/all");
        }

    }, [errors, data]);

    return (
        <>
            <div className='flex flex-row-reverse mt-4 mb-4'>
                <div className='text-2xl mr-4 text-center font-bold'>Add Products</div>
            </div>
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
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row">
                                        <select name="type_product" value={product?.type_product} onChange={handleChange} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
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
                                        <select name="company" multiple value={product?.company} onChange={handleChange} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
                                            {companies && companies.length > 0 ? (
                                                companies.map((company) => (
                                                    <option className="m-1 p-1 border-b-2 rounded font-light" key={company.id} value={company.id}>{company.name}</option>
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
                                                    <option className="m-1 p-1 border-b-2 rounded font-light" key={c.id} value={c.id}>{c.name}</option>
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
                                <div className="md:w-1/2 px-3">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="quantity-product">
                                        Quantity
                                    </label>
                                    <input value={product?.quantity} onChange={handleChange} className="appearance-none block bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" name="quantity" id="quantity-product" type="number" min="0" placeholder="10000" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <CustomDropzone file={file} fnc={setFile} />
                        </div>
                    </div>
                    <div className="flex m-4">
                        <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" onSubmit={onSubmit}>
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddProduct;