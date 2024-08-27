import { createContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Contact from "../../pages/Contact";
import NoMatch from "../../pages/NoMatch";
import Companies from "../../pages/company/Companies.jsx";
import Products from "../../pages/product/Products.jsx";
import AddProduct from "../../pages/product/AddProduct.jsx";
import EditProduct from "../../pages/product/EditProduct.jsx";
import ViewProduct from "../../pages/product/ViewProduct.jsx";
import useCompanies from "../../hooks/useCompanies.js";
import useCountries from "../../hooks/useCountries.js";
import AddCompany from "../../pages/company/AddCompany.jsx";
import EditCompany from "../../pages/company/EditCompany.jsx";
import ViewCompany from "../../pages/company/ViewCompany.jsx";

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
                    <Route path="add" element={< AddProduct />} />
                    <Route path="edit/:id" element={< EditProduct />} />
                    <Route path="*" element={< NoMatch />} />
                </Route>
                <Route path="/company/*" >
                    <Route path="all" element={< Companies />} />
                    <Route path="edit/:id" element={< EditCompany />} />
                    <Route path="view/:id" element={< ViewCompany />} />
                    <Route path="add" element={< AddCompany />} />
                    <Route path="*" element={< NoMatch />} />
                </Route>
                <Route path="/contact" element={< Contact />} />
                <Route path="*" element={< NoMatch />} />
            </Routes>
            <Outlet />
        </CompaniesContext.Provider>
    )
};

export default Body;