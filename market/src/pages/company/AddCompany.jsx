import { CompaniesContext } from "../../components/layout/Body";
import { Suspense, useContext, useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useHelpers from "../../hooks/useHelpers";
import Loading from "../../components/common/Loading";

const initialStateCountry = {
    id: '',
    type: 1,
    cif: '',
    name: '',
    country: 1,
}

const AddCompany = () => {
    const { errors, axiosDataPost } = useAxios();
    const [company, setCompany] = useState(initialStateCountry);
    const [data, setData] = useState(null);
    const { countries } = useContext(CompaniesContext);
    const { showToats } = useHelpers();

    useEffect(() => {
        if (errors) {
            showToats(errors);
        }

        if (data) {
            showToats(data, "/company/all");
        }
    }, [errors, data]);

    const handleFetchAdd = async () => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(company));

        try {
            const response = await axiosDataPost({
                url: "/company/add",
                formData,
            });

            setData(response);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleChange = (ev) => {
        setCompany((preCompany) => ({ ...preCompany, [ev.target.name]: ev.target.value }));
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        handleFetchAdd();
    }

    return (
        < Suspense fallback={< Loading />}>
            <form action="" method="post" onSubmit={onSubmit}>
                <div className="flex flex-col bg-white rounded shadow-md mt-4">
                    <div className="flex-row">
                        <div className="mx-3 md:flex mb-6">
                            <div className="basis-1/3 md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input value={company?.name} onChange={handleChange} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" name="name" id="name" type="text" placeholder="Manor" />
                            </div>
                            <div className="basis-1/3 md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="cif">
                                    Cif
                                </label>
                                <input maxLength={9} value={company?.cif} onChange={handleChange} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" name="cif" id="cif" type="text" placeholder="XXXXXXXXX" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-row">
                        <div className="mx-3 md:flex mb-6">
                            <div className="basis-1/6 md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="type">
                                    Type
                                </label>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row">
                                        <select name="type" value={company?.type} onChange={handleChange} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
                                            <option value={1}>Nacional</option>
                                            <option value={2}>Internacional</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-1/6 md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="country">
                                    Country
                                </label>
                                <div className="flex-1">
                                    <div className="flex flex-col md:flex-row">
                                        <select name="country" value={company?.country} onChange={handleChange} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
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
                    </div>
                    <div className="flex m-4">
                        <button className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" type="submit">Add</button>
                    </div>
                </div>
            </form>
        </Suspense>
    )
}

export default AddCompany;