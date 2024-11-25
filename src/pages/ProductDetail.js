import React from "react";
import { useParams } from "react-router-dom";
import './ProductDetail.css';

const series = [
  {
    id: 1,
    name: "Fast And Furious Series",
    products: [
      {
        id: 1,
        name: "1995 Mazda RX-7",
        price: "Rp 100.000",
        description: "Mazda RX-7 from Fast & Furious.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/f6047165ef54203ddf7bc5a2caa47420.jpg?v=1708984336&width=823",
      },
      {
        id: 2,
        name: "W Motors Lykan Hypersport",
        price: "Rp 80.000",
        description: "Lykan Hypersport from Fast & Furious.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/b7958acfe8c9042e335d5b9f72f14538.jpg?v=1708984335&width=823",
      },
      {
        id: 3,
        name: "1950 Chevy Fleetline",
        price: "Rp 70.000",
        description: "Chefy Fleetline from Fast & Furious.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/c252d9cebdaee02d4432b984d56ca5a0.jpg?v=1708984333&width=823",
      },
      {
        id: 4,
        name: "1970 Chevelle SS",
        price: "Rp 56.000",
        description: "Chevelle from Fast & Furious.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/c0331bfb2c6b8cb16d13f4178c596102.jpg?v=1708984334&width=823",
      },
      {
        id: 5,
        name: "Dodge Charger",
        price: "Rp 56.000",
        description: "Dodge Charger from Fast & Furious.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/ebb433ebab549a78389758265dc46830.jpg?v=1708984330&width=823",
      },
    ],
  },
  {
    id: 2,
    name: "Liberty Walk Series",
    products: [
      {
        id: 1,
        name: "Hot Wheels Nissan 35GT-RR LBWK",
        price: "Rp 80.000",
        description: "Nissan GT-R with Liberty Walk kit.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/31dd0babf90883a015e0de6002946e21.jpg?v=1728644676&width=823",
      },
      {
        id: 1,
        name: "Hot Wheels Nissan 2000GT-R LBWK",
        price: "Rp 60.000",
        description: "Nissan GT-R with Liberty Walk kit.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/e4898e68d03f863270a77e5411c10eee.jpg?v=1728644991&width=823",
      },
    ],
  },
  {
    id: 3,
    name: "Boulevard Series",
    products: [
      {
        id: 1,
        name: "Hot Wheels Premium Fiat 500D",
        price: "Rp 100.000",
        description: "Fiat 500D from Boulevard Premium Series.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/dcc7b212e901f668363263d9f8ec39e6.jpg?v=1709887169&width=823",
      },
      {
        id: 2,
        name: "Hot Wheels Toyota GR Supra",
        price: "Rp 300.000",
        description: "Toyota GR Supra From Boulevard Premium Series.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/ad58a18f1a9d145aed865a94b0903cae.jpg?v=1709887170&width=823",
      },
      {
        id: 3,
        name: "Hot Wheels Lamborghini Countach",
        price: "Rp 100.000",
        description: "Lamborghini Countach from Boulevard Premium Series.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/0bdd66b87d3df1be2617ff19b739eb03.jpg?v=1709887171&width=823",
      },
      {
        id: 4,
        name: "Hot Wheels Nissan Skyline GT-R (BNR32)",
        price: "Rp 150.000",
        description: "Nissan Skyline GT-R from Boulevard Premium Series.",
        img: "https://www.hotmatchcollectables.com/cdn/shop/files/153c8172d65f149a05309215902ddd71.jpg?v=1709887174&width=823",
      },
    ],
  },
];

function ProductDetail() {
  const { id } = useParams();
  const serie = series.find((s) => s.id === parseInt(id));

  if (!serie) {
    return <h2>Series not found!</h2>;
  }

  return (
    <div className="productDetail">
      <h2>{serie.name}</h2>
      <div className="products">
        {serie.products.map((product) => (
          <div key={product.id} className="productCard">
            <img src={product.img} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductDetail;
