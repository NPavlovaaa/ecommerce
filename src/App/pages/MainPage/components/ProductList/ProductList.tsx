import React, {useEffect, useMemo} from "react";
import ProductCard from "components/ProductCard";
import styles from './ProductList.module.scss';
import Text from "components/Text";
import Pagination from "components/Pagination/Pagination";
import {observer, useLocalObservable} from "mobx-react-lite";
import {ProductModel} from "store/models/products/Product";
import ProductStore from "store/ProductStore";
import {useNavigate} from "react-router-dom";
import rootStore from "store/RootStore";
import {Option} from "components/MultiDropdown";

const ProductList: React.FC = observer(() => {
    const productStore = useLocalObservable(() => new ProductStore());
    const navigate = useNavigate();
    const currentPage = rootStore.query.currentPage;
    const searchQuery = rootStore.query.searchQuery;
    const selectedFilters = rootStore.query.selectedFilters;

    const urlSearchParams = new URLSearchParams(window.location.search);

    useEffect(() =>{
        productStore.getProductList();
    }, [productStore])

    useEffect(() => {
        if (urlSearchParams.get("page")) {
            rootStore.query.setPage(parseInt(urlSearchParams.get("page") as string));
        }
        if (urlSearchParams.get("search")) {
            rootStore.query.setSearchQuery(urlSearchParams.get("search"));
        }
        if (urlSearchParams.get("filters")) {
            rootStore.query.setFilters(filtersFromStringToOption(urlSearchParams.get("filters") as string));
        }
    }, []);

    useEffect(() => {
        let queryParams: string = `/?page=${currentPage}`;
        if (searchQuery !== "") {
            queryParams += `&search=${searchQuery}`;
        }
        if (selectedFilters.length > 0) {
            queryParams += `&filters=${filtersFromOptionToString(selectedFilters)}`;
        }
        navigate(queryParams);
    }, [currentPage, searchQuery, selectedFilters]);

    function filtersFromStringToOption(filters: string): Option[] {
        const filtersAsString = filters.split(',');
        return rootStore.query.categoryList
            .filter((category) => filtersAsString
                .some((filterKey) => category.key === parseInt(filterKey)))
    }

    function filtersFromOptionToString(filters: Option[]): string {
        return filters.map((filter) => filter.id).join(',');
    }

    const products = productStore.productList;

    let pageSize = 6;
    const currentData = useMemo(() => {
        const firstPageIndex: number = (currentPage - 1) * pageSize;
        const lastPageIndex: number = firstPageIndex + pageSize;
        return products.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, products]);

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
                                    title={title}
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
                    currentPage={currentPage}
                    totalCount={products.length}
                    pageSize={pageSize}
                    onPageChange={page => rootStore.query.setPage(page)}
                />
            </div>
        </div>
    )
})

export default ProductList;