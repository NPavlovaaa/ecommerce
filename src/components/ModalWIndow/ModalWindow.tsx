import React, {FC, useState} from "react";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";
import styles from "./ModalWindow.module.scss";
import Button from "../Button";
import Text from "../Text";
import rootStore from "store/RootStore/instance";

type Props = {
    showModal: boolean,
    isShowModal: (bool: boolean) => void
}
const ModalWindow: FC<Props> = ({isShowModal, showModal}: Props) => {
    const [currShowModal, setShowModal] = useState(showModal);

    const onLogin = (values: any) => {
        setShowModal(false)
        rootStore.auth.login(values)
    }

    return (
        <>
            {currShowModal ?
                <>
                    <Formik
                        initialValues ={{
                            email: 'john@mail.com',
                            password: 'changeme',
                        }}
                        validationSchema={Yup.object({
                            email: Yup.string()
                                .email('Invalid email format').required('Required')
                                .required('Required field!'),
                            password: Yup.string()
                                .min(6, 'Minimum 6 characters to fill')
                                .required('Required field!'),
                        })}

                        onSubmit = {(values, {resetForm}) => {
                            onLogin(values);
                            resetForm();
                        }}
                    >
                        <div className={styles.modal}>
                            <div className={styles.modal__main}>
                                <Button
                                    className={styles.cancel}
                                    onClick={() => {
                                        setShowModal(false)
                                        isShowModal(false)
                                    }}>
                                    <Text children="x" color="primary" view="p-20"/>
                                </Button>
                                <Text children="Authorization" color="primary" view="title"/>
                                <Form method="POST">
                                    <div className={styles.modal__form}>
                                        <div className={styles.form_item}>
                                            <Field
                                                type="text"
                                                name="email"
                                                className={styles.modal__form__input}
                                                id="email"
                                                placeholder="Enter email"
                                                autoComplete="off"/>
                                        </div>
                                        <ErrorMessage component="div" className={styles.error} name="email"/>
                                        <div className={styles.form_item}>
                                            <Field
                                                type="password"
                                                name="password"
                                                className={styles.modal__form__input}
                                                id="password"
                                                placeholder="Enter password"
                                                autoComplete="off"/>
                                        </div>
                                        <ErrorMessage component="div" className={styles.error} name="password"/>
                                        <div className={styles.button_block}>
                                            <Button>
                                                <Text children="Sign in"/>
                                            </Button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Formik>
                    <div className={styles.modal__background}></div>
                </>
                : null}

        </>
    )
}
export default ModalWindow;