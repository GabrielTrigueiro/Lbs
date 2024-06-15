import Client from "./app/views/client/client";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./app/views/login/login";
import DefaultRoute from "./core/utils/defaultRoute";
import RedefinePassword from "./app/views/login/redefinePassword/redefinePassword";
import RegisterClient from "./app/views/registers/registerClient";
import EditClient from "./app/views/editers/editClient";
import ProtectedRoute from "./core/utils/protectedRoute";
import Supplier from "./app/views/supplier/supplier";
import EditSupplier from "./app/views/editers/editSupplier";
import RegisterSupplier from "./app/views/registers/registerSupplier";
import Indication from "./app/views/indication/indication";
import RegisterCategory from "./app/views/registers/registerCategory";
import Category from "./app/views/category/category";
import Brand from "./app/views/brand/brand";
import RegisterBrand from "./app/views/registers/registerBrand";
import Product from "./app/views/product/product";
import Collaborator from "./app/views/colaborator/collaborator";
import EditBrand from "./app/views/editers/editBrand";
import EditCollaborator from "./app/views/editers/editCollaborator";
import RegisterCollaborator from "./app/views/registers/registerCollaborator";
import {Sale} from "./app/views/sale/sale";
import ForgotPassword from "./app/views/login/forgotPassword/ForgotPassword";
import RegisterIndication from "./app/views/registers/registerIndication";

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
          <Route path="/categorias" element={<Category />} />
          <Route path="/registrarCategoria" element={<RegisterCategory />} />
          <Route path="/editarCategoria" element={<EditClient />} />
          <Route path="/marcas" element={<Brand />} />
          <Route path="/registrarMarca" element={<RegisterBrand />} />
          <Route path="/editarMarca" element={<EditBrand />} />
          <Route path="/produtos" element={<Product />} />
          <Route path="/registrarProduto" element={<>registrar produtos </>} />
          <Route path="/colaboradores" element={<Collaborator />} />
          <Route path="/registrarColaborador" element={<RegisterCollaborator />} />
          <Route path="/editarColaborador" element={<EditCollaborator />} />
          <Route path="/venda" element={<Sale />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
  );
}

export default App;
