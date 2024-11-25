import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetailPage.css";

function ProductDetailPage() {
  const { id } = useParams(); // Ambil ID dari URL
  const [product, setProduct] = useState(null); // State untuk menyimpan data produk
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error

  // Fungsi untuk mengambil data dari API berdasarkan ID
  const fetchProduct = async () => {
    const options = {
      method: 'GET',
      url: 'https://ebay38.p.rapidapi.com/searchByURL',
      params: {
        url: 'https://www.ebay.com/sch/i.html?item=166793698275&rt=nc&_trksid=p4429486.m3561.l161211&_ssn=megabearsstore'
      },
      headers: {
        'x-rapidapi-key': '46f028e437msh5858ec564528e96p1e8000jsn519a7662a4d9',
        'x-rapidapi-host': 'ebay38.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options); // Ambil data produk
      setProduct(response.data[id]); // Pilih produk berdasarkan ID
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch product data.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (!product) {
    return <h2>Product not found!</h2>;
  }

  return (
    <div className="productDetailPage">
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <p>Price: {product.price}</p>
      <p>Condition: {product.condition}</p>
      <a href={product.url} target="_blank" rel="noopener noreferrer">
        View on eBay
      </a>
    </div>
  );
}

export default ProductDetailPage;
