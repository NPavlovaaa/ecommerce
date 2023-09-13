import styles from "./ProductPage.module.scss"
import Text from "components/Text";
import React from "react";
import Product from "./components/Product";
import RelatedProducts from "./components/RelatedProducts";
import {Link} from "react-router-dom";
import ArrowBackIcon from "../../../components/Icons/ArrowBackIcon";

const ProductPage: React.FC = () => {

    return(
        <div className={styles.product_body_page}>
            <Link to="/" className={styles.link}>
                <div className={styles.product_body_page__back}>
                    <ArrowBackIcon width={32} height={32} className={styles.arrow_back}/>
                    <Text view="p-20" children="Back"/>
                </div>
            </Link>
            <Product/>
            <RelatedProducts category={1}/>
        </div>
    )
}
export default ProductPage;