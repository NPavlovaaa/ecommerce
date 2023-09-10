import React, {useEffect, useState} from "react";
import axios from "axios";
import styles from './Product.module.scss';
import Text from "components/Text";
import { useParams } from "react-router-dom";
import Button from "../../../../../components/Button";


const Product: React.FC = () => {
    const {id} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() =>{
        const fetch = async () => {
            await axios({
                method: 'get',
                url: `https://api.escuelajs.co/api/v1/products/${id}`
            })
                .then((data: object)=> {
                    const prod: object = {
                        id: data.data.id,
                        title: data.data.title,
                        images: data.data.images,
                        description: data.data.description,
                        price: data.data.price,
                    }
                    setProduct(prod);
                })

        }
        fetch();
    }, [])


    return(
        <div className={styles.product_info}>
            <div className={styles.product_info__image_block}>
                <img src={product ? product.images : ''} className={styles.product_info__image_block__img} alt="product image"/>
            </div>
            <div className={styles.product_info__desc}>
                <div className={styles.product_info__desc__text}>
                    <Text children={product ? product.title : ''} view="title"/>
                    <Text children={product ? product.description : ''} view="p-20" color="secondary"/>
                </div>
                <div className={styles.product_info__desc__price}>
                    <Text children={`$${product ? product.price : ''}`} view="title"/>
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