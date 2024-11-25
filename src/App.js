import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import ProductEbay from "./pages/ProductEbay";
import ProductDetailPage from "./pages/ProductDetailPage";
import BestSellers from "./pages/BestSellers";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <div className="logo-container">
          <img
            src="https://1000logos.net/wp-content/uploads/2020/09/Hot-Wheels-logo.png"
            alt="Hot Wheels Logo"
            className="logo"
          />
          <h1>TrueDiecast</h1>
        </div>
        <nav className="nav-links">
          <NavLink to="/Beranda" className="navLink">Beranda</NavLink>
          <NavLink to="/series" className="navLink">Series</NavLink>
          <NavLink to="/contact" className="navLink">Contact</NavLink>
          <NavLink to="/ProductEbay" className="navLink">Ebay</NavLink>
          <NavLink to="/BestSellers" className="navLink">All</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/Beranda" element={<Home />} />
          <Route path="/series" element={<ProductList />} />
          <Route path="/ProductEbay" element={<ProductEbay />} />
          <Route path="/series/:id" element={<ProductDetail />} />
          <Route path="/product-detail/:id" element={<ProductDetailPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bestsellers" element={<BestSellers />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>© 2024 Hot Wheels Store. All rights reserved.</p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
