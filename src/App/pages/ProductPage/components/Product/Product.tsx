import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from './Product.module.scss';
import Text from "components/Text";
import { useParams } from "react-router-dom";
import Button from "components/Button";
import {ProductType} from "types";


const Product: React.FC = () => {
    const {id} = useParams();
    const [product, setProduct] = useState<ProductType | {}>({});

    useEffect(() =>{
        const fetch = async () => {
            await axios({
                method: 'get',
                url: `https://api.escuelajs.co/api/v1/products/${id}`
            })
                .then((data: object) => {
                    const prod: ProductType = data.data;
                    setProduct(prod);
                })
        }
        fetch();
    }, [])


    return(
        <div className={styles.product_info}>
            <div className={styles.product_info__image_block}>
                <img src={product.images ? product.images[0] : ''} className={styles.product_info__image_block__img} alt="product image"/>
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
}

export default Product;