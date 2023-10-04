import React, {FC, useMemo} from "react";
import Button from "../Button";
import styles from "./VariousButton.module.scss";
import rootStore from "store/RootStore";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";

type Props = {
    id: number,
    isShowModal: (bool: boolean) => void;
    isProductCard?: boolean;
}
const VariousButton: FC<Props> = observer(({id, isShowModal, isProductCard = true}: Props) => {
    const user = rootStore.auth.authUser ?  rootStore.auth.authUser : null;
    const cartStore = rootStore.cart;
    const navigate = useNavigate();

    const isAdded = localStorage.cart ? localStorage.cart.includes(id) : false;
    const addToCart = (id: number, e?: any) => {
        e ? e.stopPropagation() : null;

        if(user){
            cartStore.setKeyCartList(id);
        }
        else{
            isShowModal(true);
        }
    }

    const goToCart = (e: any) => {
        e.stopPropagation();
        navigate('/cart')
    }

    return useMemo(() => {
        if(isAdded){
            return <Button
                onClick={(e) => goToCart(e)}
                children="Added to Cart"
                className={styles.addedToCart}
            />
        } else{
            return <Button
                onClick={(e) => addToCart(id, e)}
                children="Add to cart"
                className={!isProductCard ? styles.addToCart : ''}
            />
        }
    }, [id, cartStore.cartList])


})
export default VariousButton;