 import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

export default function Home() {
  useEffect(() => {
    const slider = document.getElementById("slider");
    let currentSlide = 0;
    const totalSlides = 5;

    const interval = setInterval(() => {
      currentSlide = (currentSlide + 1) % totalSlides;
      slider.style.transform = `translateX(-${currentSlide * 20}%)`;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      {/* ===== SLIDER SECTION (SAME AS HTML) ===== */}
      <div className="slider-container">
        <div id="slider" className="slider">

          <div className="slide slide1">
            <div className="slide-text">
              <p className="title">
                "Where learning meets inspiration — welcome to our campus!"
              </p>
              <p className="subtitle">
                "Empowering minds, shaping futures — every day at our college."
              </p>
            </div>
          </div>

          <div className="slide slide2">
            <div className="slide-text">
              <p className="title">
                "A place where knowledge flows like a serene lake."
              </p>
              <p className="subtitle">
                "Discover, learn, and grow with every sunrise."
              </p>
            </div>
          </div>

          <div className="slide slide3">
            <div className="slide-text">
              <p className="title">
                "A library is not a room — it's endless wisdom."
              </p>
              <p className="subtitle">
                "Every book opens a new path of discovery."
              </p>
            </div>
          </div>

          <div className="slide slide4">
            <div className="slide-text">
              <p className="title">
                "A green and peaceful campus that inspires learning."
              </p>
              <p className="subtitle">
                "Our environment nurtures minds every day."
              </p>
            </div>
          </div>

          <div className="slide slide5">
            <div className="slide-text">
              <p className="title">
                "Experience beauty blended with campus life."
              </p>
              <p className="subtitle">
                "Perfect harmony of greenery and growth."
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ===== ABOUT ===== */}
      <section className="about-section">
        <h2>About the System</h2>
        <p>
          The Your Dues system provides a paperless clearance platform
          connecting all departments for transparent and fast approvals.
        </p>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features-section">
        <h2>System Features</h2>

        <div className="features-grid">
          <div className="feature-card">Student Portal</div>
          <div className="feature-card">Hostel Clearance</div>
          <div className="feature-card">Library Clearance</div>
          <div className="feature-card">Accounts Verification</div>
          <div className="feature-card">HOD Approval</div>
        </div>
      </section>

      <Footer />
    </>
  );
}
