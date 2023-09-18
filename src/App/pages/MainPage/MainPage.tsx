import ProductList from "./components/ProductList";
import styles from "./MainPage.module.scss"
import Search from "./components/Search";
import Filters from "./components/FIlters";
import Info from "./components/Info";
import React, {useState} from "react";


const MainPage: React.FC = () => {
    const [search, setSearch] = useState('');

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