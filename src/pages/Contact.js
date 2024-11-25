import React from "react";
import "./Contact.css"; // Jika ingin memisahkan CSS

function Contact() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundImage: `url("https://image.api.playstation.com/vulcan/ap/rnd/202403/2713/377c9c038c0cae88565f80d0c85aef1a0d3fbeb9853ccf6e.jpg")`,
        backgroundSize: "cover", // Pastikan gambar memenuhi seluruh elemen
        backgroundPosition: "center", // Posisikan gambar di tengah
        backgroundRepeat: "no-repeat", // Hindari pengulangan gambar
        color: "white", // Tambahkan warna teks agar kontras
        borderRadius: "10px", // Opsional untuk membuat sudut bulat
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Tambahkan efek bayangan
      }}
    >
      <h2>Contact Information</h2>
      <p>Nama: Admin True Diecast</p>
      <p>Email: TrueDiecast@gmail.com</p>
      <p>Nomor Telepon: +62 123 456 7890</p>
      <p>Alamat: Jl Mulawarman Selatan, Banyumanik, Semarang, Indonesia</p>
    </div>
  );
}

export default Contact;
