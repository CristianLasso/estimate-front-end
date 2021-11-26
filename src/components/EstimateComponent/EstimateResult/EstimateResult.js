import React, { useContext, useState } from "react";
import "./EstimateResult.css";
import AppContext from "../../../context/AppContext";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const EstimateResult = () => {

    const state = useContext(AppContext);

    return(
        <div className="estimateResult">
            <div className="text-container">
                <p>Resultado:</p>
                <p className="text">$0000</p>
            </div>
            <PriceCheckIcon fontSize="large" className="icon" />
        </div>
    );

};

export default EstimateResult;