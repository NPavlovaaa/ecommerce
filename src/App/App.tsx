import React, {useEffect, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage";
import Header from "../components/Header";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import rootStore from "store/RootStore/instance";
import {observer} from "mobx-react-lite";
import ModalWindow from "../components/ModalWIndow";
import UserPage from "./pages/UserPage";
import ProtectedRoute from "../components/ProtectedRoute";


const App = observer(() =>  {
    const token = localStorage.getItem('token');
    const user = rootStore.auth.authUser;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(token && !user){
            rootStore.auth.authorization();
        }
    }, [token, user])

    useEffect(() => {
        rootStore.cart.getCartList();
    }, [user])


    const isShowModal = (bool: boolean) => {
        setShowModal(bool);
    }

    return (
        <>
            <Header onLogin={isShowModal}/>
            {showModal ? <ModalWindow showModal={showModal} isShowModal={isShowModal}/> : null}
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/product/:id" element={<ProductPage/>}/>
                <Route path="/cart" element={
                    <ProtectedRoute user={user}>
                        <CartPage/>
                    </ProtectedRoute>
                }/>
                <Route path="/user" element={
                    <ProtectedRoute user={user}>
                        <UserPage/>
                    </ProtectedRoute>
                }/>
            </Routes>
        </>
    )
})

export default App
