import styles from "./Header.module.scss";
import Text from "../Text";
import {Link, NavLink} from "react-router-dom";
import React from "react";
import LogoIcon from "../Icons/LogoIcon";
import TitleIcon from "../Icons/TitleIcon";
import UserIcon from "../Icons/UserIcon";
import CartIcon from "../Icons/CartIcon";


const Header: React.FC = () => {
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
            <div className={styles.main_block_account}>
                <CartIcon width={30} height={30}/>
                <UserIcon width={30} height={30}/>
            </div>
        </div>
    )
}

export default Header;