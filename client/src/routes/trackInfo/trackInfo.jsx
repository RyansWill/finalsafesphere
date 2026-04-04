import "./trackinfo.css";
import FooterCom from "../../component/footer/FooterCom";
import ChatButton from "../../component/messagecircle/MessageCircle";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function TrackInfo() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [searchParams] = useSearchParams();
  const [track, setTrack] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const idFromUrl = searchParams.get("id");
        if (idFromUrl) {
          setTrackingNumber(idFromUrl);
        }

        const res = await apiRequest.post("/track/get-Track", {
          trackingNumber: idFromUrl,
        });

        setTrack(res.data);

        console.log(track);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrack();
  }, [searchParams]);

  const handleSubmitTrack = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiRequest.post("/track/get-Track", {
        trackingNumber,
      });
      console.log(res.data);
      navigate(`/track/data/?id=${trackingNumber}`);
    } catch (err) {
      setError(err.response?.data?.message || "Connection Failed");
      console.log(err);
    }
  };

  return (
    <>
      <div className="track-main">
        <div className="head-content">
          <h1>Track & Trace</h1>
          <div className="search-content">
            <input
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              minLength={15}
              className="search-input"
              type="text"
              placeholder="Enter Your Tracking#"
            />
            <button onClick={handleSubmitTrack}>
              SEND <i class="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
            {error && <span>{error}</span>}
          </div>
        </div>
      </div>
      <main className="track-content">
        {!trackingNumber ? (
          <h3 className="track_no_input_mssg">
            <i>"Please Enter tracking Information"</i>
          </h3>
        ) : (
          <>
            <div className="bar-code-info">
              <div className="bar-code">
                <span>{track.trackingNumber}</span>
              </div>
              <div className="status-msg">{track.status}</div>
            </div>
            <div className="shipment-info">
              <div className="shipment-history">
                <h4>
                  OrderRef#: {track.carrierReferenceNo} {track.productName}
                </h4>
                <div className="shipment-status active">
                  <span className="status-number">1</span>
                  <div className="status-info">
                    <span className="status-name">{track.statusOrigin}</span>
                    <span className="status-date">{track.dateOrigin}</span>
                    <span className="status-address">
                      {track.locationOrigin}
                    </span>
                  </div>
                </div>
                <div className="status-dots">
                  <span className="dots">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                  <span className="dots">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                  <span className="dots">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                  <span className="dots">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="shipment-status active">
                  <span className="status-number">2</span>
                  <div className="status-info">
                    <span className="status-name">{track.status}</span>
                    <span className="status-date">{track.dateModified}</span>
                    <span className="status-address">{track.location}</span>
                  </div>
                </div>
                <div className="status-dots">
                  <span className="dots">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                  <span className="dots">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                  <span className="dots">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                  <span className="dots">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="shipment-status">
                  <span className="status-number">3</span>
                  <div className="status-info">
                    <span className="status-name">Expected Delivery</span>
                    <span className="status-date">{track.arrivalDate}</span>
                    <span className="status-address">
                      {track.receiverAddress}
                    </span>
                  </div>
                </div>
              </div>
              <div className="parties-info">
                <div>
                  <h4>Shippers Info</h4>
                  <div>
                    <label>Name:</label> {track.shipperName}
                  </div>
                  <div>
                    <label>Phone Number:</label> {track.shipperPhone}
                  </div>
                  <div>
                    <label>Address:</label> {track.shipperAddress}
                  </div>
                  <div>
                    <label>Email:</label> {track.shipperEmail}
                  </div>
                </div>
                <div>
                  <h4>Receivers info</h4>
                  <div>
                    <label>Name:</label> {track.receiverName}
                  </div>
                  <div>
                    <label>Phone Number:</label> {track.receiverPhone}
                  </div>
                  <div>
                    <label>Address:</label> {track.receiverAddress}
                  </div>
                  <div>
                    <label>Email:</label> {track.receiverEmail}
                  </div>
                </div>
              </div>
            </div>
            <div className="shipment-details">
              <h5>Shipment Details</h5>
              <div className="shipment-info-wrapper">
                  <div className="shipment-details">
                    <div>
                      <label>Product Name :</label> {track.productName}
                    </div>
                    <div>
                      <label>Type of Shipment :</label> {track.typeofShipment}
                    </div>
                    <div>
                      <label>Carrier :</label> {track.carrier}
                    </div>
                    <div>
                      <label>Carrier Reference No :</label>{" "}
                      {track.carrierReferenceNo}
                    </div>
                    <div>
                      <label>Payment Mode :</label> {track.paymentMode}
                    </div>
                    <div>
                      <label>Packages :</label> {track.packages}
                    </div>
                    <div>
                      <label>Total Freight:</label> {track.totalFreight}
                    </div>

                    <div>
                      <label>Weight :</label> {track.weight} kg
                    </div>
                    <div>
                      <label>Quantity :</label> {track.quatity}
                    </div>
                  </div>
                  <div className="shipment-details">
                    <div>
                      <label>Mode :</label> {track.mode}
                    </div>
                    <div>
                      <label>Courier :</label> {track.courier}
                    </div>
                    <div>
                      <label>Origin :</label> {track.origin}
                    </div>
                    <div>
                      <label>Departure Date :</label> {track.departureDate}
                    </div>
                    <div>
                      <label>Departure time :</label> {track.departureTime}
                    </div>
                    <div>
                      <label>Destination :</label> {track.destination}
                    </div>
                    <div>
                      <label>Arrival Date :</label> {track.arrivalDate}
                    </div>
                    <div>
                      <label>Arrival Time :</label> {track.arrivalTime}
                    </div>
                  </div>
                
              </div>
            </div>
          </>
        )}
        <div className="ad-banner">
          <div className="banner-content">
            <span>Stop Tracking the Box. Start Tracking Your Future.</span>
            <p>Your career deserves a fast route, too.</p>
            <p>Explore open roles (IT, Logistics, Driving, and more) with stability and clear paths for advancement.</p>
            <p>Don't wait for your next step - build it!</p>
            <button>Unbox Your Potential</button>
          </div>
          <div className="img-content">
          
          </div>
        </div>
      </main>
      <FooterCom />
      <ChatButton />
    </>
  );
}

export default TrackInfo;
