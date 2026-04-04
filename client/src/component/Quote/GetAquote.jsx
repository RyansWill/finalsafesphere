import React, { useState, useEffect } from 'react';
import { Send, Package, MapPin, Scale, Globe, RotateCcw, ChevronRight, ChevronLeft } from 'lucide-react';

const GetQuoteForm = () => {
  const initialState = {
    origin: '', destination: '', serviceType: 'Standard Ground',
    weight: '', length: '', width: '', height: '',
    email: '', phone: ''
  };

  const [formData, setFormData] = useState(initialState);
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      if (window.innerWidth > 600) setStep(1); 
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    if (window.confirm("Clear all entries?")) {
      setFormData(initialState);
      setStep(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isMobile && step === 1) {
      setStep(2);
    } else {
      alert("Quote request sent! Our team will contact you shortly.");
    }
  };

  const progressWidth = isMobile ? (step === 1 ? '50%' : '100%') : '100%';

  return (
    <section style={styles.fullWidthSection}>
      {/* The style object below now dynamically applies 
          maxHeight: '580px' ONLY when isMobile is true 
      */}
      <div style={{
        ...styles.formCard, 
        maxHeight: isMobile ? '580px' : 'none',
        height: isMobile ? '580px' : 'auto' 
      }}>
        
        <div style={styles.progressWrapper}>
           <div style={{ ...styles.progressFill, width: progressWidth }}></div>
        </div>

        <div style={styles.header}>
          <h3 style={styles.title}>Get a <span style={{color: '#3b82f6'}}>Swift</span> Quote</h3>
          <p style={styles.subtitle}>
            {isMobile ? `Step ${step} of 2` : "Fill in the details for an instant estimate"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {(!isMobile || step === 1) && (
            <>
              <div className="form-row" style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}><MapPin size={14}/> Origin Zip</label>
                  <input type="text" name="origin" value={formData.origin} placeholder="10001" onChange={handleChange} style={styles.input} required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}><MapPin size={14}/> Destination Zip</label>
                  <input type="text" name="destination" value={formData.destination} placeholder="90001" onChange={handleChange} style={styles.input} required />
                </div>
              </div>

              <div className="form-row" style={styles.row}>
                <div style={{...styles.inputGroup, flex: '1 1 150px'}}>
                  <label style={styles.label}><Scale size={14}/> Weight (kg)</label>
                  <input type="number" name="weight" value={formData.weight} placeholder="0.00" onChange={handleChange} style={styles.input} required />
                </div>
              </div>
            </>
          )}

          {(!isMobile || step === 2) && (
            <>
              <div style={styles.inputGroup}>
                <label style={styles.label}><Globe size={14}/> Service Level</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} style={styles.input}>
                  <option>Standard Ground</option>
                  <option>Express Air</option>
                  <option>Priority Overnight</option>
                </select>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}><Package size={14}/> Dimensions (L x W x H cm)</label>
                <div style={styles.dimensionRow}>
                  <input type="number" name="length" value={formData.length} placeholder="L" onChange={handleChange} style={styles.dimInput} required />
                  <input type="number" name="width" value={formData.width} placeholder="W" onChange={handleChange} style={styles.dimInput} required />
                  <input type="number" name="height" value={formData.height} placeholder="H" onChange={handleChange} style={styles.dimInput} required />
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input type="email" name="email" value={formData.email} placeholder="name@company.com" onChange={handleChange} style={styles.input} required />
              </div>
            </>
          )}

          <div style={styles.buttonGroup}>
            {isMobile && step === 2 ? (
              <button type="button" onClick={() => setStep(1)} style={styles.resetBtn}>
                <ChevronLeft size={18} />
              </button>
            ) : (
              <button type="button" onClick={handleReset} style={styles.resetBtn}>
                <RotateCcw size={18} />
              </button>
            )}

            <button type="submit" style={styles.submitBtn}>
              {isMobile && step === 1 ? (
                <>Next <ChevronRight size={18} style={{marginLeft: '10px'}}/></>
              ) : (
                <>Submit Request <Send size={18} style={{marginLeft: '10px'}}/></>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <style>{`
        @media (max-width: 600px) {
          .form-row { flex-direction: column !important; gap: 15px !important; }
          div[style*="dimensionRow"] { gap: 5px !important; }
        }
      `}</style>
    </section>
  );
};

const styles = {
  fullWidthSection: { 
    backgroundColor: '#fff', 
    width: '100%', 
    minHeight: '85vh', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px 0' 
  },
  formCard: { 
    backgroundColor: '#0f0f0f', 
    width: '95%', 
    maxWidth: '600px', 
    borderRadius: '16px', 
    border: '1px solid #222', 
    padding: '0 0 40px 0', 
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    overflow: 'hidden', // Ensures progress bar and content stay within rounded corners
    transition: 'all 0.3s ease'
  },
  progressWrapper: { width: '100%', height: '6px', backgroundColor: '#222', marginBottom: '25px' },
  progressFill: { height: '100%', backgroundColor: '#3b82f6', transition: 'width 0.4s ease' },
  header: { padding: '0 30px', marginBottom: '20px' },
  title: { color: '#fff', fontSize: '1.6rem', fontWeight: '800', margin: 0 },
  subtitle: { color: '#555', fontSize: '0.85rem', marginTop: '5px' },
  form: { padding: '0 30px', display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 },
  row: { display: 'flex', gap: '15px', width: '100%' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px', flex: '1' },
  label: { color: '#888', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' },
  input: { backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '12px', borderRadius: '8px', color: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box' },
  dimensionRow: { display: 'flex', gap: '10px' },
  dimInput: { backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '12px', borderRadius: '8px', color: '#fff', width: '100%', textAlign: 'center', outline: 'none' },
  buttonGroup: { display: 'flex', gap: '12px', marginTop: 'auto' }, 
  resetBtn: { padding: '14px', backgroundColor: '#222', color: '#888', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  submitBtn: { flex: 1, padding: '14px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }
};

export default GetQuoteForm;