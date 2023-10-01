import styles from "./ProductPage.module.scss"
import Text from "components/Text";
import React, {useEffect} from "react";
import Product from "./components/Product";
import RelatedProducts from "./components/RelatedProducts";
import {Link} from "react-router-dom";
import ArrowBackIcon from "components/Icons/ArrowBackIcon";
import {observer, useLocalObservable} from "mobx-react";
import { useParams } from "react-router-dom";
import ProductStore from "store/ProductStore";


const ProductPage: React.FC = observer(() => {
    const {id} = useParams();
    const productStore = useLocalObservable(() => new ProductStore())

    useEffect(() => {
        if(id){
            productStore.getProductItem(id);
        }
    }, [productStore, id])

    const product = productStore.productItem;
    const relatedProductsList = productStore.relatedProductsList;

    return(
        <div className={styles.product_body_page}>
            <Link to="/" className={styles.link}>
                <div className={styles.product_body_page__back}>
                    <ArrowBackIcon width={32} height={32} className={styles.arrow_back}/>
                    <Text view="p-20" children="Back"/>
                </div>
            </Link>
            <Product {...product}/>
            <RelatedProducts products={relatedProductsList}/>
        </div>
    )
})
export default ProductPage;