import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const Map = (props) => {

    return(
        <LoadScript
        googleMapsApiKey="AIzaSyAiX6ZDnsSXRDNXtif-hFt5C5WYSaPrV8Y"
        >
            <GoogleMap
                mapContainerStyle={{width: '1500px', height: '600px'}}
                center={{lat:4.60971, lng:-74.08175}}
                zoom={10}
            >  
            </GoogleMap>
        </LoadScript>
    ); 
}

export default Map;