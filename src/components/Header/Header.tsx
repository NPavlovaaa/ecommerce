import styles from "./Header.module.scss";
import Logo from "../../assets/Logo.svg";
import Lalasia from "../../assets/Lalasia.svg";
import Cart from "../../assets/Cart.svg";
import User from "../../assets/User.svg";
import Text from "../Text";
import {NavLink} from "react-router-dom";
import React from "react";


const Header: React.FC = () => {
    return(
        <div className={styles.main_block}>
            <div className={styles.main_block__logo}>
                <img src={Logo} alt="logo image"/>
                <img src={Lalasia} alt="logo text"/>
            </div>
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
                <img src={Cart} alt="Cart icon"/>
                <img src={User} alt="User icon"/>
            </div>
        </div>
    )
}

export default Header;