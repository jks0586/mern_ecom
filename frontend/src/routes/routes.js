import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from "../components/admin/admindashboard";
import AdminCategory from "../components/admin/category/admincategory";
import AdminCategoryAdd from "../components/admin/category/add";
import AdminCategoryEdit from "../components/admin/category/edit";
import AdminUsers from '../components/admin/adminusers';
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import AdminProductAdd from "../components/admin/product/add";
import AdminProduct from "../components/admin/product/index";
class LetscmsRoutes extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />}/>
          <Route path="/admin/users" element={<AdminUsers />}/>
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/category/create" element={<AdminCategoryAdd/>}/>
          <Route path="/admin/category/edit/:_id" element={<AdminCategoryEdit/>}/>
          <Route path="/admin/product/create" element={<AdminProductAdd/>}/>
          <Route path="/admin/product" element={<AdminProduct/>}/>
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
      </BrowserRouter>
    );
  }
}


export default LetscmsRoutes;