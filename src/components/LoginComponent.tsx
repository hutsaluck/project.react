import {useForm} from "react-hook-form";
import {IUserLogin} from "../models/IUserLogin.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import {LoginValidator} from "../validators/LoginValidator.ts";
import {useState} from "react";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {login} from "../services/api.service.ts";
import {useDispatch} from "react-redux";
import {loginUser} from "../redux/slices/AuthSlice.ts";
import {useNavigate} from "react-router-dom";

export const LoginComponent = () => {
    const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm<IUserLogin>({
        mode: 'all',
        resolver: joiResolver(LoginValidator)
    })

    const [message, setMessage] = useState<boolean>(false)
    const [user, setUser] = useState<IUserWithTokens | null>(null)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandler = (data: IUserLogin) => {
        login({...data, expiresInMins: 1}).then((user: IUserWithTokens) => {
            setUser(user)
            setMessage(true)
            dispatch(loginUser(user))
            navigate(`/users/${user.id}`);
        })
        reset()
        setTimeout(() => {
            setMessage(false)
        }, 3000)
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">Do you want to visit the site?</h2>
            <p className="text-center text-lg mb-6">Enter your data!</p>
            <form className="grid gap-5" onSubmit={handleSubmit(loginHandler)}>
                <label htmlFor="name" className="relative">
                    <p className="bg-white py-0 font-light absolute px-1 -top-3 left-4 bg-primary-color text-text-color-button">Name</p>
                    <input
                        type="text"
                        {...register('username')}
                        id="name"
                        placeholder="Name"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username.message}</p>}
                </label>

                <label htmlFor="password" className="relative">
                    <p className="bg-white py-0 font-light absolute px-1 -top-3 left-4 bg-primary-color text-text-color-button">Password</p>
                    <input
                        type="password"
                        {...register('password')}
                        id="password"
                        placeholder="Password"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>}
                </label>
                <input
                    type="submit"
                    value="Login"
                    disabled={!isValid}
                    className="px-10 py-4 uppercase bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-200"
                />
            </form>
            {message &&
                <p className="text-center text-sm mt-4 text-gray-500">
                    Welcome {user?.firstName} {user?.lastName}!
                </p>}
        </div>
    );
};