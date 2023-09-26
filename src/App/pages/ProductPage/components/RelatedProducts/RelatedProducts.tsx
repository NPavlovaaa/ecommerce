import React from "react";
import ProductCard from "components/ProductCard";
import styles from './RelatedProducts.module.scss';
import Text from "components/Text";
import {ProductModel} from "store/models/products/Product";
import {observer} from "mobx-react-lite";

type Props = {
    products: ProductModel[]
}

const RelatedProducts: React.FC<Props> = observer(({products}: Props) => {
    console.log(products)

    return(
        <div className={styles.related_main_block}>
            <div className={styles.related_main_block__title_list}>
                <Text view="title" weight="bold">Related Items</Text>
            </div>
            {products ?
                <div className={styles.related_main_block__list}>
                    {products.map((item: ProductModel) => {
                        const getCaption: string[] = item.title.split(' ');
                        const captionSlot: string = getCaption[getCaption.length-1];
                        return (
                            <ProductCard key={item.id} captionSlot={captionSlot} contentSlot={`${item.price} $`} {...item}/>
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

