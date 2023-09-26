import React from "react";
import styles from './Product.module.scss';
import Text from "components/Text";
import Button from "components/Button";
import {observer} from "mobx-react";
import Slider from "components/Slider";


const Product: React.FC = observer(({product}) => {
    return(
        <div className={styles.product_info}>
            <div className={styles.product_info__image_block}>
                <Slider/>
            </div>
            <div className={styles.product_info__desc}>
                <div className={styles.product_info__desc__text}>
                    <Text children={product.title ? product.title : ''} view="title"/>
                    <div>
                        <Text children={product.description ? product.description : ''} view="p-20" color="secondary"/>
                    </div>
                </div>
                <div className={styles.product_info__desc__price}>
                    <Text children={`$${product.price ? product.price : ''}`} view="title"/>
                    <div className={styles.product_info__desc__price__button}>
                        <Button children="Buy now"/>
                        <Button children="Add to cart"/>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Product;