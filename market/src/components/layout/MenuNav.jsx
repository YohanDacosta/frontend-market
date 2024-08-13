import React from "react";
import { Link } from "react-router-dom";

const MenuNav = () => {
    return (
        <>
            <div className='flex bg-gray-800 flex-wrap top-0 py-3 px-6 text-white justify-between'>
                <h1 className='text-lg font-semibold'>Market</h1>
                <ul className='flex gap-[40px] text-m'>
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/companies">Companies</Link>
                    <Link to="/contact">Contact</Link>
                </ul>
            </div>
        </>
    );
};

export default MenuNav;