import {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "../../../../../components/ProductCard";
import styles from './ProductList.module.scss';
import Text from "../../../../../components/Text";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            await axios({
                method: 'get',
                url: 'https://api.escuelajs.co/api/v1/products'
            })
                .then((data: any)=> setProducts(data.data));

        }
        fetch();
    }, [])

    return(
        <div className={styles.main_block}>
            <div className={styles.main_block__title_list}>
                <Text view="title" weight="bold" className=''>Total Product</Text>
                <Text view="p-20" weight="bold" color="accent">{products.length}</Text>
            </div>
            <div className={styles.main_block__list}>
                {products.map(item => {
                    console.log(item)
                    const getCaption = item.title.split(' ');
                    const captionSlot = getCaption[getCaption.length-1];

                    return (
                        <ProductCard captionSlot={captionSlot} contentSlot={`${item.price} $`} {...item}/>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductList;