import React, { useContext, useState } from "react";
import "./EstimateResult.css";
import AppContext from "../../../context/AppContext";
import PriceCheckIcon from '@mui/icons-material/PriceCheck';

const EstimateResult = () => {

    
    const state = useContext(AppContext);
    //const [estimate, setEstimate] = useState("");

    return(
        <div className="estimateResult">
            <div className="text-container">
                <p className="text">Resultado:</p>
                <p className="text">$ {state.estimateCost}</p>
            </div>
            <PriceCheckIcon fontSize="large" className="icon" />
        </div>
    );

};

export default EstimateResult;