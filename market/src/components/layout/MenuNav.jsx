import React from "react";

const MenuNav = () => {
    return (
        <>
            <div className='flex bg-gray-800 flex-wrap top-0 py-3 px-6 text-white justify-between'>
                <h1 className='text-lg font-semibold'>Market</h1>
                <ul className='flex gap-[40px] text-m'>
                    <li>Home</li>
                    <li>Products</li>
                    <li>Companies</li>
                    <li>Contact</li>
                </ul>
            </div>
        </>
    )
};

export default MenuNav;