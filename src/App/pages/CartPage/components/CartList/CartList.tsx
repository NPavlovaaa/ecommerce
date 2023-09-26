import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import ItemCartList from "../ItemCartList";
import styles from "./CartList.module.scss";
import rootStore from "store/RootStore/instance";
import {ProductModel} from "store/models/products/Product";
import Spinner from "components/Spinner/Spinner";


const CartList = observer(() => {
    const cartStore =  rootStore.cart;

    useEffect(() => {
        cartStore.getCartList();
    }, [cartStore])

    const cartList: ProductModel[] = cartStore.cartList;
    const meta = cartStore.meta;

    return(
        <div className={styles.cart_list}>
            {meta === 'loading' ? <Spinner/> : null}
            {cartList.map(item => (<ItemCartList item={item}/>))}
        </div>
    )
})
export default CartList;