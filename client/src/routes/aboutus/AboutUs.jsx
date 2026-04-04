import React from 'react';
import './AboutUs.css';
import FooterCom from "../../component/footer/FooterCom";

const AboutUs = () => {
  return (
    <div>
      <main className="about-page">
      <section className="about-container">
        <div className="about-content">
          <h6>SINCE 2012</h6>
          <h1>The Gold Standard in <br/><span className="blue-text">Secure Transit</span></h1>
          <p>
            Safe Ship was founded on a single premise: cargo is more than just goods—it is a promise. 
            We integrated blockchain-verified tracking and IoT sensors into every shipment to eliminate 
            the "dark spots" in global logistics.
          </p>
          <div className="stats-row">
            <div className="stat">
              <h2>99.9%</h2>
              <p>On-Time Delivery</p>
            </div>
            <div className="stat">
              <h2>24/7</h2>
              <p>Live Monitoring</p>
            </div>
          </div>
        </div>
        <div className="about-image-placeholder">
          {/* Background image represents a high-tech control center */}
          <div className="image-overlay"></div>
        </div>
      </section>
    </main>
    <FooterCom/>
    </div>
  );
};

export default AboutUs;