import React, {FC} from "react";
import styles from "./Slider.module.scss";
import Carousel from 'framer-motion-carousel';

type Props = {
    images: Array<string>
}

const Slider: FC<Props> = ({images}: Props) => (
    <Carousel autoPlay={false} loop={true} interval={2000} children={
        images ? images.map((item: string) => (
            <div className={styles.image_block}>
                <img src={item} className={styles.image_block__img} alt="Product image"/>
            </div>
        ))
        : null}
    />
)
export default Slider