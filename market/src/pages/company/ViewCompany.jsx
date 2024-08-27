import { useParams } from 'react-router-dom';
import { CompaniesContext } from '../../components/layout/Body';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import Loading from '../../components/common/Loading';

const ViewCompany = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const { axiosDataGet } = useAxios();
    const { countries } = useContext(CompaniesContext);

    useEffect(() => {
        handleFetchData();
    }, []);

    const handleFetchData = async () => {
        const response = await axiosDataGet({
            url: `/company/${id}`
        });

        if (response && !response?.errors) {
            setCompany(response.data[0]);
        }
    }

    return (
        <>
            < Suspense fallback={< Loading />}>
                <form>
                    <div className="flex flex-col bg-white rounded shadow-md mt-4">
                        <div className="flex-row">
                            <div className="mx-3 md:flex mb-6">
                                <div className="basis-1/3 md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="name">
                                        Name
                                    </label>
                                    <input value={company?.name ?? ''} onChange={() => { }} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" name="name" id="name" type="text" placeholder="Manor" />
                                </div>
                                <div className="basis-1/3 md:w-1/2 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="cif">
                                        Cif
                                    </label>
                                    <input readOnly value={company?.cif ?? ''} onChange={() => { }} className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" name="cif" id="cif" type="text" placeholder="Manor" />
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
                                            <select disabled name="type" value={company?.type?.id} onChange={() => { }} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
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
                                            <select disabled name="country" value={company?.country?.id} onChange={() => { }} className="form-select w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4">
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
                    </div>
                </form>
            </Suspense>
        </>
    )
}

export default ViewCompany;