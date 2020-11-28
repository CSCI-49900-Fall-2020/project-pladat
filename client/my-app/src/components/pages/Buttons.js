import React, { Component } from 'react';
import "./styles/Buttons.css"

import Redo from '../uiComponents/redo.svg';
import Dislike from '../uiComponents/dislike.svg';
import SuperLike from '../uiComponents/superLike.svg';
import Like from '../uiComponents/like.svg';
import Boost from '../uiComponents/lightning.svg';

function Buttons() {
    return (
        
        <div className="buttons">
            <button className="button_1">
                <img src={Redo} alt="Redo" className="buttonimg" />
            </button>
            <button className="button_2">
                <img src={Dislike} alt="Dislike" className="buttonimg" />
            </button>
            <button className="button_3">
                <img src={SuperLike} alt="SuperLike" className="buttonimg" />
            </button>
            <button className="button_4">
                <img src={Like} alt="Like" className="buttonimg" />
            </button>
            <button className="button_5">
                <img src={Boost} alt="Boost" className="buttonimg" />
            </button>
        </div>
        );
    }

    /* SVGs also hosted at 
        Redo: https://svgshare.com/i/Rrr.svg
        Dislike: https://svgshare.com/i/RrL.svg
        SuperLike: https://svgshare.com/i/Rs0.svg
        Like: https://svgshare.com/i/Rre.svg 
        Boost: https://svgshare.com/i/RsB.svg 
    */

    export default Buttons