import React, { useContext, useState } from "react";
import TablePredictions from "../TablePredictions/TablePredictions";
import "./PredictList.css"
import AppContext from "../../context/AppContext"
import { useAuth } from '../../context/AuthContext';
import logo from "../../assets/Estimation.jpg"
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Map from '../../components/Map/Map';
import AppBar from "../../components/AppBar/AppBar"

import { auth } from '../../config/firebase/firebase';
import { useNavigate } from 'react-router-dom';
import { useGetPredictionsQuery } from "../../redux/api/mainAPI";

export const PredictList = () => {
    const state = useContext(AppContext);
    console.log(state.users.Predictions);
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const handleLogout = async () => {
        try {
          await logout();
          navigate('/login');
        } catch (error) {
          setError('Server Error')
        }
      }

    const handlePredictions = () => {
        navigate('/')
    }

    return(
        <Box className="background">
            <div className="container">
                <AppBar/>
                <div className="image">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="title">
                    <h2>Predicciones anteriormente realizadas por el usuario {state.users.name}</h2>
                </div>
                <TablePredictions></TablePredictions>
            </div>
        </Box>
    );
};