import React, { useState } from "react";
import * as uuid from "uuid";
import { db } from "../config/firebase/firebase"
import { collection, deleteDoc, doc , setDoc, getDocs, getDoc } from "firebase/firestore";
import md5 from 'md5';
import { auth } from '../config/firebase/firebase';

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
  const [estimate, setEstimate] = useState(null);
  const [users, setCurrentUser] = useState(null);

  const saveEstimate = (textArea, textRoom, textBath, textGarage, textStratus, textLat, textLon) => {
    const newEstimate = {
      area: textArea,
      room: textRoom,
      bath: textBath,
      garage: textGarage,
      stratus: textStratus,
      lat: textLat,
      lon: textLon
    }
    estimateCost(newEstimate);
  }

  const estimateCost = (newEstimate) => {
      console.log("Recibido " + newEstimate.room);
  }

  ////////////////////////////////////////////////////////////////////

  const getUser = async(userId) => {
    const datos = await getDoc(doc(db,'usuarios', userId))
    console.log(datos.data().user.name)
    setCurrentUser(datos.data().user)
    
  }

  const findUser = async(userId) => {
    const datos = await getDoc(doc(db,'usuarios', userId))
    return datos.data().user
  }

  const setUser = ( newName, newLastName) => {
    if(newName !== ""){
      users.name = newName
    }
    if(newLastName !== ""){
      users.lastName = newLastName
    }
    postUserBD(users)
  };



  const postUserBD = async(user) =>{
    try {
      await setDoc(doc(db, "usuarios", user.id), 
      {user});
      getUser(user.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  const saveUser = (userName, userLastName, userEmail, userPassword) => {
    const newUser = {
      id: auth.currentUser.uid,
      name: userName,
      lastName: userLastName,
      email: userEmail,
      password: md5(userPassword)
    };

    postUserBD(newUser);
  };



  const deleteUser = async (userId) => {
    await deleteDoc(doc(db, "usuarios", userId));
  };

  const state = {
    estimate,
    setEstimate,
    saveEstimate,
    /////////////
    users,
    setCurrentUser,
    getUser,
    setUser,
    saveUser,
    deleteUser,
    findUser
  };

  return (
    <AppContext.Provider value={state} displayName="AppContext">
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContext;
