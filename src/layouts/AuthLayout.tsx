import {Navigate, Outlet} from "react-router-dom";
import {ReactNode} from "react";
import {useAppSelector} from "../redux/store.ts";

interface Props {
    children: ReactNode
}

export const AuthLayout = () => {

    const PrivateRoute = ({children}: Props) => {
        const isAuthenticated: boolean = useAppSelector((state) => state.authStoreSlice.isAuthenticated)
        return isAuthenticated ? children : <Navigate to="/project.react/login"/>;
    }
    return (
        <>
            <PrivateRoute>
                <Outlet/>
            </PrivateRoute>
        </>
    );
};