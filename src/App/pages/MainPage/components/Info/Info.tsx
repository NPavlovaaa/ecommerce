import styles from './Info.module.scss';
import Text from "components/Text";
import React from "react";

const Info: React.FC = () => {

    return(
        <div className={styles.main_block}>
            <Text view="title" weight="bold" children="Products"/>
            <Text view="p-20" color="secondary"
                  children="We&nbsp;display products based on&nbsp;the latest products we&nbsp;have, if&nbsp;you want to&nbsp;see our old products please enter the name of&nbsp;the item"/>
        </div>
    )
}

export default Info;