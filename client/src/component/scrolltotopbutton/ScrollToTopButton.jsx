import { useState, useEffect } from "react";

export default function ScrollToTopButton() {

const [showButton, setShowButton] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Calculate the 75% mark of the scrollable area
    const scrollLimit = (docHeight - windowHeight) * 0.75;

    if (scrollTop >= scrollLimit) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button onClick={scrollToTop} style={styles.button}>
      <i class="fa fa-chevron-up" aria-hidden="true"></i>
    </button>
  );
}

const styles = {
  button: {
    position: "fixed",
    bottom: "40px",
    right: "40px",
    padding: "12px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#3b3c3f",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
};

