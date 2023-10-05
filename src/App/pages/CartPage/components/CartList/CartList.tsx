import React from 'react';
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import ItemCartList from "../ItemCartList";
import styles from "./CartList.module.scss";
import rootStore from "store/RootStore/instance";
import {ProductModel} from "store/models/products/Product";
import Spinner from "components/Spinner/Spinner";
import Text from "components/Text";
import Button from "components/Button";
import {useNavigate} from "react-router-dom";


const CartList = observer(() => {
    const cartStore =  rootStore.cart;
    const navigate = useNavigate();
    useEffect(() => {
        cartStore.getCartList();
    }, [cartStore])

    const cartList: ProductModel[] = cartStore.cartList;
    const meta = cartStore.meta;

    return(
        <div className={styles.cart_list}>
            {meta === 'loading' ? <Spinner/> : null}
            {cartList.length > 0 ?
                cartList.map((item) => (<ItemCartList {...item}/>))
            :
                <div className={styles.cart_list__empty}>
                    <Text children="Cart is empty :(" view="p-20"/>
                    <Button children="Go shopping" onClick={() => navigate('/')}/>
                </div>
            }
        </div>
    )
})
export default CartList;