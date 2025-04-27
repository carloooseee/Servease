import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from "@react-google-maps/api";
import "../css/map.css";

const Key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
console.log("Google Maps API Key:", Key); // you can remove this later

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [dlsudLocation, setDlsudLocation] = useState(null);
  const [destination, setDestination] = useState(""); // Track user input destination
  const [destinationLatLng, setDestinationLatLng] = useState(null); // Lat/Lng of destination

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
          setDlsudLocation(userLocation);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getDirections = () => {
    if (!destination) {
      console.error("No destination set.");
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    // Geocode the address entered by the user
    geocoder.geocode({ address: destination }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const destinationLatLng = results[0].geometry.location;
        setDestinationLatLng(destinationLatLng);

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
          {
            origin: currentLocation,
            destination: destinationLatLng,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            console.log("Directions service status:", status);
            if (status === window.google.maps.DirectionsStatus.OK) {
              console.log("Directions result:", result); 
              setDirections(result);
            } else {
              console.error("Directions request failed. Status:", status);
            }
          }
        );
      } else {
        console.error("Geocode failed: " + status);
      }
    });
  };

  return (
    <LoadScript googleMapsApiKey={Key}>
      <div className="map-container">
        {/* Floating controls */}
        <div className="map-controls">
          <input
            type="text"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)} 
          />
          <button onClick={getDirections}>Get Directions</button>
        </div>

        <GoogleMap
          center={currentLocation || { lat: 0, lng: 0 }}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {/* Render directions if available */}
          {directions && <DirectionsRenderer directions={directions} />}

          {/* Optionally, render a marker at the destination */}
          {destinationLatLng && <Marker position={destinationLatLng} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
