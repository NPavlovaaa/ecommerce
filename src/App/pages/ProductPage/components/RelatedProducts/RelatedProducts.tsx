import React from "react";
import ProductCard from "components/ProductCard";
import styles from './RelatedProducts.module.scss';
import Text from "components/Text";
import {ProductModel} from "store/models/products/Product";
import {observer} from "mobx-react-lite";
import Button from "components/Button";
import rootStore from "store/RootStore/instance";
import {useNavigate} from "react-router-dom";

type Props = {
    products: ProductModel[]
}

const RelatedProducts: React.FC<Props> = observer(({products}: Props) => {
    const cartStore = rootStore.cart;
    const navigate = useNavigate();

    const addToCart = (id: number, e: any) => {
        e.stopPropagation();
        cartStore.setKeyCartList(id);
    }

    return(
        <div className={styles.related_main_block}>
            <div className={styles.related_main_block__title_list}>
                <Text view="title" weight="bold">Related Items</Text>
            </div>
            {products ?
                <div className={styles.related_main_block__list}>
                    {products.map(({title, price, id, ...props}: ProductModel) => {
                        const getCaption: string[] = title.split(' ');
                        const captionSlot: string = getCaption[getCaption.length-1];
                        return (
                            <ProductCard
                                title={title}
                                captionSlot={captionSlot}
                                contentSlot={`${price} $`}
                                onClick={() => navigate(`/product/${id}`)}
                                actionSlot={
                                    <Button onClick={(e) => addToCart(id, e)}>
                                        <Text children="Add to cart" view="button"/>
                                    </Button>
                                }
                                {...props}
                            />
                        )
                    })}
                </div>
                :
                <div >
                    <Text children="Related products not found :(" view="p-20"/>
                </div>
            }

        </div>
    )
})

export default RelatedProducts;

