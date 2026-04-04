import React from 'react';
import './ContactUs.css';
import { Mail, Phone, MapPin } from 'lucide-react';
import FooterCom from "../../component/footer/FooterCom";
const ContactUs = () => {
  return (
    <div>
      <main className="contact-page">
      <div className="contact-card">
        <div className="contact-info">
          <h2>Get in <span className="blue-text">Touch</span></h2>
          <p>Have a complex shipment or a question about our live tracking? We're here 24/7.</p>
          
          <div className="info-item">
            <MapPin className="blue-text" />
            <div>
              <h4>Headquarters</h4>
              <p>102 Logistics Way, Terminal 4<br/>Port Authority, NY 10001</p>
            </div>
          </div>

          <div className="info-item">
            <Phone className="blue-text" />
            <div>
              <h4>Direct Line</h4>
              <p>+1 (800) SAFE-SHIP</p>
            </div>
          </div>

          <div className="info-item">
            <Mail className="blue-text" />
            <div>
              <h4>Support Email</h4>
              <p>ops@safeship.com</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <textarea placeholder="How can we help you?" rows="5" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </main>
    <FooterCom/>
    </div>
  );
};

export default ContactUs;