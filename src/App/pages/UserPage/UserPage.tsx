import React from 'react';
import styles from "./UserPage.module.scss";
import Text from "components/Text";
import {observer} from "mobx-react";
import Account from "./components/Account";
import ArrowBackIcon from "components/Icons/ArrowBackIcon";
import {Link} from "react-router-dom";


const UserPage = observer(() => {

    return(
        <div className={styles.user_body_page}>
            <Link to="/" className={styles.link}>
                <div className={styles.user_body_page__back}>
                    <ArrowBackIcon width={32} height={32} className={styles.arrow_back}/>
                    <Text view="p-20" children="Back"/>
                </div>
            </Link>
            <Text children="Account" view="title"/>
            <Account/>
        </div>
    )
})
export default UserPage;