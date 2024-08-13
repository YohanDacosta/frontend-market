import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Contact from "../../pages/Contact";
import NoMatch from "../../pages/NoMatch";
import Product from "../../pages/Products";
import Companies from "../../pages/Companies";

const Body = () => {
    return (
        <Routes>
            <Route index path="/" element={< Home />} />
            <Route path="/products" element={< Product />} />
            <Route path="/companies" element={< Companies />} />
            <Route path="/contact" element={< Contact />} />
            <Route path="*" element={< NoMatch />} />
        </Routes>
    )
};

export default Body;