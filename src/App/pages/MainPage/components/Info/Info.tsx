import {useEffect, useState} from "react";
import styles from './Info.module.scss';
import Text from "components/Text";

const Info = () => {

    return(
        <div className={styles.main_block}>
            <Text view="title" weight="bold" className=''>Products</Text>
            <Text view="p-20" weight="bold" color="secondary">
                We display products based on the latest products we have, if you want
                to see our old products please enter the name of the item
            </Text>
        </div>
    )
}

export default Info;