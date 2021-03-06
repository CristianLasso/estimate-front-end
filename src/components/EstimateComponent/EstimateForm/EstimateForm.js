import React, { useContext, useState } from "react";
import "./EstimateForm.css";
import AppContext from "../../../context/AppContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNearHousesMutation, usePredictMutation } from "../../../redux/api/mainAPI";
import {auth} from "../../../config/firebase/firebase";
import Swal from 'sweetalert2'

const EstimateForm = () => {

    const state = useContext(AppContext);
    const [area, setArea] = useState("");
    const [room, setRoom] = useState("");
    const [bath, setBath] = useState("");
    const [garage, setGarage] = useState("");
    const [stratus, setStratus] = useState("");
    const [lat, setLat] = useState(state.lat);
    const [lon, setLon] = useState(state.lon);
    const [predictReq, {isSuccess : predictLoading, data:priceResp}] = usePredictMutation();
    const [nearHousesReq, {isLoading: nearHousesLoading, data:nearHouses}] = useNearHousesMutation();

    const handleClick = async (event) => {
        setLat(state.marker[0]);
        setLon(state.marker[1]);
        if((area === "" || room === "" || bath === "" || garage === "" || stratus === "" || state.marker[0]==="" || state.marker[1] === "")){
            return (
                Swal.fire({
                    title: 'Falta algo?',
                    text: 'Asegurate de completar todos los campos!',
                    icon: 'question',
                    confirmButtonColor: '#388e3c',
                    confirmButtonText: "Entendido!"
                }))
        }
        state.saveEstimate(area, room, bath, garage, stratus, lat, lon);
        const prediction = {
            area: area,
            rooms: room,
            bathrooms: area,
            garages: garage,
            sel: stratus,
            latitude: state.marker[0],
            longitude: state.marker[1],
            userId: auth.currentUser.uid
        };
        const latlng = {
            latitude: state.marker[0],
            longitude: state.marker[1]
        };
        predictReq(prediction);
        state.setEstimateCost(priceResp);
        state.getUser(auth.currentUser.uid);
    };

    const estratos = [
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        },
        {
            value: '3',
            label: '3',
        },
        {
            value: '4',
            label: '4',
        },
        {
            value: '5',
            label: '5',
        },
      ];

    return (
        <form className="estimateForm">
            <div>
                <div className="container">
                    <TextField
                        color="success"
                        variant="filled"
                        className="input"
                        required={true}
                        label="Area (m??)"
                        type="number"
                        value={area}
                        onChange={(event) => setArea(event.target.value)}
                    />
                    <TextField
                        color="success"
                        variant="filled"
                        className="input"
                        required={true}
                        label="Habitaciones"
                        type="number"
                        value={room}
                        onChange={(event) => setRoom(event.target.value)}
                    />
                    <TextField
                        color="success"
                        variant="filled"
                        className="input"
                        required={true}
                        label="Ba??os"
                        type="number"
                        value={bath}
                        onChange={(event) => setBath(event.target.value)}
                    />
                    <TextField
                        color="success"
                        variant="filled"
                        className="input"
                        required={true}
                        label="Garajes"
                        type="number"
                        value={garage}
                        onChange={(event) => setGarage(event.target.value)}
                    />
                </div>
                <div className="container">
                    <TextField
                        select
                        color="success"
                        variant="filled"
                        className="input"
                        required={true}
                        label="Estrato"
                        value={stratus}
                        onChange={(event) => setStratus(event.target.value)}
                    >
                        {estratos.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                            {option.label}
                            </MenuItem>
                        ))}

                    </TextField>
                    <TextField
                        color="success"
                        variant="filled"
                        className="input"
                        required={true}
                        label="Latitud"
                        type="number"
                        disabled={true}
                        value={state.marker[0]}
                        
                    />
                    <TextField
                        color="success"
                        variant="filled"
                        className="input"
                        required={true}
                        label="Longitud"
                        type="number"
                        disabled={true}
                        value={state.marker[1]}
                    />
                </div>
                <div className="container">
                    <Button
                        className="button"
                        variant="contained"
                        color="success"
                        onClick={handleClick}
                    >
                        Predecir Precio
                    </Button>
                </div>
                
            </div>
        </form>
    );

};

export default EstimateForm;