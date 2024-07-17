import React, { useEffect } from 'react';
import ButtonAction from '../components/common/ButtonAction';
import useAxios from '../hooks/useAxios';

const Product = () => {
    const { data, error, loading, fetchData } = useAxios();

    useEffect(() => {
        fetchData({
            url: "/products",
            method: "GET",
        });
    }, []);

    console.log(data);

    const onHandleClick = () => {
        console.log("Clicked");
    };

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
                                <span className=' col-span-10'>USER ID</span>
                            </th>
                            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                <span className=' col-span-10'>FIRSTNAME</span>
                            </th>
                            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                <span className=' col-span-10'>LASTNAME</span>
                            </th>
                            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                <span className=' col-span-10'>EMAIL</span>
                            </th>
                            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                <span className=' col-span-10'>GENDER</span>
                            </th>
                            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                <span className=' col-span-10'>PHONE</span>
                            </th>
                            <th className="bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs">
                                <span className=' col-span-10'>Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border-dashed border-t border-gray-200 px-3">
                                <label
                                    className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                                    <input type="checkbox" className="form-checkbox" name="" id="" />
                                </label>
                            </td>
                            <td className="border-dashed border-t border-gray-200 userId">
                                <span className="text-gray-700 px-6 py-3 flex items-center">1</span>
                            </td>
                            <td className="border-dashed border-t border-gray-200 firstName">
                                <span className="text-gray-700 px-6 py-3 flex items-center">Brianne</span>
                            </td>
                            <td className="border-dashed border-t border-gray-200 lastName">
                                <span className="text-gray-700 px-6 py-3 flex items-center">Dzeniskevich</span>
                            </td>
                            <td className="border-dashed border-t border-gray-200 emailAddress">
                                <span className="text-gray-700 px-6 py-3 flex items-center">bdzeniskevich1@hostgator.com</span>
                            </td>
                            <td className="border-dashed border-t border-gray-200 gender">
                                <span className="text-gray-700 px-6 py-3 flex items-center">Female</span>
                            </td>
                            <td className="border-dashed border-t border-gray-200 phoneNumber">
                                <span className="text-gray-700 px-6 py-3 flex items-center">144-190-8956</span>
                            </td>
                            <td className="border-dashed border-t border-gray-200 phoneNumber">
                                <div className='flex'>
                                    <ButtonAction label="Add" onClick={onHandleClick} />
                                    <ButtonAction label="Edit" color="bg-blue-500" onClick={onHandleClick} />
                                    <ButtonAction label="Delete" color="bg-red-500" onClick={onHandleClick} />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Product;