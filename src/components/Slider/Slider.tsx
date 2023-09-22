import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styles';
import React from "react";

const Slider = ({images}) => {

    return(
    <AwesomeSlider cssModule={AwesomeSliderStyles}>
        {images && images.map(item => {
            return <div data-src={item}/>
        })}
    </AwesomeSlider>
)};
export default Slider;