import React, { Suspense, useEffect, useState } from 'react';
import ButtonAction from '../../components/common/ButtonAction';
import useAxios from '../../hooks/useAxios';
import Loading from '../../components/common/Loading';
import { Outlet, useNavigate } from 'react-router-dom';

const Products = () => {
    const navigate = useNavigate();
    const { errors, fetchData } = useAxios();
    const [products, setProducts] = useState([]);

    const handleFetch = async () => {
        const reponse = await fetchData({
            url: "/products",
            method: "GET",
        });

        if (reponse) {
            setProducts(reponse);
        }
    }

    useEffect(() => {
        handleFetch();
    }, []);

    const handleClickAdd = () => {
        navigate(`/product/add`);
    }

    const handleClickEdit = async (id) => {
        navigate(`/product/edit/${id}`);
    }

    const onHandleDelete = (id) => {
        console.log("Clicked");
        // navigate(`/product/edit/${id}`);
    }

    return (
        <>
            <div>
                <div className='flex mt-4 mb-4'>
                    <div className="flex-1 pr-4">
                        <div className="relative md:w-1/3">
                            <input type="search" placeholder="Search..." className='w-full pl-10 pr-4 py-2 rounded-lg shadow focus:outline-non text-gray-600 font-medium' />
                            <div className="absolute top-0 left-0 inline-flex items-center p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24"
                                    fill="none">
                                    <rect x="0" y="0" width="24" height="24"></rect>
                                    <circle cx="10" cy="10" r="7" />
                                    <line x1="21" y1="21" x2="15" y2="15" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='text-2xl mr-4 text-center font-bold'>List Products</div>

                </div>
                <Suspense fallback={<Loading />}>
                    <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
                        <thead>
                            <tr className="text-left">
                                <th className="py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100">
                                    <label
                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                        <input type="checkbox" name="" id="" className="form-checkbox" />
                                    </label>
                                </th>
                                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                    <span className=' col-span-10'>ID</span>
                                </th>
                                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                    <span className=' col-span-10'>NAME</span>
                                </th>
                                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                    <span className=' col-span-10'>COMPANY</span>
                                </th>
                                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                    <span className=' col-span-10'>TYPE PRODUCT</span>
                                </th>
                                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                    <span className=' col-span-10'>COUNTRY</span>
                                </th>
                                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                    <span className=' col-span-10'>QUANTITY</span>
                                </th>
                                <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                    <span className=' col-span-10'>Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {!errors && products?.data?.map((product, idx) =>
                            (<tr key={product.id + idx}>
                                <td key={product.id + product.name} className="border-dashed border-t border-gray-200 px-3">
                                    <label
                                        className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                        <input type="checkbox" className="form-checkbox" name="" id="" />
                                    </label>
                                </td>
                                <td key={product?.id + "productId"} className="border-dashed border-t border-gray-200 productId">
                                    <span className="text-gray-700 px-6 py-3 flex items-center">{product?.id}</span>
                                </td>
                                <td key={product?.id + "name"} className="border-dashed border-t border-gray-200 name">
                                    <span className="text-gray-700 px-6 py-3 flex items-center">{product?.name}</span>
                                </td>
                                <td key={product?.id + "companyId"} className="border-dashed border-t border-gray-200 companyId">
                                    <span className="text-gray-700 px-6 py-3 flex items-center">{product?.company[0]?.name}</span>
                                </td>
                                <td key={product?.id + "typeProduct"} className="border-dashed border-t border-gray-200 typeProduct">
                                    <span className="text-gray-700 px-6 py-3 flex items-center">{product?.type_product?.description}</span>
                                </td>
                                <td key={product?.id + "countryId"} className="border-dashed border-t border-gray-200 countryId">
                                    <span className="text-gray-700 px-6 py-3 flex items-center">{product?.country[0]?.name}</span>
                                </td>
                                <td key={product?.id + "quantity"} className="border-dashed border-t border-gray-200 quantity">
                                    <span className="text-gray-700 px-6 py-3 flex items-center">{product?.quantity}</span>
                                </td>
                                <td key={product?.id + "actions"} className="border-dashed border-t border-gray-200 actions">
                                    <div className='flex'>
                                        <ButtonAction label="Add" onClick={handleClickAdd} />
                                        <ButtonAction label="Edit" color="bg-blue-500" onClick={() => handleClickEdit(product?.id)} />
                                        <ButtonAction label="Delete" color="bg-red-500" onClick={() => onHandleDelete(product?.id)} />
                                    </div>
                                </td>
                            </tr>))
                            }
                        </tbody>
                    </table>
                </Suspense>

            </div>
            <Outlet />
        </>
    )
}

export default Products; 