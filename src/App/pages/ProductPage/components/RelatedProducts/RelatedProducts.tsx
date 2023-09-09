import {useEffect, useState} from "react";
import axios from "axios";
import ProductCard from "components/ProductCard";
import styles from './RelatedProducts.module.scss';
import Text from "components/Text";

const RelatedProducts = ({category}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            await axios({
                method: 'get',
                url: 'https://api.escuelajs.co/api/v1/products'
            })
                .then((data: any) => {
                    const related: Array<object> = data.data.filter(item => item.category.id === category).slice(0, 2)
                    setProducts(related)
                });

        }
        fetch();
    }, [])



    return(
        <div className={styles.related_main_block}>
            <div className={styles.related_main_block__title_list}>
                <Text view="title" weight="bold" className=''>Related Items</Text>
            </div>
            <div className={styles.related_main_block__list}>
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

export default RelatedProducts;