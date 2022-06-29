import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../component/view/Header/Header";
import Footer from "../component/view/Footer/Footer";
import Consult from "../component/view/Consult/Consult";
import Home from "../component/view/Home/Home";
import ProductCreate from "../component/view/Product/ProductCreate";
import ProductDetail from "../component/view/Product/ProductDetail";
import ProductList from "../component/view/Product/ProductList";
import Review from "../component/view/Review/Review";
import ReviewDetail from "../component/view/Review/ReviewDetail";
import ReviewAmend from "../component/view/Review/ReviewAmend";
import AdminConsultList from "../component/view/Admin/AdminConsultList";
import AdminCarList from "../component/view/Admin/AdminCarList";
import AdminConsultDetail from "../component/view/Admin/AdminConsultDetail";

function AdminRoute() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/review" element={<Review />} />
          <Route path="/reviewamend" element={<ReviewAmend />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/productcreate" element={<ProductCreate />} />
          <Route path="/productlist/:id" element={<ProductDetail />} />
          <Route path="/admin/consultlist" element={<AdminConsultList />} />
          <Route
            path="/admin/consultlist/:id"
            element={<AdminConsultDetail />}
          />
          <Route path="/admin/carlist" element={<AdminCarList />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default AdminRoute;
