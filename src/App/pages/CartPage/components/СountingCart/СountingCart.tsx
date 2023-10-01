import styles from "./СountingCart.module.scss";
import React, {useState} from "react";
import Text from "components/Text";
import Button from "components/Button";
import {observer} from "mobx-react";
import rootStore from "store/RootStore/instance";
import {ProductModel} from "store/models/products/Product";
import classNames from "classnames";
import PointIcon from "components/Icons/PointIcon";


const CountingCart = observer(() => {
    const cartStore =  rootStore.cart;
    const cartList: ProductModel[] = cartStore.cartList;
    const total_cost = cartList.reduce((acc, cur) => acc + cur.price, 0);
    const total_count = cartList.length;
    const [usePoints, setUsePoints] = useState(false);

    return(
        <div className={styles.counting_cart}>
            <div className={styles.counting_cart__button_block}>
                <Button>Proceed to Checkout</Button>
            </div>
            <Text view="p-14" color="secondary" children="Available delivery methods and times can be&nbsp;selected when placing an&nbsp;order."/>
            <div className={styles.counting_cart__total_count}>
                <Text children="Your cart" view="p-18" weight="medium"/>
                <Text children={`${total_count} items`} view="p-14" color="secondary"/>
            </div>
            <div className={styles.counting_cart__cost}>
                <div className={styles.counting_cart__total_cost}>
                    <Text children="Total cost" view="p-20" weight="medium"/>
                    <Text children={`${total_cost} $`} view="p-20" weight="bold"/>
                </div>
                <div className={styles.block_points}>
                    <Text children="Use points" view="p-14" color="secondary"/>
                    <ul className={styles.points}>
                        <li>
                            <a className={classNames(!usePoints ? styles.points__disabled : "", styles.points__block)}
                               href="src/components/products/productItem/ProductItem#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   setUsePoints(false)
                               }}>
                                <span className={styles.points__block__span}>x</span>
                            </a>
                        </li>
                        <li>
                            <a className={classNames(usePoints ? styles.points__active : "", styles.points__block)}
                               href="src/components/products/productItem/ProductItem#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   setUsePoints(true)
                               }}>
                                <span className={styles.points__block__span}>x</span>
                            </a>
                        </li>
                    </ul>
                </div>
                {usePoints ?
                    <>
                        <div className={styles.counting_cart__total_cost}>
                            <Text children="Your points" view="p-16" color="secondary"/>
                            <div className={styles.icon_block}>
                                <Text children={5} view="p-16" color="secondary"/>
                                <PointIcon width={15} height={15}/>
                            </div>
                        </div>
                        <div className={styles.counting_cart__total_cost}>
                            <Text children="Available for withdrawal" view="p-14" color="secondary"/>
                            <div className={styles.icon_block}>
                                <Text children={5} view="p-16" color="secondary"/>
                                <PointIcon width={15} height={15}/>
                            </div>
                        </div>
                        <div className={styles.counting_cart__total_cost}>
                            <Text children="Total" view="p-20" weight="bold"/>
                            <Text children={`${total_cost} $`} view="p-20" weight="bold"/>
                        </div>
                    </>
                    : null
                }

            </div>
        </div>
    )
})
export default CountingCart;