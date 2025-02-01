import {Link} from "react-router";
import {useAppSelector} from "../redux/store.ts";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";

export const MenuComponent = () => {
    const isAuthenticated: boolean = useAppSelector((state) => state.authStoreSlice.isAuthenticated)
    const user: IUserWithTokens | null = useAppSelector((state) => state.authStoreSlice.user)

    return (
        <div className="flex justify-between items-center my-5 mx-5">
            <Link to="/" className="text-2xl font-extrabold uppercase text-bloack">
                Logo
            </Link>
            <ul className="flex list-none gap-5 items-center">
                {!isAuthenticated && (
                    <li>
                        <Link to="/login"
                              className="capitalize text-black no-underline hover:text-gray-500">Login</Link>
                    </li>
                )}
                {isAuthenticated && (
                    <>
                        <li>
                            <Link to="/users"
                                  className="capitalize text-black no-underline hover:text-gray-500">Users</Link>
                        </li>
                        <li>
                            <Link to="/recipes"
                                  className="capitalize text-black no-underline hover:text-gray-500">Recipes</Link>
                        </li>
                        <li>
                            <Link to={`users${user?.id}`}
                                  className="capitalize text-black no-underline hover:text-gray-500">
                                <img className="w-10" src={user?.image} alt={user?.username}/>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>

    );
};