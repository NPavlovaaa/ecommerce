import React from 'react';
import styles from "./CartPage.module.scss";
import CartList from "./components/CartList";
import Text from "components/Text";
import CountingCart from "./components/СountingCart";
import {observer} from "mobx-react";


const CartPage = observer(() => {
    return(
        <div className={styles.cart_body_page}>
            <Text children="Cart" view="title"/>
            <div className={styles.cart_body}>
                <div className={styles.cart_list}>
                    <CartList/>
                </div>
                <div className={styles.total_block}>
                    <CountingCart/>
                </div>
            </div>
        </div>
    )
})
export default CartPage;