import React, { useState } from "react";
import * as uuid from "uuid";
import { db } from "../config/firebase/firebase"
import { collection, deleteDoc, doc , setDoc, getDocs, getDoc } from "firebase/firestore";
import md5 from 'md5';
import { auth } from '../config/firebase/firebase';

const AppContext = React.createContext();

export const AppContextWrapper = (props) => {
  const [estimate, setEstimate] = useState("");
  const [users, setUsers] = useState(null);
  const [estimateCost, setEstimateCost] = useState(0);

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
  }


  ////////////////////////////////////////////////////////////////////

  const getUser = async(userId) => {
    console.log(userId)
    const datos = await getDoc(doc(db,'users', userId))
    console.log(datos.data())
    setUsers(datos.data())
    
  }

  const findUser = async(userId) => {
    const datos = await getDoc(doc(db,'users', userId))
    return datos.data()
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
      await setDoc(doc(db, "users", user.id), 
      {id: auth.currentUser.uid,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: md5(user.password)});
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
    await deleteDoc(doc(db, "users", userId));
  };

  const state = {
    estimate,
    setEstimate,
    saveEstimate,
    estimateCost,
    setEstimateCost,
    /////////////
    users,
    setUsers,
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
