import React, {FC, useState} from "react";
import styles from './Product.module.scss';
import Text from "components/Text";
import Button from "components/Button";
import {observer} from "mobx-react";
import Slider from "components/Slider";
import {ProductModel} from "store/models/products/Product";
import VariousButton from "components/VariousButton/VariousButton";
import ModalWindow from "components/ModalWIndow";
import rootStore from "store/RootStore";
import {useNavigate} from "react-router-dom";


const Product: FC<ProductModel> = observer(({id, title, description, price, images}: ProductModel) => {
    const [showModal, setShowModal] = useState(false);
    const cartStore = rootStore.cart;
    const user = rootStore.auth.authUser;
    const navigate = useNavigate();

    const isShowModal = (bool: boolean) => {
        setShowModal(bool);
    }

    const onByNow = (id: number) => {
        if(user){
            cartStore.setKeyCartList(id);
            navigate('/cart');
        }
        else{
            isShowModal(true);
        }
    }

    return(
        <div className={styles.product_info}>
            {showModal ? <ModalWindow showModal={showModal} isShowModal={isShowModal}/> : null}
            <div className={styles.product_info__image_block}>
                {images && images.length > 1 ? <Slider images={images}/> : images && <img src={images[0]} alt="Product image" className={styles.product_info__image_block__img}/>}
            </div>
            <div className={styles.product_info__desc}>
                <div className={styles.product_info__desc__text}>
                    <Text children={title ? title : ''} view="title"/>
                    <Text children={description ? description : ''} view="p-20" color="secondary"/>
                </div>
                <div className={styles.product_info__desc__price}>
                    <Text children={`$${price ? price : ''}`} view="title"/>
                    <div className={styles.product_info__desc__price__button}>
                        <Button children="Buy now" onClick={() => onByNow(id)}/>
                        <VariousButton id={id} isShowModal={isShowModal} isProductCard={false}/>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Product;