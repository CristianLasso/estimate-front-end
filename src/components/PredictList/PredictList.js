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

import { auth } from '../../config/firebase/firebase';
import { useNavigate } from 'react-router-dom';

export const PredictList = () => {

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
                <div className="row">
                    <div className="logout"></div>
                    <Button onClick={handlePredictions} variant="contained" color="success" startIcon={<AccountCircleIcon fontSize="large"/>}>
                        Predictions
                    </Button>
                    <div className="logout"></div>
                    <Button onClick={handleLogout} variant="contained" color="success" startIcon={<AccountCircleIcon fontSize="large"/>}>
                        Logout
                    </Button>
                    
                </div>
                <div className="image">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="title">
                    <h2>Predicciones anteriormente realizadas</h2>
                </div>
                <TablePredictions></TablePredictions>
            </div>
        </Box>
    );
};