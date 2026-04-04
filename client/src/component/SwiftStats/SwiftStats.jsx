import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import './SwiftStats.css'

const RollingNumber = ({ target, duration = 3000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const countRef = useRef(0);

  useEffect(() => {
    if (inView) {
      let startTime = null;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = currentTime - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Linear interpolation: current = start + (end - start) * percentage
        const currentCount = Math.floor(target * percentage);
        
        setCount(currentCount);

        if (progress < duration) {
          requestAnimationFrame(animate);
        } else {
          setCount(target); // Ensure it hits the exact target at the end
        }
      };

      requestAnimationFrame(animate);
    }
  }, [inView, target, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const SwiftStats = () => {
  return (
    <div className="stats-wrapper">
      <div className="stat-card">
        <h3><RollingNumber target={34896} /></h3>
        <p>Packages Delivered</p>
      </div>
      <div className="stat-card">
        <h3><RollingNumber target={6848} /></h3>
        <i class="fa fa-plus" aria-hidden="true"></i>
        <p>Satisfied Clients</p>
      </div>
      <div className="stat-card">
        <h3><RollingNumber target={29} /></h3>
        <i class="fa fa-plus" aria-hidden="true"></i>
        <p>Years in Business</p>
      </div>
    </div>
  );
};

export default SwiftStats;