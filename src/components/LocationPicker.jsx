import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function LocationPicker({ onSelect, onClose }) {
  const [position, setPosition] = useState(null);

  return (
    <div className="location-picker-overlay">
      <div className="location-picker-box">

        <div className="location-picker-header">
          <h3>Click on the map to pick a location</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          style={{ height: "450px", width: "100%" }}
        >
         <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  subdomains="abcd"
/>
          <ClickHandler onPick={(lat, lng) => setPosition([lat, lng])} />
          {position && <Marker position={position} icon={icon} />}
        </MapContainer>

        <button
          className="confirm-location-btn"
          disabled={!position}
          onClick={() => position && onSelect(position[0], position[1])}
        >
          Use this location
        </button>

      </div>
    </div>
  );
}

export default LocationPicker;