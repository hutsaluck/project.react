import { useAppDispatch, useAppSelector } from "../redux/store.ts";
import { IUserWithTokens } from "../models/IUserWithTokens.ts";
import { logoutUser } from "../redux/slices/AuthSlice.ts";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CloseIcon } from "../icons/CloseIcon.tsx";
import MenuIcon from "../icons/MenuIcon.tsx";

export const MenuComponent = () => {
    const isAuthenticated: boolean = useAppSelector(
        (state) => state.authStoreSlice.isAuthenticated
    );
    const user: IUserWithTokens | null = useAppSelector(
        (state) => state.authStoreSlice.user
    );
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    return (
        <nav className="flex justify-between items-center my-5 mx-5 z-9">
            <Link to="/project.react/" className="text-2xl font-extrabold uppercase text-black hover:text-gray-500">
                Logo
            </Link>
            <button
                className="block md:hidden text-black focus:outline-none сursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <CloseIcon className="cursor-pointer" /> : <MenuIcon className="cursor-pointer" />}
            </button>
            <ul
                className={`
                    flex-col md:flex-row md:flex list-none gap-5 items-center z-9 
                    absolute md:static top-16 right-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-5 md:p-0 
                    transition-transform duration-300 ${isOpen ? "flex h-screen" : "hidden"} md:flex`}
            >
                {!isAuthenticated && (
                    <li>
                        <Link to="/project.react/login" className="capitalize text-black no-underline hover:text-gray-500">
                            Login
                        </Link>
                    </li>
                )}
                {isAuthenticated && (
                    <>
                        <li>
                            <Link to="/project.react/users" className="capitalize text-black no-underline hover:text-gray-500">
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link to="/project.react/recipes" className="capitalize text-black no-underline hover:text-gray-500">
                                Recipes
                            </Link>
                        </li>
                        <li className="relative group">
                            <Link to={`/project.react/users/${user?.id}`} className="capitalize text-black no-underline hover:text-gray-500">
                                <img
                                    className="w-10 rounded-full cursor-pointer"
                                    src={user?.image}
                                    alt={user?.username}
                                />
                            </Link>
                            {!isOpen && (<div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
                                >
                                    Logout
                                </button>
                            </div>)}
                        </li>
                        {isOpen && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer capitalize text-black no-underline hover:text-gray-500"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </>
                )}
            </ul>
        </nav>
    );
};
