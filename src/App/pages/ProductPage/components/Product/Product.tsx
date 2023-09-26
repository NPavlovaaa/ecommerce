import React from "react";
import styles from './Product.module.scss';
import Text from "components/Text";
import Button from "components/Button";
import {observer} from "mobx-react";
import Slider from "components/Slider";
import {ProductModel} from "store/models/products/Product";


const Product: React.FC<ProductModel> = observer(({title, description, price, images}: ProductModel) => {
    return(
        <div className={styles.product_info}>
            <div className={styles.product_info__image_block}>
                <Slider images={images}/>
            </div>
            <div className={styles.product_info__desc}>
                <div className={styles.product_info__desc__text}>
                    <Text children={title ? title : ''} view="title"/>
                    <div>
                        <Text children={description ? description : ''} view="p-20" color="secondary"/>
                    </div>
                </div>
                <div className={styles.product_info__desc__price}>
                    <Text children={`$${price ? price : ''}`} view="title"/>
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