import ProductList from "./components/ProductList";
import styles from "./MainPage.module.scss"

const MainPage = () => {
    return(
        <div className={styles.body_page}>
            <ProductList/>
        </div>
    )
}

export default MainPage;