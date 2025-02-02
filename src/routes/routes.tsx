import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {HomePage} from "../pages/HomePage.tsx";
import {LoginPage} from "../pages/LoginPage.tsx";
import {RecipesPage} from "../pages/RecipesPage.tsx";
import {UserPage} from "../pages/UserPage.tsx";
import {UsersPage} from "../pages/UsersPage.tsx";
import {RecipePage} from "../pages/RecipePage.tsx";
import {AuthLayout} from "../layouts/AuthLayout.tsx";

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
                path: '',
                element: <AuthLayout/>,
                children: [
                    {
                        path: 'users',
                        element: <UsersPage/>
                    },
                    {
                        path: '/users/:id',
                        element: <UserPage/>
                    },
                    {
                        path: '/recipes',
                        element: <RecipesPage/>
                    },
                    {
                        path: '/recipes/:id',
                        element: <RecipePage/>
                    },
                ]
            },
        ]
    }
])