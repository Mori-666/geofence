import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useState } from "react";
import { MapContainer } from "react-leaflet";
import "react-leaflet-fullscreen/dist/styles.css";
import { toast } from "react-toastify";
import { Button } from "reactstrap";
import "./App.css";
import MapView from "./components/MapView";

function App() {
  // Hard coded coordinates for customer
  const [customerLocation, setCustomerLocation] = useState([
    36.53865161288887, 52.67648220062256,
  ]);
  const [area, setArea] = useState(null);

  // Send the shape coordinates to server
  const handleSendOnClick = () => {
    // e.g: axios.post("URL",{coordinates : area})
    setTimeout(() => {
      toast.success("با موفقیت ارسال شد");
    }, 2000);
    console.log("sending to server...", area);
  };

  return (
    <div className="App">
      <MapContainer
        center={customerLocation}
        zoom={13}
        style={{ height: "80vh" }}
      >
        <MapView customerLocation={customerLocation} setArea={setArea} />
      </MapContainer>
      <Button
        color="info"
        className="mt-5"
        disabled={!area}
        onClick={handleSendOnClick}
      >
        Send
      </Button>
    </div>
  );
}

export default App;
