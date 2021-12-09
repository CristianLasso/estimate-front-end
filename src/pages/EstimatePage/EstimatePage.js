import React, { useContext, useState } from "react";
import EstimateForm from "../../components/EstimateComponent/EstimateForm/EstimateForm"
import EstimateResult from "../../components/EstimateComponent/EstimateResult/EstimateResult"
import AppBar from "../../components/AppBar/AppBar"
import "./EstimatePage.css"
import AppContext from "../../context/AppContext"
import { useAuth } from '../../context/AuthContext';
import logo from "../../assets/Estimation.jpg"
import Box from '@mui/material/Box';
import Map from '../../components/Map/Map';

import { useNavigate } from 'react-router-dom';

export const EstimatePage = () => {
    const state = useContext(AppContext);

    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    return(
        <Box className="background">
            <div className="container">
                <AppBar/>
                <div className="image">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="title">
                    <h2>Registre la información de la vivienda </h2>
                </div>
                <div className="row">
                    <EstimateForm latData={lat} lngData={lng} />
                    <EstimateResult />
                </div>
                <Map latData={setLat} lngData={setLng} ></Map>
            </div>
        </Box>
    );
};