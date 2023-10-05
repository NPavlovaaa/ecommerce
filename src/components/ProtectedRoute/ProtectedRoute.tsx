import React, {FC} from 'react';
import {Navigate} from "react-router-dom";
import {UserModel} from "../../store/models/users/User";

type Props = {
    user: UserModel | null,
    children: React.ReactNode,
}

const ProtectedRoute: FC<Props> = ({
    user,
    children,
}: Props) => {
    if (!user) {
        return <Navigate to="/" replace/>;
    }

    return children;
};
export default ProtectedRoute;