import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../component/view/Header/Header";
import Footer from "../component/view/Footer/Footer";
import Consult from "../component/view/Consult/Consult";
import Home from "../component/view/Home/Home";
import ProductDetail from "../component/view/Product/ProductDetail";
import ProductList from "../component/view/Product/ProductList";
import Review from "../component/view/Review/Review";
import ReviewDetail from "../component/view/Review/ReviewDetail";
import ReviewAmend from "../component/view/Review/ReviewAmend";

function MemberRoute() {
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
          <Route path="/productlist/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default MemberRoute;
