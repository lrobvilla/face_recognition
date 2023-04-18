import React from "react";
import './FaceRecognition.css';


const FaceRecognition = ({imageUrl, boxes}) => {
    return !imageUrl.length?
        <p></p>:
        (
            <div className="center0 ma">
                <div className="absolute mt2">
                    <img id='input_image' alt="pic1" src={imageUrl} width="500px" height="auto"/>
                    {Object.entries(boxes).map((region, index) => (
                        <div key={index} className="bounding-box" style={{top: region[1].topRow, right: region[1].rightCol, bottom: region[1].bottomRow, left: region[1].leftCol}}></div>
                    ))
                    }
                </div>
            </div>
        );
}

export default FaceRecognition;