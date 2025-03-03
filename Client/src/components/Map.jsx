import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useRef, useState } from "react";
import "../css/map.css";
const center = { lat: 48.8584, lng: 2.2945 };

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");

  const originRef = useRef();
  const destiantionRef = useRef();

  if (!isLoaded) {
    return <p>Loading...</p>; // Replaced SkeletonText with simple text
  }

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "100%" }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={(map) => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>

      <div
        style={{
          padding: "16px",
          borderRadius: "10px",
          margin: "16px",
          backgroundColor: "white",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          minWidth: "300px",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: "8px", justifyContent: "space-between" }}>
          <div style={{ flexGrow: 1 }}>
            <Autocomplete>
              <input type="text" placeholder="Origin" ref={originRef} style={{ width: "100%", padding: "8px" }} />
            </Autocomplete>
          </div>
          <div style={{ flexGrow: 1 }}>
            <Autocomplete>
              <input type="text" placeholder="Destination" ref={destiantionRef} style={{ width: "100%", padding: "8px" }} />
            </Autocomplete>
          </div>
          <div>
            <button onClick={calculateRoute}>
              Calculate Route
            </button>
            <button onClick={clearRoute} style={{ padding: "8px", background: "none", border: "none", cursor: "pointer" }}>
              <FaTimes />
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", marginTop: "16px", justifyContent: "space-between" }}>
          <p>Distance: {distance} </p>
          <p>Duration: {duration} </p>
          <button
            onClick={() => {
              map.panTo(center);
              map.setZoom(15);
            }}
            style={{
              padding: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
              borderRadius: "50%",
            }}
          >
            <FaLocationArrow />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
