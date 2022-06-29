import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../component/view/Header/Header";
import Footer from "../component/view/Footer/Footer";
import Consult from "../component/view/Consult/Consult";
import Home from "../component/view/Home/Home";
import Login from "../component/view/Login/Login";
import ProductDetail from "../component/view/Product/ProductDetail";
import ProductList from "../component/view/Product/ProductList";
import Register from "../component/view/Register/Register";
import Review from "../component/view/Review/Review";
import ReviewDetail from "../component/view/Review/ReviewDetail";

function GuestRoute() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/productlist/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default GuestRoute;
