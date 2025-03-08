import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";
import "../css/map.css"; 


const GOOGLE_MAPS_API_KEY = "AIzaSyCNKgjJFtvlUjPez_22J4mGSCAjXrTeDx8";

const Map = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(userLocation);
          getDirections(userLocation);
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const getDirections = (userLocation) => {
    if (!window.google || !window.google.maps) {
      console.error("Google Maps API is not loaded yet.");
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    const dlsudLocation = { lat: 14.2850, lng: 120.9584 }; // DLSU-D loc

    directionsService.route(
      {
        origin: userLocation,
        destination: dlsudLocation,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error("Directions request failed. Status:", status);
          console.error("STUPID ASS API KEY ");
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <div className="map-container">
        <GoogleMap
          center={currentLocation || { lat: 0, lng: 0 }}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
