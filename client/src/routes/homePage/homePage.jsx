import "./homePage.css";
import CardSwiper from "../../component/cardswipper/cardswipper";
import SwiftStats from "../../component/swiftStats/SwiftStats";
import FooterCom from "../../component/footer/FooterCom";
import GetQuoteForm from "../../component/Quote/GetAquote";
import ScrollToTopButton from "../../component/scrolltotopbutton/ScrollToTopButton";
import ChatButton from "../../component/messagecircle/MessageCircle";
import { useEffect } from "react";
import apiRequest from "../../lib/apiRequest";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active"); // Add class when in view
          }
        });
      },
      { threshold: 0.1 }
    ); // Trigger when 10% of element is visible

    const elements = document.querySelectorAll(".fourth_main");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect(); // Cleanup
  }, []);

  const scrollToElement = (className) => {
    // Find the element by its class
    const element = document.querySelector(`.${className}`);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth", // The "gentle" scrolling effect
        block: "start", // Align the top of the element to the top of the viewport
      });
    } else {
      console.warn(`Element with class .${className} not found.`);
    }
  };

  const [error, setError] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmitTrack = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await apiRequest.post("/track/get-Track", {
        trackingNumber,
      });
      console.log(res.data);
      navigate(`/track/data/?id=${trackingNumber}`);
    } catch (err) {
      setError(err.response.data.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="homePage">
      <div className="welcome_banner">
        <p>Track Your Shipment!</p>
        <div className="content">
          {error && <div className="error_span">{error}</div>}
          <input
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            minLength={15}
            name="trackingNo"
            type="text"
            placeholder="Enter tracking number"
          />
          <button disabled={loading} onClick={handleSubmitTrack}>
            {loading ? "Searching..." : "Track & Trace"}
          </button>
        </div>
      </div>
      <main>
        <div className="ship_quote_option">
          <div
            className="ship_option"
            onClick={() => {
              navigate("/track/data");
            }}
          >
            <i class="fa fa-paper-plane" aria-hidden="true"></i>
            <p>Ship Now </p>
            <p className="paragraph">Find the right service</p>
          </div>
          <div className="quote_option" onClick={() => scrollToElement("get-a-quote")}>
            <i class="fa fa-fax" aria-hidden="true"></i>
            <p>Get a Quote</p>
            <p className="paragraph">Estimate the cost to share and compare</p>
          </div>
        </div>
        <div className="who_we_are">
          <div>
            <p className="title">Who We Are</p>
            <hr></hr>
            <p className="paragraph">
              <b>SwiftSphere Transit</b> is one of the best logistic service
              provider that helps online merchants to grow their business by
              effortlessly shipping the products to the doorsteps at the best
              possible rates with the help of courier service providers.
              Simplify your order management and ship anywhere in the world. We
              have a secure system that does order tracking facility at your
              ease
            </p>
            <p className="emailus">Email us today</p>
            <a href="">info@swiftspheretransit.com</a>
          </div>
          <div className="img_driver"></div>
        </div>
      </main>
      <div className="content_2">
        <div>
          <hr></hr>
          <p className="titleInnovation">Delivery Inovation</p>
          <p>
            At SwiftSphere Transit, we move innovation forward. Wether designing
            and executing world logistics processes or providing emergency
            logistical support for key industries, we've built our reputation on
            almost a decade of flawless supply chain logistics execution
          </p>
          <button>Start a Conversation</button>
        </div>
      </div>
      <main className="second-main">
        <p className="title">Our Services</p>
        <div className="our-services">
          <div className="service-child">
            <div className="n0head">
              <span>01.</span> <hr />
            </div>
            <h4>
              Air Freight <i class="fa fa-plane" aria-hidden="true"></i>
            </h4>
            <div>
              <p>
                We are leading air freight service provider with high
                performance standards and the flexibility to meet your changing
                needs.
              </p>
            </div>
          </div>
          <div className="service-child">
            <div className="n0head">
              <span>02.</span> <hr />
            </div>
            <h4>
              Sea Freight <i class="fa fa-ship" aria-hidden="true"></i>
            </h4>
            <div>
              <p>
                One of the biggest shipping company around, our container ships
                and bulk carriers are seen and operates in ports all over the
                world.
              </p>
            </div>
          </div>
          <div className="service-child">
            <div className="n0head">
              <span>03.</span> <hr />
            </div>
            <h4>
              Cargo Express <i class="fa fa-truck" aria-hidden="true"></i>
            </h4>
            <div>
              <p>
                The road freight service from our company offers direct full and
                part-load trailers with an option of picking your goods from
                single or multiple locations
              </p>
            </div>
          </div>
          <div className="service-child">
            <div className="n0head">
              <span>04.</span> <hr />
            </div>
            <h4>
              Rail Transport <i class="fa fa-train" aria-hidden="true"></i>
            </h4>
            <div>
              <p>
                We opffer speeds much faster than Sea Freight while being
                considerably cheaper than Air Freight, Rail Freight is now a
                competitive way of importing goods intracontinental from many
                different locations oversees
              </p>
            </div>
          </div>
        </div>
      </main>
      <div className="content-3">
        <div>
          <h3>Our Company Promise</h3>
          <span className="quote">“</span>
          <p>
            As a contractor we promise to take cake care of all supply chain
            management, to make your shipments travel safe, fast and on time.
          </p>
        </div>
      </div>
      <main className="third-main">
        <h2>
          <span>Thousands of shippers</span>{" "}
          <span>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
            <i class="fa fa-star" aria-hidden="true"></i>
          </span>{" "}
          <span>Swift Ship</span>
        </h2>
        <CardSwiper />
        <div className="get-a-quote"></div>

        <GetQuoteForm />

        <div className="stats">
          <h3>Ready to see how we can help keep your business moving?</h3>
          <hr />
          <button>Start a Conversation</button>
          <div className="stats-content">
            <SwiftStats />
          </div>
        </div>
      </main>
      <div className="fourth_main">
        <div className="fourth_main_img">.</div>
        <div className="fourth_main_content">
          <p className="title">Delivery Peace of Mind</p>
          <hr></hr>
          <div className="paragraph">
            <div>
              Since our founding some years ago, the content of the packages we
              deliver has changed quite a bit. But one thing remains the
              same-how we earn your trust. For nearly half a century, we've
              built a reputation as the most trusted specialty logistics company
              in the world through our unsurpassed knowledge, global reach and
              flawless supply chain execution.
            </div>

            <div>
              Our sophisticated systems, neatly designed logistic process, state
              of the art logistic tools and equipment, most advanced carriers,
              custom tailored services, and dedication to keep the costs low for
              end users, help us to provide logistic solution that aligns well
              with our clients' requirements. We welcome you to our site, and
              request you to consult with our logistic experts for your logistic
              needs, and rest assured of getting done.
            </div>
            <div>
              We have years of experience in the business of logistics,
              warehousing, distribution, trucking and supply chain management
              services, and aim to provide our clients with convenience,
              reliability and affordability through our premium logistic
              services.
            </div>
          </div>
        </div>
      </div>
      <FooterCom />
      <ChatButton />
      <ScrollToTopButton />
    </div>
  );
}

export default HomePage;
