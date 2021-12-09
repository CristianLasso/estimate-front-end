import React, { useState, useContext } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import AppContext from "../../context/AppContext"
const Map = (props) => {

    const [marker, setMarker] = useState({lat: props.lat , lng: props.lng});
    const [center, setCenter] = useState({lat:4.60971, lng:-74.08175})
    const state = useContext(AppContext);
    return(
        <LoadScript
        googleMapsApiKey="AIzaSyAiX6ZDnsSXRDNXtif-hFt5C5WYSaPrV8Y"
        >
            <GoogleMap
                mapContainerStyle={{width: '1460px', height: '600px'}}
                center={center}
                zoom={12}

                onClick={(event) => {
                    setMarker(event.latLng);
                    let latLngValue = event.latLng.toUrlValue().split(",");
                    console.log(latLngValue);
                    setCenter({lat: parseFloat(latLngValue[0]), lng:parseFloat(latLngValue[1])});
                    state.setMarker(latLngValue);
                    props.latData(event.latLng.lat);
                    props.lngData(event.latLng.lng);
                    
                }}
            >  
                <Marker key="marker" position={marker}></Marker>
            </GoogleMap>
        </LoadScript>
    ); 
}

export default Map;