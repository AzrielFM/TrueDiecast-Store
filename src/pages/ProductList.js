import React from "react";
import { Link } from "react-router-dom";
import "./ProductList.css";

const series = [
  {
    id: 1,
    name: "Fast And Furious Series",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/25/Fast-furious-logo-fast-furious.jpeg",
  },
  {
    id: 2,
    name: "Liberty Walk Series",
    img: "https://i.pinimg.com/736x/e2/da/e4/e2dae44f8f22778bb34ae107e69d463f.jpg",
  },
  {
    id: 3,
    name: "Boulevard Series",
    img: "https://www.hotwheelsbr.com/Boulevard/Logo-lg.jpg",
  },
];

function ProductList() {
  return (
    <div
      className="productList"
      style={{
        backgroundImage: `url("https://image.api.playstation.com/vulcan/ap/rnd/202403/2713/377c9c038c0cae88565f80d0c85aef1a0d3fbeb9853ccf6e.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
      }}
    >
      <h2 style={{ color: "white" }}>Hot Wheels Collection</h2>
      <div className="products">
        {series.map((serie) => (
          <div key={serie.id} className="productCard">
            <div className="imageContainer">
              <img src={serie.img} alt={serie.name} />
            </div>
            <h3>{serie.name}</h3>
            <Link to={`/series/${serie.id}`} className="detailsLink">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
