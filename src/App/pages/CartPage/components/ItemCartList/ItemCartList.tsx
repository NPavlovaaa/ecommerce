import styles from "./ItemCartList.module.scss";
import React from "react";
import Text from "components/Text";
import Button from "components/Button";
import {observer} from "mobx-react";
import rootStore from "store/RootStore/instance";
import {ProductModel} from "store/models/products/Product";


const ItemCartList = observer(({id, images, title, description, price}: ProductModel) => {
    const cartStore =  rootStore.cart;

    const deleteProduct = (id: number) => {
        cartStore.deleteKeyCartList(id);
    }

    return(
        <div key={id} className={styles.item_cart_list}>
            <div className={styles.image_block}>
                <img src={images ? images[0] : ''} className={styles.image_block__img} alt="product image"/>
            </div>
            <div className={styles.text_block}>
                <div className={styles.text_block_text}>
                    <Text children={title} view="p-18"/>
                    <Text children={description} view="p-14" className={styles.text_block_text_desc}/>
                </div>
                <div className={styles.text_block_button}>
                    <Button className={styles.text_block_button_fav}
                            textView="p-14"
                    >
                        Add to favorite
                    </Button>
                    <Button className={styles.text_block_button_delete}
                            onClick={() => deleteProduct(id)}
                            textView="p-14"
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <div className={styles.count_block}>
                <Button className={styles.count_block_change}>-</Button>
                <Text children="1" view="p-18" className={styles.count_block_count}/>
                <Button className={styles.count_block_change}>+</Button>
            </div>
            <div className={styles.price_block}>
                <Text children={`${price}$`} view="p-20" className={styles.price_block_price}/>
            </div>
        </div>
    )
})
export default ItemCartList;