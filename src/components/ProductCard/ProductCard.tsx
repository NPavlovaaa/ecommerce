import React from 'react';
import Text from "../Text";
import styles from "./ProductCard.module.scss";
import Button from "../Button";

export type CardProps = {
    /** Дополнительный classname */
    className?: string,
    /** URL изображения */
    images: string;
    /** Слот над заголовком */
    captionSlot?: React.ReactNode;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Описание карточки */
    description: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    contentSlot?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    /** Слот для действия */
    actionSlot?: React.ReactNode;
};

const ProductCard: React.FC<CardProps> = ({
   className,
   images,
   captionSlot,
   title,
   description,
   contentSlot= "",
   onClick,
   actionSlot,
}) => {

    const clickOnButton = (e) => {
        e.stopPropagation();
        actionSlot ? actionSlot() : null
    }

    return (
        <div key={title} className={`${styles.parent} ${className}`} onClick={onClick ? onClick : null}>
            <div className={styles.card_header}>
                <img src={images} className={styles.card_header__img} alt="image product"/>
            </div>
            <div className={styles.card_body}>
                <div className={styles.card_body__text_block}>
                    <Text children={captionSlot} view="p-14" color="secondary" weight="bold"></Text>
                    <Text children={title} view="p-20" tag="h1" maxLines={parseInt("2")}></Text>
                    <Text children={description} color="secondary" maxLines={parseInt("3")}></Text>
                </div>
                <div className={styles.card_body__footer_block}>
                    {contentSlot ? <Text children={contentSlot} view="p-18" weight="bold"/> : null}
                    {actionSlot ?
                        <Button onClick={clickOnButton}>
                            <Text children="Add to cart" view="button"/>
                        </Button>
                        : null}
                </div>
            </div>
        </div>
    );
};


export default ProductCard;
