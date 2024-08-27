import React from 'react';

const Home = () => {
    return (
        <div className='flex-col'>
            <div className='flex justify-center p-2 mb-2'>
                <h1 className='p-4 text-2xl'><strong>CRUD</strong></h1>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-2 gap-12'>
                    <div>
                        <span className='border border-gray-400 rounded px-4 py-2 bg-green-200'>Products</span>

                        <div className='mt-4 border border-gray-300 p-4 rounded-md'>
                            <ul className='p-4'>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm rounded-full'>Show All Products</li>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm rounded-full'>View a Product</li>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm rounded-full'>Add a Product</li>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm rounded-full'>Edit a Product</li>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm rounded-full'>Delete a Product</li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <span className='border border-gray-400 rounded px-4 py-2 bg-blue-200'>Companies</span>
                        <div className='mt-4 border border-gray-300 p-4 rounded-md'>
                            <ul className='p-4'>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm  rounded-md'>Show All Companies</li>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm rounded-md'>View a Company</li>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm rounded-md'>Add a Company</li>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm rounded-md'>Edit a Company</li>
                                <li className='px-4 py-2 border-2 m-2 shadow-sm rounded-md'>Delete a Company</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;