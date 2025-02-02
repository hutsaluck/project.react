import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {logoutUser} from "../redux/slices/AuthSlice.ts";
import {Link} from "react-router-dom";

export const MenuComponent = () => {
    const isAuthenticated: boolean = useAppSelector((state) => state.authStoreSlice.isAuthenticated);
    const user: IUserWithTokens | null = useAppSelector((state) => state.authStoreSlice.user);
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div className="flex justify-between items-center my-5 mx-5">
            <Link to="/" className="text-2xl font-extrabold uppercase text-black hover:text-gray-500">
                Logo
            </Link>
            <ul className="flex list-none gap-5 items-center">
                {!isAuthenticated && (
                    <li>
                        <Link
                            to="/login"
                            className="capitalize text-black no-underline hover:text-gray-500">
                            Login
                        </Link>
                    </li>
                )}
                {isAuthenticated && (
                    <>
                        <li>
                            <Link
                                to="/users"
                                className="capitalize text-black no-underline hover:text-gray-500">
                                Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/recipes"
                                className="capitalize text-black no-underline hover:text-gray-500">
                                Recipes
                            </Link>
                        </li>
                        {/* Блок з аватаркою користувача та випадаючим меню */}
                        <li className="relative group">
                            <Link to={`users/${user?.id}`}
                                  className="capitalize text-black no-underline hover:text-gray-500">
                            <img
                                className="w-10 rounded-full cursor-pointer"
                                src={user?.image}
                                alt={user?.username}
                            />
                            </Link>
                            {/* Випадаюче меню, яке з'являється при наведенні на батьківський блок */}
                            <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                <button
                                    onClick={handleLogout}
                                    className="cursor-pointer block px-4 py-2 text-black hover:bg-gray-100 w-full text-left"
                                >
                                    Logout
                                </button>
                            </div>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};
