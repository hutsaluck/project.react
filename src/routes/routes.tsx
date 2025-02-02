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
        path: '/project.react/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <HomePage/>
            },
            {
                path: '/project.react/login',
                element: <LoginPage/>
            },
            {
                path: '',
                element: <AuthLayout/>,
                children: [
                    {
                        path: '/project.react/users',
                        element: <UsersPage/>
                    },
                    {
                        path: '/project.react/users/:id',
                        element: <UserPage/>
                    },
                    {
                        path: '/project.react/recipes',
                        element: <RecipesPage/>
                    },
                    {
                        path: '/project.react/recipes/:id',
                        element: <RecipePage/>
                    },
                ]
            },
        ]
    }
])