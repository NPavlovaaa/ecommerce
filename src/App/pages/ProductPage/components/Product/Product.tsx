import React, {FC} from "react";
import styles from './Product.module.scss';
import Text from "components/Text";
import Button from "components/Button";
import {observer} from "mobx-react";
import Slider from "components/Slider";
import {ProductModel} from "store/models/products/Product";
import rootStore from "store/RootStore/instance";


const Product: FC<ProductModel> = observer(({id, title, description, price, images}: ProductModel) => {
    const cartStore = rootStore.cart;

    const addToCart = (id: number) => {
        cartStore.setKeyCartList(id);
    }

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
                        <Button
                            onClick={() => addToCart(id)}
                            children="Add to cart"
                            style={{
                                backgroundColor: 'transparent',
                                border: '1px solid #AFADB5',
                                color: 'black'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Product;