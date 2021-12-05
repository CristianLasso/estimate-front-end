import React, { useContext, useState } from "react";
import "./EstimateForm.css";
import AppContext from "../../../context/AppContext";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { usePredictMutation } from "../../../redux/api/mainAPI";

const EstimateForm = (props) => {

    const state = useContext(AppContext);

    const [area, setArea] = useState("");
    const [room, setRoom] = useState("");
    const [bath, setBath] = useState("");
    const [garage, setGarage] = useState("");
    const [stratus, setStratus] = useState("");
    const [lat, setLat] = useState(props.latData);
    const [lon, setLon] = useState(props.lngData);
    console.log(lat)
    console.log(lon)
    const [predictReq, {isLoading: predictLoading, data:priceResp}] = usePredictMutation();

    const handleClick = async (event) => {
        state.saveEstimate(area, room, bath, garage, stratus, lat, lon);
        const prediction = {
            area: area,
            rooms: room,
            bathrooms: area,
            garages: garage,
            sel: stratus,
            longitude: lon,
            latitude: lat,
        }
        await predictReq(prediction);
        console.log(priceResp);
        state.estimateCost(priceResp);
        // setArea("");
        // setRoom("");
        // setBath("");
        // setGarage("");
        // setStratus("");
        // setLat("");
        // setLon("");
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
                        label="Area (m²)"
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
                        label="Baños"
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
                        value={lat}
                        onChange={(event) => setLat(event.target.value)}
                    />
                    <TextField
                        color="success"
                        variant="filled"
                        className="input"
                        required={true}
                        label="Longitud"
                        type="number"
                        value={lon}
                        onChange={(event) => setLon(event.target.value)}
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