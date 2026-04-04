import "./navbar.css";
import LanguageSelector from "../languageselector/LanguageSelector";
import { useState } from "react";
function Navbar() {
  const user = false;
  const [menu, setMenu] = useState(false);

  const NavToAboutUs = (e) => {
    e.preventDefault()
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="left">
          <a href="/" className="logo">
            <img src="/swiftshphere navbar.png" alt="" />
          </a>
          <div className="home_options">
            <a href="/">Rates</a>
            <a href="/">
              Support
            </a>
            <a href="/OurServices">Services</a>
            <a href="/AboutUs">About Us</a>
            <LanguageSelector />
          </div>
        </div>
        <div className="right">
          <div className="lang-responsive">
            <LanguageSelector />
          </div>
          {user ? (
            <div className="profile_options">
              <button className="avatar_btn">
                <i class="fa-regular fa-user"></i>
              </button>
              <button className="message_btn">
                <i class="fa-regular fa-messages"></i>
              </button>
              <button className="logout_btn">Logout</button>
            </div>
          ) : (
            <div className="visitors_options">
              <button className="create_account_btn">
                Get a free Quote NOW!
              </button>
            </div>
          )}
          <div className="dd-menubotton-div">
            <button onClick={() => setMenu(!menu)} className="dd-menubotton">
              <i className="fa fa-bars" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
      {menu ? (
        <div className="dropdown-menu">
          <a href="">
            <div>
              <span>Rates</span>
            </div>
          </a>
          <a href="">
            <div>
              <span>Support</span>
            </div>
          </a>
          <a href="/OurServices">
            <div>
              <span>Services</span>
            </div>
          </a>
          <a href="/AboutUs">
            <div>
              <span>About Us</span>
            </div>
          </a>
          <a href="/ContactUs">
            <div>
              <span>Contact Us</span>
            </div>
          </a>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default Navbar;
