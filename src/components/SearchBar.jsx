import { useState } from "react";
import { FaSearch, FaMapMarkedAlt } from "react-icons/fa";

function SearchBar({ onSearch, onMapClick }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="search-bar">

      <div className="search-input">

        <FaSearch
          className="search-icon"
          onClick={handleSearch}
        />

        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

      </div>

      <button
        className="map-button"
        onClick={onMapClick}
      >
        <FaMapMarkedAlt />
      </button>

    </div>
  );
}

export default SearchBar;