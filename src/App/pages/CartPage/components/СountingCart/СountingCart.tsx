import styles from "./СountingCart.module.scss";
import React from "react";
import Text from "components/Text";
import Button from "components/Button";
import {observer} from "mobx-react";
import rootStore from "store/RootStore/instance";
import {ProductModel} from "store/models/products/Product";

const CountingCart = observer(() => {
    const cartStore =  rootStore.cart;
    const cartList: ProductModel[] = cartStore.cartList;
    const total_cost = cartList.reduce((acc, cur) => acc + cur.price, 0);
    const total_count = cartList.length;

    return(
        <div className={styles.counting_cart}>
            <div className={styles.counting_cart_button_block}>
                <Button>Proceed to Checkout</Button>
            </div>
            <Text view="p-14" color="secondary" children="Available delivery methods and times can be&nbsp;selected when placing an&nbsp;order."/>
            <div className={styles.counting_cart_total_count}>
                <Text children="Your cart" view="p-18" weight="medium"/>
                <Text children={`${total_count} items`} view="p-14" color="secondary"/>
            </div>
            <div className={styles.counting_cart_total_cost}>
                <Text children="Total cost" view="p-20" weight="medium"/>
                <Text children={`${total_cost} $`} view="p-20" weight="bold"/>
            </div>
        </div>
    )
})
export default CountingCart;