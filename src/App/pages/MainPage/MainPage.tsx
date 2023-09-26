import React from 'react';
import ProductList from "./components/ProductList";
import styles from "./MainPage.module.scss"
import Search from "./components/Search";
import Filters from "./components/FIlters";
import Info from "./components/Info";

const MainPage: React.FC = () => {

    return(
        <div className={styles.body_page}>
            <div>
                <Info/>
            </div>
            <div className={styles.body_page__body}>
                <div className={styles.body_page__body__tools}>
                    <Search/>
                    <Filters/>
                </div>
                <ProductList/>
            </div>
        </div>
    )
}

export default MainPage;