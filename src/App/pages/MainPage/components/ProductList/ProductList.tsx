import React, {useEffect, useMemo, useState} from "react";
import ProductCard from "components/ProductCard";
import styles from './ProductList.module.scss';
import Text from "components/Text";
import Pagination from "components/Pagination/Pagination";
import {ProductType} from "types";
import {observer, useLocalObservable} from "mobx-react-lite";
import ProductStore from "../../../../../store/ProductStore";


const ProductList: React.FC = observer(() => {
    const productStore = useLocalObservable(() => new ProductStore());
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        productStore.getProductList();
    }, [productStore])


    let pageSize = 6;
    const currentData = useMemo(() => {
        const firstPageIndex: number = (currentPage - 1) * pageSize;
        const lastPageIndex: number = firstPageIndex + pageSize;
        return productStore.productList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, productStore.productList]);

    return(
        <div className={styles.main_block}>
            <div className={styles.main_block__title_list}>
                <Text view="title" weight="bold" className=''>Total Product</Text>
                <Text view="p-20" weight="bold" color="accent">{productStore.productList.length}</Text>
            </div>
            <div className={styles.main_block__list}>
                {currentData.map((item: ProductType) => {
                    const getCaption: string[] = item.title.split(' ');
                    const captionSlot: string = getCaption[getCaption.length-1];
                    return (
                       <ProductCard image={item.images} captionSlot={captionSlot} contentSlot={`${item.price} $`} {...item}/>
                    )
                })}
            </div>
            <div className={styles.pagination}>
                <Pagination
                    currentPage = {currentPage}
                    totalCount = {productStore.productList.length}
                    pageSize = {pageSize}
                    onPageChange = {page => setCurrentPage(page)}
                />
            </div>
        </div>
    )
})

export default ProductList;