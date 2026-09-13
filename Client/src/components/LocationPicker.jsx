import { useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapController({ position }) {
    const map = useMap();

    if (position) {
        map.flyTo(position, 16);
    }

    return null;
}




const LocationPicker = () => {
    const [position, setPosition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayMap, setDisplayMap] = useState(false);

    const closeMap = () => {
        setDisplayMap(false)
    }

    const getLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser.");
            return;
        }

        setLoading(true);
        // setDisplayMap(true);

        navigator.geolocation.getCurrentPosition(
            (location) => {
                const { latitude, longitude } = location.coords;

                setPosition([latitude, longitude]);
                setLoading(false);
            },
            (error) => {
                console.log(error);
                setLoading(false);

                alert("Unable to get your location.");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    };

    return (
        <>

            <div>



                <button onClick={getLocation}>
                    {loading ? "Getting location..." : "Use My Location"}
                </button>

                {position && (

                    <p>
                        Latitude: {position[0]} <br />
                        Longitude: {position[1]}
                    </p>

                )};


                {displayMap && (


                    <div className="d-flex gap-3 justify-content-between w-50  ">

                        <MapContainer
                            center={[6.5244, 3.3792]}
                            zoom={13}
                            style={{ height: "400px", width: "100%" }}
                            className="my-4 "
                        >


                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {position && (
                                <>
                                    <Marker position={position}>
                                        <Popup>
                                            You are here 📍
                                        </Popup>
                                    </Marker>

                                    <MapController position={position} />
                                </>
                            )}
                        </MapContainer>

                        <div className=" ">
                            <button
                                onClick={closeMap}
                                className="text-white hover:text-gray-300  "
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default LocationPicker;