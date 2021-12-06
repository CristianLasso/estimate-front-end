import './App.css';
import { AppContextWrapper } from "./context/AppContext";

import React from 'react';

import { Login } from './components/Login/Login';
import { SignUp } from './components/SignUp/SignUp';
import { EstimatePage } from './pages/EstimatePage/EstimatePage';

import { AuthProvider } from './context/AuthContext';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { PredictList } from './components/PredictList/PredictList';

function App() {
  return (
    <AppContextWrapper>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path='/login' element={<Login/>} />
            <Route exact path='/signup' element={<SignUp/>} />
            <Route exact path='/' element={<PrivateRoute/>}>
              <Route exact path='/' element={<EstimatePage/>}/>
              <Route exact path='/predictList' element={<PredictList/>}/>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </AppContextWrapper>
    
  );
}

export default App;
