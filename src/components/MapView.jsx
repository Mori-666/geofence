import React, { useCallback, useEffect, useState } from "react";
import { Circle, FeatureGroup, Marker, Popup, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { FullscreenControl } from "react-leaflet-fullscreen";
import { toast } from "react-toastify";

const MapView = ({ customerLocation, setArea }) => {
  const [myLocation, setMyLocation] = useState([
    36.53325161285887, 52.67648420062456,
  ]);
  const [needToAlert, setNeedToAlert] = useState(false);

  // Calculates the distance between two points
  const handleOnMarkerMove = useCallback(
    (e) => {
      setMyLocation(e.latlng);
      if (e.latlng?.distanceTo(customerLocation) < 100) {
        setNeedToAlert(true);
      } else {
        setNeedToAlert(false);
      }
    },
    [customerLocation]
  );

  //
  useEffect(() => {
    // Checks if you are close enough to alert you
    if (needToAlert) {
      toast.success("You are getting close to customer !");
    }
  }, [needToAlert]);
  //
  return (
    <>
      <FeatureGroup>
        <EditControl
          position="topright"
          onEdited={(e) =>
            e.layers.eachLayer((a) => {
              setArea(a.layer.toGeoJSON()?.geometry?.coordinates);
            })
          }
          onCreated={(e) => {
            e.layer.toGeoJSON();
            setArea(e.layer.toGeoJSON()?.geometry?.coordinates[0]);
          }}
        />
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* The hypothetical customer */}
      <Marker position={customerLocation}>
        <Popup>Im Here !</Popup>
      </Marker>
      {/* The hypothetical service guy */}
      <Marker
        eventHandlers={{
          move: handleOnMarkerMove,
        }}
        position={myLocation}
        draggable
      ></Marker>
      <Circle center={customerLocation} radius={100} />
      <FullscreenControl />
    </>
  );
};

export default MapView;
