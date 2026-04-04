import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

// 1. Fix for default Leaflet marker icons not showing in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({ iconUrl: icon, shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
L.Marker.prototype.options.icon = DefaultIcon;

// 2. Custom "Shining/Pulsing" Icon for Actual Location
const shiningIcon = L.divIcon({
  className: 'custom-pulsing-icon',
  html: `<div class="pulse"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

// 3. Routing Component (Inner component to access map instance)
const Routing = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length < 2) return;

    const routingControl = L.Routing.control({
      waypoints: points.map(p => L.latLng(p.lat, p.lon)),
      lineOptions: { styles: [{ color: "#242dff", weight: 6 }] },
      show: false, // Hide the text instructions panel
      addWaypoints: false,
      routeWhileDragging: false,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, points]);

  return null;
};

const RouteMap = ({ originAddr, destAddr, actualAddr }) => {
  const [coords, setCoords] = useState([]); // [{lat, lon, label}]
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoords = async () => {
      const addresses = [
        { label: 'Origin', query: originAddr },
        { label: 'Actual Location', query: actualAddr },
        { label: 'Destination', query: destAddr }
      ];

      try {
        const results = await Promise.all(
          addresses.map(async (addr) => {
            const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(addr.query)}`);
            const data = await res.json();
            return data[0] ? { lat: data[0].lat, lon: data[0].lon, label: addr.label } : null;
          })
        );
        setCoords(results.filter(r => r !== null));
      } catch (err) {
        console.error("Geocoding failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoords();
  }, [originAddr, destAddr, actualAddr]);

  if (loading) return <div>Calculating Route...</div>;

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <style>{`
        .pulse {
          width: 15px;
          height: 15px;
          background: #ff4d4d;
          border-radius: 50%;
          box-shadow: 0 0 0 rgba(255, 77, 77, 0.4);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255, 77, 77, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(255, 77, 77, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 77, 77, 0); }
        }
      `}</style>
      
      <MapContainer center={[0, 0]} zoom={2} style={{ height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {coords.map((pos, idx) => (
          <Marker 
            key={idx} 
            position={[pos.lat, pos.lon]} 
            icon={pos.label === 'Actual Location' ? shiningIcon : DefaultIcon}
          >
            <Popup>{pos.label}</Popup>
          </Marker>
        ))}

        {coords.length >= 2 && <Routing points={coords} />}
      </MapContainer>
    </div>
  );
};

export default RouteMap;