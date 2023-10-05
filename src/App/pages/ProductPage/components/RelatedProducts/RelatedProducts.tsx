import React, {useState} from "react";
import ProductCard from "components/ProductCard";
import styles from './RelatedProducts.module.scss';
import Text from "components/Text";
import {ProductModel} from "store/models/products/Product";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import VariousButton from "components/VariousButton/VariousButton";
import ModalWindow from "components/ModalWIndow";

type Props = {
    products: ProductModel[]
}

const RelatedProducts: React.FC<Props> = observer(({products}: Props) => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const isShowModal = (bool: boolean) => {
        setShowModal(bool);
    }

    return(
        <div className={styles.related_main_block}>
            {showModal ? <ModalWindow showModal={showModal} isShowModal={isShowModal}/> : null}
            <div className={styles.related_main_block__title_list}>
                <Text view="title" weight="bold">Related Items</Text>
            </div>
            {products ?
                <div className={styles.related_main_block__list}>
                    {products.map(({title, price, id, ...props}: ProductModel) => {
                        const getCaption: string[] = title.split(' ');
                        const captionSlot: string = getCaption[getCaption.length-1];
                        return (
                            <ProductCard
                                title={title}
                                captionSlot={captionSlot}
                                contentSlot={`${price} $`}
                                onClick={() => navigate(`/product/${id}`)}
                                actionSlot={<VariousButton id={id} isShowModal={isShowModal}/>}
                                {...props}
                            />
                        )
                    })}
                </div>
                :
                <div >
                    <Text children="Related products not found :(" view="p-20"/>
                </div>
            }
        </div>
    )
})

export default RelatedProducts;

