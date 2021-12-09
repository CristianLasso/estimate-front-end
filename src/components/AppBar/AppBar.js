import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./AppBar.css"

import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ButtonAppBar() {

    const { logout } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogout = async () => {
        try {
          await logout();
          navigate('/');
        } catch (error) {
          setError('Server Error')
        }
    }
    
    const handlePredictions = () => {
        navigate('/home/predictList')
    };

  return (
    <Box className="background">
      <AppBar color="success" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Stimate App
          </Typography>
          <Button className="button" onClick={handlePredictions} color="inherit" startIcon={<ApartmentIcon fontSize="large"/>}>Predictions</Button>
          <Button className="button" onClick={handleLogout} color="inherit" startIcon={<AccountCircleIcon fontSize="large"/>}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}