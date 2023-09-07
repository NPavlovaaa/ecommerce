import ProductList from "./components/ProductList";
import styles from "./MainPage.module.scss"
import Search from "./components/Search";

const MainPage = () => {
    return(
        <div className={styles.body_page}>
            <div className={styles.body_page__body}>
                <Search/>
                <ProductList/>
            </div>
        </div>
    )
}

export default MainPage;