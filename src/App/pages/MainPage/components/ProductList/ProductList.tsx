import React, {useEffect} from "react";
import ProductCard from "components/ProductCard";
import styles from './ProductList.module.scss';
import Text from "components/Text";
import Pagination from "components/Pagination/Pagination";
import {observer, useLocalObservable} from "mobx-react-lite";
import {ProductModel} from "store/models/products/Product";
import ProductStore from "store/ProductStore";
import {useNavigate} from "react-router-dom";
import rootStore from "store/RootStore/instance";
import Spinner from "components/Spinner/Spinner";

const ProductList: React.FC = observer(() => {
    const productStore = useLocalObservable(() => new ProductStore());
    const cartStore = rootStore.cart;
    const meta = productStore.meta;
    const navigate = useNavigate();
    const currentPage = rootStore.query.currentPage;
    const searchQuery = rootStore.query.searchQuery;
    const filter = rootStore.query.filter;
    const pageSize = rootStore.query.limit;

    const urlSearchParams = new URLSearchParams(window.location.search);

    useEffect(() =>{
        productStore.getAllProductList();
    }, [productStore, rootStore.query.searchQuery, rootStore.query.filter])

    useEffect(() =>{
        productStore.getProductList();
    }, [productStore, currentPage, rootStore.query.searchQuery, rootStore.query.filter])

    const products = productStore.productList;

    useEffect(() => {
        if (urlSearchParams.get("page")) {
            rootStore.query.setPage(parseInt(urlSearchParams.get("page") as string));
        }
        if (urlSearchParams.get("search")) {
            rootStore.query.setSearchQuery(urlSearchParams.get("search") as string);
        }
        if (urlSearchParams.get("filter")) {
            const filter = urlSearchParams.get("filter")?.split('?');
            rootStore.query.setFilter({id: filter[0], name: filter[1]});
        }
    }, []);

    useEffect(() => {
        let queryParams: string = `/?page=${currentPage}`;
        if (searchQuery !== "") {
            queryParams += `&search=${searchQuery}`;
        }
        if (filter) {
            queryParams += `&filter=${filter.id}?${filter.name}`;
        }
        navigate(queryParams);
    }, [currentPage, searchQuery, filter]);


    const addToCart = (id: number) => {
        cartStore.setKeyCartList(id);
    }

    return(
        <div className={styles.main_block}>
            <div className={styles.main_block__title_list}>
                <Text view="title" weight="bold" className=''>Total Product</Text>
                <Text view="p-20" weight="bold" color="accent">{productStore.productListLength}</Text>
            </div>
            {meta === 'loading' ? <Spinner/> : null}
            {products.length > 0 ?
            <div className={styles.main_block__list}>
                {products.map(({title, images, price, description, id}: ProductModel) => {
                    const getCaption: string[] = title.split(' ');
                    const captionSlot: string = getCaption[getCaption.length-1];
                    return (
                       <ProductCard images={images}
                                    title={title}
                                    captionSlot={captionSlot}
                                    contentSlot={`${price} $`}
                                    description={description}
                                    onClick={() => navigate(`/product/${id}`)}
                                    actionSlot={() => addToCart(id)}
                       />
                    )
                })}
            </div>
                :
                <div className={styles.not_found}>
                    <Text children="Products not found :(" view="p-20"/>
                </div>
            }
            <div className={styles.pagination}>
                <Pagination
                    currentPage={currentPage}
                    totalCount={productStore.productListLength}
                    onPageChange={page => rootStore.query.setPage(page)}
                    pageSize={pageSize}
                />
            </div>
        </div>
    )
})

export default ProductList;