import { MessageCircle } from "lucide-react";

import './AlertMsg.css';

export default function ChatButton() {

  const handleClick = () => {
    // Chat not implemented yet
    alert("Suport on Maintenance..");
  };

  return (
    <>
      {/* <div className="alert-message">
        <span className="first-span">
          <i class="fa fa-cloud" aria-hidden="true"></i>
        </span>
        <span className="second-span">
          <i class="fa fa-cloud" aria-hidden="true"></i>
        </span>
        <span className="third-span">
          <i class="fa fa-bullhorn" aria-hidden="true"></i> Support on maintenance...
        </span>
      </div> */}
      <button style={styles.button} onClick={handleClick}>
      <MessageCircle size={22} />
      </button>
    </>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "25px",
    left: "25px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
    zIndex: 9999,
  }
};