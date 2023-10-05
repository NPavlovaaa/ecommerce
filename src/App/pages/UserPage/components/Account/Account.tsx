import React from 'react';
import rootStore from "store/RootStore/instance";
import {UserModel} from "store/models/users/User";
import styles from "./Account.module.scss";
import Text from "components/Text";
import Input from "components/Input";


const Account = () => {
    const user: UserModel | null = rootStore.auth.authUser;

    return(
        <>
            {user ?
                <div className={styles.account_body_page}>
                    <div className={styles.user_info}>
                        <div className={styles.account_body_page__image_block}>
                            <img src={user.avatar} className={styles.account_body_page__image_block__img} alt="User avatar"/>
                        </div>
                        <Text children={user.name} view="p-20" weight="bold"/>
                        <Text children={user.role} view="p-16"/>
                    </div>
                    <div className={styles.user_data}>
                        <Text children="Profile" view="p-16" weight="bold"/>
                        <div className={styles.user_data__row}>
                            <Input
                                onChange={() => {}}
                                value={user.name}
                                className={styles.user_data__input}
                            />
                            <Input
                                onChange={() => {}}
                                value={user.role}
                                className={styles.user_data__input}
                            />
                        </div>
                        <div className={styles.user_data__row}>
                            <Input
                                onChange={() => {}}
                                value={user.email}
                                className={styles.user_data__input}
                            />
                            <Input
                                onChange={() => {}}
                                value={user.password}
                                className={styles.user_data__input}
                            />
                        </div>
                    </div>
                </div>
            : null}
        </>
    )
}
export default Account;