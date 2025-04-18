import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "@reach/combobox/styles.css";
import { Link } from "react-router-dom";

const libraries = ["places"];
const mapContainerStyle = {
  height: "90vh",
  width: "90vw",
  backgroundColor: "#f5f5f5",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 33.6002358,
  lng: 72.9530566,
};

const App = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = useState([]);
  const [filteredMarkers, setFilteredMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/product-inventory/product-list/"
        );
        setMarkers(response.data);
        setFilteredMarkers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = markers.filter((marker) =>
      marker.available_location.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredMarkers(filtered);
  }, [markers, filter]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div style={{padding:"2px 2px 2px 10px" }} >
      <div>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Filter by location..."
          style={{
            padding: "10px 15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "300px",
            marginBottom: "20px",
          }}
        />
      </div>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {filteredMarkers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            onClick={() => {
              setSelected(marker);
            }}
            icon={{
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 15),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            animation={selected === marker ? window.google.maps.Animation.BOUNCE : null}
          >
            {selected === marker && (
              <InfoWindow
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <Link to={`/product/${marker.id}`}>
                  <h3>{marker.title}</h3>
                  <p>Price: {marker.price}</p>
                  <p>Store Location: {marker.available_location}</p>
                  <img
                    width="300"
                    height="300"
                    src={`http://127.0.0.1:8000//${marker?.image}`}
                    alt="Product"
                  />
                  </Link>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </div>
  );
};

export default App;
