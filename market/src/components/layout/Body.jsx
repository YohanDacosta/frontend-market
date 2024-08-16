import { createContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Contact from "../../pages/Contact";
import NoMatch from "../../pages/NoMatch";
import Companies from "../../pages/Companies";
import Products from "../../pages/product/Products.jsx";
import AddProduct from "../../pages/product/AddProduct.jsx";
import EditProduct from "../../pages/product/EditProduct.jsx";
import ViewProduct from "../../pages/product/ViewProduct.jsx";
import useCompanies from "../../hooks/useCompanies.js";
import useCountries from "../../hooks/useCountries.js";

export const CompaniesContext = createContext();

const Body = () => {
    const { companies } = useCompanies();
    const { countries } = useCountries();

    return (
        <CompaniesContext.Provider value={{ companies, countries }}>
            <Routes>
                <Route index path="/" element={< Home />} />
                <Route path="/product/*" >
                    <Route path="all" element={< Products />} />
                    <Route path="view/:id" element={< ViewProduct />} />
                    <Route path="add/:id" element={< AddProduct />} />
                    <Route path="edit/:id" element={< EditProduct />} />
                    <Route path="*" element={< NoMatch />} />
                </Route>
                <Route path="/companies" element={< Companies />} />
                <Route path="/contact" element={< Contact />} />
                <Route path="*" element={< NoMatch />} />
            </Routes>
            <Outlet />
        </CompaniesContext.Provider>
    )
};

export default Body;