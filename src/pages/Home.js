import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [videoId, setVideoId] = useState(""); // State untuk menyimpan video ID dari YouTube

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  // Fetch quote ketika komponen pertama kali dimuat
  useEffect(() => {
    fetchQuote();
    fetchVideo();
  }, []);

  // Fungsi untuk fetch quote dari API
  const fetchQuote = async () => {
    try {
      const response = await axios.get(
        "https://quotes15.p.rapidapi.com/quotes/random/?language_code=en",
        {
          headers: {
            "X-RapidAPI-Key": "36bf70fe0bmshb3965d2589938d2p1c43efjsn77ec7cd38ba2",
            "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
          },
        }
      );

      const data = response.data;
      setQuote(data.content);
      setAuthor(data.originator.name || "Unknown");
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  // Fungsi untuk fetch video dari YouTube melalui API RapidAPI
  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        "https://youtube138.p.rapidapi.com/search/",
        {
          params: { q: "Hot Wheels Official Video", hl: "en", gl: "US" },
          headers: {
            "X-RapidAPI-Key": "c6d8513690msh5fad2d91a53bf5dp1de072jsne583b91521f3",
            "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
          },
        }
      );
  
      console.log("API Response:", response.data);
      const videoData = response.data.contents.find((item) => item.video);
      if (videoData && videoData.video) {
        setVideoId(videoData.video.videoId); // Ambil videoId dari respons
      } else {
        console.error("No video found in API response.");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };
  

  const handleButtonClick = () => {
    navigate("/series");
  };

  return (
    <div className="home-slider">
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="home-banner">
          <img
            src="https://image.api.playstation.com/vulcan/ap/rnd/202403/2713/377c9c038c0cae88565f80d0c85aef1a0d3fbeb9853ccf6e.jpg"
            alt="Fast and Furious Banner"
            className="banner-image"
          />
          <div className="banner-content">
            <h2>TEMUKAN KOLEKSI HOTWHEELS !</h2>
            <p>Dapatkan Series Fast & Furious Saat Ini</p>
            <button className="cta-button" onClick={handleButtonClick}>
              Dapatkan Sekarang
            </button>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="about-us-banner">
          <img
            src="https://image.api.playstation.com/vulcan/ap/rnd/202403/2713/377c9c038c0cae88565f80d0c85aef1a0d3fbeb9853ccf6e.jpg"
            alt="Fast and Furious Banner"
            className="banner-image"
          />
          <div className="about-content">
            <h2>Tentang Kami</h2>
            <p>
              TrueDiecast adalah toko online yang menyediakan koleksi diecast
              Hot Wheels, termasuk berbagai seri populer seperti Fast &
              Furious. Kami berkomitmen untuk memberikan produk berkualitas
              tinggi kepada para kolektor dan penggemar.
            </p>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="quotes-banner">
          <img
            src="https://image.api.playstation.com/vulcan/ap/rnd/202403/2713/377c9c038c0cae88565f80d0c85aef1a0d3fbeb9853ccf6e.jpg"
            alt="Background Quote"
            className="banner-image"
          />
          <div className="quotes-content banner-content">
            <h2>Kata-Kata Hari Ini, PAHAM!</h2>
            <blockquote>
              <p>{quote || "Loading quote..."}</p>
              <footer>- {author || "Unknown"}</footer>
            </blockquote>
          </div>
        </div>

        {/* Slide 4 - Video YouTube */}
        <div className="video-banner">
          {videoId ? (
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Hot Wheels Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p>Loading video...</p>
          )}
        </div>
      </Slider>
    </div>
  );
}

export default Home;
