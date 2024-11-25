import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductEbay.css";

function ProductEbay() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const CACHE_KEY = "ebay_products";
  const CACHE_EXPIRY_KEY = "ebay_products_expiry";
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  const fetchProducts = async () => {
    const options = {
      method: "GET",
      url: "https://ebay38.p.rapidapi.com/searchByURL",
      params: {
        url: "https://www.ebay.com/sch/i.html?item=166793698275&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=megabearsstore",
      },
      headers: {
        "x-rapidapi-key": "46f028e437msh5858ec564528e96p1e8000jsn519a7662a4d9",
        "x-rapidapi-host": "ebay38.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      let fetchedProducts = response.data || [];
      fetchedProducts = fetchedProducts.slice(0, 20); // Batasi hingga 20 item

      // Simpan hasil ke localStorage dengan waktu kedaluwarsa
      localStorage.setItem(CACHE_KEY, JSON.stringify(fetchedProducts));
      localStorage.setItem(
        CACHE_EXPIRY_KEY,
        Date.now() + CACHE_DURATION
      );

      setProducts(fetchedProducts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data from API.");
      setLoading(false);
    }
  };

  const loadProductsFromCacheOrFetch = () => {
    const cachedProducts = localStorage.getItem(CACHE_KEY);
    const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

    if (cachedProducts && cacheExpiry && Date.now() < cacheExpiry) {
      // Gunakan data dari cache
      setProducts(JSON.parse(cachedProducts));
      setLoading(false);
    } else {
      // Jika tidak ada cache atau sudah kedaluwarsa, panggil API
      fetchProducts();
    }
  };

  useEffect(() => {
    loadProductsFromCacheOrFetch();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleBestSellerPage = () => {
    navigate("/bestsellers");
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!products.length) {
    return <h2>No products found!</h2>;
  }

  return (
    <div className="productDetailEbay">
      <h2>eBay Product Details</h2>
      <div className="products">
        {currentProducts.map((product, index) => (
          <Link
            key={index}
            to={`/product-detail/${index + indexOfFirstItem}`}
            className="productCard"
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default ProductEbay;
