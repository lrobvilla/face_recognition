import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <p className="f3">
                {'Please enter below the url of the image you want to detect faces in'}
            </p>
            <div className="center0">
                <div className="form center0 pa4 br3 shadow-5">
                    <input className="f4 pa2 w-70" type='text' onChange={onInputChange}/>
                    <button 
                        className="w-39 grow f4 link ph3 pv2 dib white bg-light-green"
                        style={{color: 'black'}}
                        onClick={onButtonSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;