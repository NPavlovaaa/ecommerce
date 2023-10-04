import styles from "./Header.module.scss";
import Text from "../Text";
import {Link, NavLink, useNavigate} from "react-router-dom";
import React, {FC, useEffect, useState} from "react";
import LogoIcon from "../Icons/LogoIcon";
import TitleIcon from "../Icons/TitleIcon";
import UserIcon from "../Icons/UserIcon";
import CartIcon from "../Icons/CartIcon";
import {observer} from "mobx-react";
import rootStore from "store/RootStore/instance";
import {UserModel} from "store/models/users/User";
import LogoutIcon from "../Icons/LogoutIcon";
import LoginIcon from "../Icons/LoginIcon";

type Props = {
    onLogin: (bool: boolean) => void
}
const Header: FC<Props> = observer(({onLogin}: Props) => {
    const user: UserModel | any = rootStore.auth.authUser;
    const [cartLength, setCartLength] = useState(rootStore.cart.cartList.length);
    const navigate = useNavigate();

    useEffect(() => {
        setCartLength(rootStore.cart.cartList.length);
    }, [rootStore.cart.cartList, user])

    const logout = () => {
        rootStore.auth.logout();
        navigate('/');
    }

    return(
        <div className={styles.main_block}>
            <Link to="/">
                <div className={styles.main_block__logo}>
                    <LogoIcon width={42} height={42}/>
                    <TitleIcon width={77} height={20}/>
                </div>
            </Link>
            <div className={styles.main_block__menu}>
                <ul className={styles.main_block__menu__ul}>
                    <li className={styles.main_block__menu__ul__li}>
                        <NavLink to="/" style={({isActive}) => ({color: isActive ? '#487773' : 'inherit', borderBottom: isActive ? '3px solid #487773' : 'inherit'})}>
                            <Text children="Products" view="p-18"/>
                        </NavLink>
                    </li>
                    <li className={styles.main_block__menu__ul__li}>
                        <NavLink to="/categories" style={({isActive}) => ({color: isActive ? '#487773' : 'inherit', borderBottom: isActive ? '3px solid #487773' : 'inherit'})}>
                            <Text children="Categories" view="p-18"/>
                        </NavLink>
                    </li>
                    <li className={styles.main_block__menu__ul__li}>
                        <NavLink to="/about" style={({isActive}) => ({color: isActive ? '#487773' : 'inherit', borderBottom: isActive ? '3px solid #487773' : 'inherit'})}>
                            <Text children="About us" view="p-18"/>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div>
                {user ?
                    <div className={styles.main_block__account}>
                        <Link to="/cart" style={{ textDecoration: 'none' }}>
                            <div className={styles.main_block__account__item}>
                                <CartIcon width={30} height={30}/>
                                <Text children={`${cartLength} items`} view="p-14"/>
                            </div>
                        </Link>
                        <Link to="/user" style={{ textDecoration: 'none' }}>
                            <div className={styles.main_block__account__item}>
                                <UserIcon width={30} height={30}/>
                                {user ? <Text children={user.name} view="p-14"/> : null}
                            </div>
                        </Link>
                        <div className={styles.main_block__account__item}>
                            <LogoutIcon width={30} height={30} onClick={logout}/>
                            <Text children="Log out" view="p-14"/>
                        </div>
                    </div>
                :
                    <div className={styles.main_block__account__item}>
                        <LoginIcon width={30} height={30} onClick={() => onLogin(true)}/>
                        <Text children="Log in" view="p-14"/>
                    </div>
                }

            </div>
        </div>
    )
})

export default Header;