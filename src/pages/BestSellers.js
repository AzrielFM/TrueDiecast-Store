import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BestSellers.css";

function BestSellers() {
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cache keys and expiration
  const CACHE_KEY = "best_sellers_hotwheels";
  const CACHE_EXPIRY_KEY = "best_sellers_hotwheels_expiry";
  const CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day in milliseconds

  const fetchBestSellers = async () => {
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

      // Filter produk dengan nama "Hot Wheels"
      fetchedProducts = fetchedProducts.filter((product) =>
        product.title.toLowerCase().includes("hot wheels")
      );

      // Simpan hasil ke localStorage dengan waktu kedaluwarsa
      localStorage.setItem(CACHE_KEY, JSON.stringify(fetchedProducts));
      localStorage.setItem(
        CACHE_EXPIRY_KEY,
        Date.now() + CACHE_DURATION
      );

      setBestSellers(fetchedProducts);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch data from API.");
      setLoading(false);
    }
  };

  const loadBestSellersFromCacheOrFetch = () => {
    const cachedProducts = localStorage.getItem(CACHE_KEY);
    const cacheExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);

    if (cachedProducts && cacheExpiry && Date.now() < cacheExpiry) {
      // Gunakan data dari cache
      setBestSellers(JSON.parse(cachedProducts));
      setLoading(false);
    } else {
      // Jika tidak ada cache atau sudah kedaluwarsa, panggil API
      fetchBestSellers();
    }
  };

  useEffect(() => {
    loadBestSellersFromCacheOrFetch();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!bestSellers.length) {
    return <h2>No best-selling products found!</h2>;
  }

  return (
    <div className="productDetailEbay">
      <h2>Best-Selling Hot Wheels</h2>
      {selectedProduct ? (
        <div className="productDetail">
          <button onClick={() => setSelectedProduct(null)}>Back</button>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
          <h3>{selectedProduct.title}</h3>
          <p>Price: {selectedProduct.price || "N/A"}</p>
          <a href={selectedProduct.url} target="_blank" rel="noopener noreferrer">
            View on eBay
          </a>
        </div>
      ) : (
        <div className="products">
          {bestSellers.map((product, index) => (
            <div
              key={index}
              className="productCard"
              onClick={() => setSelectedProduct(product)}
            >
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BestSellers;
