import {Outlet} from "react-router-dom";
import {MenuComponent} from "../components/MenuComponent.tsx";

export const MainLayout = () => {
    return (
        <>
            <MenuComponent/>
            <Outlet/>
        </>
    );
};