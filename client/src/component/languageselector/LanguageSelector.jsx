import React, { useState, useRef, useEffect } from "react";
import Flag from "react-world-flags";
import { ChevronDown, Globe } from "lucide-react";
import { languages } from "../../lib/dummyData";

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState({
    code: "UA",
    name: "",
    lang: "ua",
  });
  const dropdownRef = useRef(null);



  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang) => {
    setSelectedLang(lang);
    setIsOpen(false);
    // ANTICIPATION: This is where you will call i18n.changeLanguage(lang.lang)
    console.log(`Language changed to: ${lang.name} (${lang.lang})`);
  };

  return (
    <div style={styles.wrapper} ref={dropdownRef}>
      <button
        style={styles.mainButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <div style={styles.buttonContent}>
          <Flag code={selectedLang.code} style={styles.currentFlag} />
        </div>
        <ChevronDown
          size={16}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "0.3s",
            fontWeight: "bold",
          }}
        />
      </button>

      {isOpen && (
        <div style={styles.dropdown}>
          <div style={styles.grid}>
            {languages.map((item) => (
              <div
                key={item.code}
                style={styles.option}
                onClick={() => handleSelect(item)}
              >
                <Flag code={item.code} style={styles.flagIcon} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    width: "fit-content",
  },
  mainButton: {
    backgroundColor: "#ffffff",
    border: "none",
    color: "#0a1a66",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    minWidth: "50px",
    justifyContent: "space-between",
  },
  buttonContent: { display: "flex", alignItems: "center", gap: "8px" },
  currentFlag: { height: "25px", width: "20px", borderRadius: "2px" },
  langName: { fontSize: "0.9rem", fontWeight: "500" },
  dropdown: {
    position: "absolute",
    top: "80%",
    left: "0",
    backgroundColor: "#0f0f0f",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "2px 5px",
    zIndex: 1000,
    width: "45px", // Wider to accommodate 2 columns
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
  },
  grid: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    maxHeight: "300px",
    overflowY: "auto",
  },
  option: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "2px",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "background 0.2s",
  },
  optionText: { color: "#ccc", fontSize: "0.85rem" },
  flagIcon: { height: "25px", width: "18px", borderRadius: "2px" },
};

// Add hover effect via JS or CSS
styles.option[":hover"] = { backgroundColor: "#222" };

export default LanguageSelector;
