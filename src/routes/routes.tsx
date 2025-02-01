import {createBrowserRouter, Navigate} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {RecipesPage} from "../pages/RecipesPage.tsx";
import {UserPage} from "../pages/UserPage.tsx";
import {UsersPage} from "../pages/UsersPage.tsx";
import {RecipePage} from "../pages/RecipePage.tsx";
import {useAppSelector} from "../redux/store.ts";
import {ReactNode} from "react";

interface Props {
    children?: ReactNode
}

const PrivateRoute = ({children}: Props) => {
    const isAuthenticated: boolean = useAppSelector((state) => state.authStoreSlice.isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login"/>;
}

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: 'login',
                element: <LoginPage/>
            },
            {
                path: '/users',
                element: <PrivateRoute>
                    <UsersPage/>
                </PrivateRoute>,
            },
            {
                path: '/users/:id',
                element: <PrivateRoute>
                    <UserPage/>
                </PrivateRoute>,
            },
            {
                path: '/recipes',
                element: <PrivateRoute>
                    <RecipesPage/>
                </PrivateRoute>,
            },
            {
                path: '/recipes/:id',
                element: <PrivateRoute>
                    <RecipePage/>
                </PrivateRoute>,
            },
        ]
    }
])