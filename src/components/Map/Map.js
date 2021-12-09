import React, { useState } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = (props) => {

    const [marker, setMarker] = useState({lat: props.lat , lng: props.lng});

    return(
        <LoadScript
        googleMapsApiKey="AIzaSyAiX6ZDnsSXRDNXtif-hFt5C5WYSaPrV8Y"
        >
            <GoogleMap
                mapContainerStyle={{width: '1460px', height: '600px'}}
                center={{lat:4.60971, lng:-74.08175}}
                zoom={12}

                onClick={(event) => {
                    setMarker(event.latLng);
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