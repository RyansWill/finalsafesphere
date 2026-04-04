import React from 'react';
import './Services.css';
import { Shield, Globe, Clock, Box, Map, Zap } from 'lucide-react';
import FooterCom from "../../component/footer/FooterCom";

const Services = () => {
  const serviceList = [
    {
      icon: <Map className="svc-icon" />,
      title: "Real-Time GPS Tracking",
      desc: "Monitor your cargo with meter-perfect precision. Our live dashboard provides updates every 30 seconds."
    },
    {
      icon: <Globe className="svc-icon" />,
      title: "Global Logistics",
      desc: "Seamless air, sea, and land freight solutions connecting over 150 countries with optimized routing."
    },
    {
      icon: <Shield className="svc-icon" />,
      title: "Secure Warehousing",
      desc: "Climate-controlled, 24/7 monitored facilities ensuring your goods remain in pristine condition."
    },
    {
      icon: <Zap className="svc-icon" />,
      title: "Express Delivery",
      desc: "Priority handling for time-critical shipments with guaranteed 'Next-Flight-Out' service."
    }
  ];

  return (
    <div>
      <main className="services-page">
      <div className="svc-hero">
        <h1>Our <span className="blue-text">Capabilities</span></h1>
        <p>Advanced logistics powered by real-time data and a global network.</p>
      </div>
      <div className="svc-grid">
        {serviceList.map((svc, index) => (
          <div key={index} className="svc-card">
            {svc.icon}
            <h3>{svc.title}</h3>
            <p>{svc.desc}</p>
          </div>
        ))}
      </div>
    </main>
    <FooterCom/>
    </div>
  );
};

export default Services;