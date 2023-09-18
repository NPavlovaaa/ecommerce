import React, {useEffect, useMemo, useState} from "react";
import ProductCard from "components/ProductCard";
import styles from './ProductList.module.scss';
import Text from "components/Text";
import Pagination from "components/Pagination/Pagination";
import {observer, useLocalObservable} from "mobx-react-lite";
import {ProductModel} from "store/models/products/Product";
import ProductStore from "store/ProductStore";
import FilterStore from "store/FilterStore";


const ProductList: React.FC = observer(() => {
    const productStore = useLocalObservable(() => new ProductStore());
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() =>{
        productStore.getProductList();
    }, [productStore])

    const products = productStore.productList;

    const filteredProductList = useMemo(() => {
        const filteredProductList = products.slice();
        setCurrentPage(1);
        if(FilterStore.activeCategory.length === 0){
            return filteredProductList;
        }else{
            return filteredProductList.filter(item => FilterStore.activeCategory.some(filter => item.category.id === filter.id));
        }
    }, [products, FilterStore.activeCategory])

    let pageSize = 6;
    const currentData = useMemo(() => {
        const firstPageIndex: number = (currentPage - 1) * pageSize;
        const lastPageIndex: number = firstPageIndex + pageSize;
        return filteredProductList.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, filteredProductList]);

    return(
        <div className={styles.main_block}>
            <div className={styles.main_block__title_list}>
                <Text view="title" weight="bold" className=''>Total Product</Text>
                <Text view="p-20" weight="bold" color="accent">{products.length}</Text>
            </div>
            <div className={styles.main_block__list}>
                {currentData.map(({title, images, price, description, id}: ProductModel) => {
                    const getCaption: string[] = title.split(' ');
                    const captionSlot: string = getCaption[getCaption.length-1];
                    return (
                       <ProductCard image={images}
                                    captionSlot={captionSlot}
                                    contentSlot={`${price} $`}
                                    description={description}
                                    id={id}
                       />
                    )
                })}

            </div>
            <div className={styles.pagination}>
                <Pagination
                    currentPage = {currentPage}
                    totalCount = {filteredProductList.length}
                    pageSize = {pageSize}
                    onPageChange = {page => setCurrentPage(page)}
                />
            </div>
        </div>
    )
})

export default ProductList;