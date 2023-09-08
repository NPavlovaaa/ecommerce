import styles from "./ProductPage.module.scss"
import Text from "../../../components/Text";
import React, {useEffect, useState} from "react";
import Arrow from "../../../assets/arrow-right.svg";
import axios from "axios";
import Button from "../../../components/Button";
import Product from "./components/Product";

const ProductPage = () => {

    return(
        <div className={styles.product_body_page}>
            <div className={styles.product_body_page__back}>
                <img src={Arrow} className={styles.arrow_back}/>
                <Text view="p-20" children="Back"/>
            </div>
            <Product/>
        </div>
    )
}
export default ProductPage;