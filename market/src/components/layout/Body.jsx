import { createContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { useCompanies, useCountries } from "../../hooks";
import { Products, AddProduct, EditProduct, ViewProduct } from "../../pages/product";
import { Companies, AddCompany, EditCompany, ViewCompany } from "../../pages/company";
import { Home, Contact, NoMatch } from "../../pages";

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