import styles from "./ProductPage.module.scss"
import Text from "components/Text";
import React from "react";
import Arrow from "../../../assets/arrow-right.svg";
import Product from "./components/Product";
import RelatedProducts from "./components/RelatedProducts";
import {Link} from "react-router-dom";

const ProductPage: React.FC = () => {

    return(
        <div className={styles.product_body_page}>
            <Link to="/" className={styles.link}>
                <div className={styles.product_body_page__back}>
                    <img src={Arrow} className={styles.arrow_back} alt="button back icon"/>
                    <Text view="p-20" children="Back"/>
                </div>
            </Link>
            <Product/>
            <RelatedProducts category={1}/>
        </div>
    )
}
export default ProductPage;