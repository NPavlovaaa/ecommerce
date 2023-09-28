import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/cube-animation.css';
import React, {FC} from "react";

type Props = {
    images: Array<string>
}

const Slider: FC<Props> = ({images}: Props) => {
    console.log('images', images)
    return(
    <AwesomeSlider animation="cubeAnimation">
        {images ? images.map((item: string) => {
            return <div data-src={item}/>
        }) : null}
    </AwesomeSlider>
)};
export default Slider;