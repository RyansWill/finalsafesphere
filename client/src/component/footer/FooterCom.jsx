import "./footer.css";
const FooterCom = () => {
  return (
    <footer>
      <div className="main-footer">
        <div className="footer-container">
          <div>
            <h5>OUR COMPANY</h5>
            <p><a href="/AboutUs">ABOUT US</a></p>
            <p><a href="/OurServices">OUR SERVICES</a></p>
            <p><a href="/ContactUs">GET IN TOUCH</a></p>
          </div>
          <div>
            <h5>OUR SERVICES</h5>
            <p>AIR FREIGHT</p>
            <p>SEA FREIGHT</p>
            <p>CARGO EXPRESS</p>
          </div>
          <div>
            <h5>QUICK LINKS</h5>
            <p>
              <a href="/">
                Terms & Conditions
              </a>
            </p>
            <p>
              <a href="/">
                Cookie Settings
              </a>
            </p>
            <p>
              <a href="/">
                Customer Servive
              </a>
            </p>
           
          </div>
        </div>
      </div>
      <div className="all-right">
        <p>SwiftSphere Transit © 2026 All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default FooterCom;
