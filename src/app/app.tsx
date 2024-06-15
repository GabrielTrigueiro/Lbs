import { Routes, Route, Navigate } from "react-router-dom";

import DefaultRoute from "core/utils/defaultRoute";
import ProtectedRoute from "core/utils/protectedRoute";
import ForgotPassword from "./views/login/forgotPassword/ForgotPassword";
import RedefinePassword from "./views/login/redefinePassword/redefinePassword";
import Login from "./views/login/login";
import Client from "./views/client/client";
import Collaborator from "./views/colaborator/collaborator";
import Provider from "./views/provider/provider";
import Product from "./views/product/product";
import Category from "./views/category/category";
import Supplier from "./views/supplier/supplier";
import RegisterClient from "./views/registers/registerClient";
import RegisterCollaborator from "./views/registers/registerCollaborator";
import RegisterSupplier from "./views/registers/registerSupplier";
import { Sale } from "./views/sale/sale";
import EditClient from "./views/editers/editClient";
import EditCollaborator from "./views/editers/editCollaborator";
import EditSupplier from "./views/editers/editSupplier";
import Brand from "./views/brand/brand";
import RegisterCategory from "./views/registers/registerCategory";
import RegisterBrand from "./views/registers/registerBrand";
import EditCategory from "./views/editers/editCategory";
import EditBrand from "./views/editers/editBrand";
import Indication from "./views/indication/indication";
import RegisterIndication from "./views/registers/registerIndication";
import RegisterProduct from "./views/registers/registerProduct";
import EditProduct from "./views/editers/editProduct";
import RegisterCollection from "./views/registers/registerCollection";
import EditCollection from "./views/editers/editCollection";
import Collection from "./views/collection/collection";
import EditIndication from "./views/editers/editIndication";

function App() {
    return (
        <Routes>
            <Route element={<DefaultRoute />}>
                <Route path="/login" element={<Login />} />
            </Route>
            <Route path="/esqueceuSenha" element={<ForgotPassword />} />
            <Route path="/recuperacao-senha" element={<RedefinePassword />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/clientes" element={<Client />} />
                <Route path="/registrarCliente" element={<RegisterClient />} />
                <Route path="/editarCliente" element={<EditClient />} />

                <Route path="/fornecedores" element={<Supplier />} />
                <Route path="/registrarFornecedor" element={<RegisterSupplier />} />
                <Route path="/editarFornecedor" element={<EditSupplier />} />

                <Route path="/indicacoes" element={<Indication />} />
                <Route path="/registrarIndicacao" element={<RegisterIndication />} />
                <Route path="/editarIndicacao" element={<EditIndication/>} />

                <Route path="/categorias" element={<Category />} />
                <Route path="/registrarCategoria" element={<RegisterCategory />} />
                <Route path="/editarCategoria" element={<EditCategory />} />

                <Route path="/marcas" element={<Brand />} />
                <Route path="/registrarMarca" element={<RegisterBrand />} />
                <Route path="/editarMarca" element={<EditBrand />} />
                
                <Route path="/produtos" element={<Product />} />
                <Route path="/registrarProduto" element={<RegisterProduct/>} />
                <Route path="/editarProduto" element={<EditProduct/>} />

                <Route path="/colaboradores" element={<Collaborator />} />
                <Route path="/registrarColaborador" element={<RegisterCollaborator />} />
                <Route path="/editarColaborador" element={<EditCollaborator />} />

                <Route path="/registrarColecao" element={<RegisterCollection/>} />
                <Route path="/editarColecao" element={<EditCollection/>} />
                <Route path="/Colecoes" element={<Collection />} />

                <Route path="/venda" element={<Sale />} />

                

            </Route>

            <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
    );
}

export default App;
