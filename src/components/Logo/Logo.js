import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import neural from './neural.png';

function Logo(){
    return(
        <div className="ma4 mt0">
        <Tilt option={{max:50}} style={{height: '150px', width: '150px'}}>
            <div className="Tilt br2 shadow-2 pa3" style={{height: '150px'}}>
                <img alt='logo' src={neural} style={{paddingTop: '5px'}}/>
            </div>
        </Tilt>
        </div>
    );
}

export default Logo;