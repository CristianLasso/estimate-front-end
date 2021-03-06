import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css"
import AppContext from "../../context/AppContext"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Swal from 'sweetalert2'
import background from "../../assets/bluewall.jpg"

import { useAuth } from '../../context/AuthContext';

import { auth } from '../../config/firebase/firebase';



export const Login = () => {
  const state = useContext(AppContext);

  const { login } = useAuth();
  const { loginGoogle } = useAuth();
  const { loginFacebook } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = e => setEmail(e.target.value);
  const handlePassword = e => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      state.getUser(auth.currentUser.uid)
      state.setEstimateCost(0);
      navigate('/home/estimate');
    } catch (error) {
      console.log(error);
      setError('Datos incorrectos');
      setTimeout(() => setError(''), 1500);
      return (Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Verifica que tu información sea correcta!',
        confirmButtonColor: '#388e3c',
        confirmButtonText: "Entendido!"
      }))
    }
  }

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginGoogle();
      state.saveUser(auth.currentUser.displayName,"User",auth.currentUser.email, "Password");
      navigate('/home/estimate');
    } catch (error) {
      setError('Datos incorrectos');
      setTimeout(() => setError(''), 1500);
    }
    navigate('/home/estimate');
  }

  const handleFacebookLogin = async (e) => {
    e.preventDefault();
    try {
      await loginFacebook();
      state.getUser(auth.currentUser.uid)
      navigate('/home/estimate');
    } catch (error) {
      setError('Datos incorrectos');
      setTimeout(() => setError(''), 1500);
    }
    navigate('/home/estimate');
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height:400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 4,
  };

  const inputStyle = {
    width:300
  }


  return (
    <Box>
        <img width="100%" height="100%" src={background} alt="background" />
        <Box sx={style}>
          <Box >
            
            <Typography sx={{textAlign:'center'}} id="modal-modal-title" variant="h2" component="h1">
                Iniciar Sesion
              </Typography>
          </Box>
          <Box sx={{display:"flex", flexDirection: 'column' , alignItems: 'center', }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{marginTop:2}}>
                <Input color="success" sx={inputStyle} type='email' placeholder='Email' onChange={handleEmail} />
              </Box>
              <Box sx={{marginTop:5}}>
                <Input color="success" sx={inputStyle} type='password' placeholder='Contraseña' onChange={handlePassword} />
              </Box>   
              <Button color="success" sx={{marginTop:5, marginLeft:12}} variant="outlined" type='submit' value='Entrar'>Entrar</Button>
            </form>
            <div/>
            <Button sx={{marginTop:2}} onClick={handleGoogleLogin} variant="outlined" color="success" startIcon={<GoogleIcon fontSize="large"/>}>Entra con Google</Button>
            <Button disabled sx={{marginTop:2}} onClick={handleFacebookLogin} variant="outlined" color="success" startIcon={<FacebookIcon fontSize="large"/>}>Entra con Facebook</Button>
            <p>No tienes una cuenta? <Link to='/signup'>Registrate</Link> </p>
          </Box>
        </Box>
    </Box>
      
  )
}
