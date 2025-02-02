import axios from "axios";
import {IUserWithTokens} from "../models/IUserWithTokens.ts";
import {IBaseResponseModel} from "../models/IBaseResponseModel.ts";
import {retriveLocalStorage} from "./helpers.ts";
import {ITokenPair} from "../models/ITokenPair.ts";
import {IRecipe} from "../models/IRecipe.ts";
import {IUser} from "../models/IUser.ts";

type LoginData = {
    username: string
    password: string
    expiresInMins: number
}

const axiosInstance = axios.create({
    baseURL: "https://dummyjson.com/auth",
    headers: {}
})

axiosInstance.interceptors.request.use((requestObject) => {
    if (requestObject.method?.toUpperCase() === 'GET') {
        requestObject.headers.Authorization = `Bearer ${retriveLocalStorage<IUserWithTokens>('user').accessToken}`;
    }
    return requestObject
})

export const login = async ({username, password, expiresInMins}: LoginData): Promise<IUserWithTokens> => {
    const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>("/login", {
        username,
        password,
        expiresInMins
    })
    localStorage.setItem("user", JSON.stringify(userWithTokens));
    return userWithTokens
}

export const loadAuthRecipes = async (): Promise<IRecipe[]> => {
    const recipes: IRecipe[] = [];
    let skip: number = 0;
    const limit: number = 30;
    let total: number = 1;

    while (skip < total) {
        const {data} = await axiosInstance.get<IBaseResponseModel>(`/recipes?limit=${limit}&skip=${skip}`);
        recipes.push(...(data.recipes ?? []));
        total = data.total;
        skip += limit;
    }

    return recipes as IRecipe[];
}

export const loadAuthUsers = async (): Promise<IUser[]> => {
    const users: IUser[] = [];
    let skip: number = 0;
    const limit: number = 30;
    let total: number = 1;

    while (skip < total) {
        const {data} = await axiosInstance.get<IBaseResponseModel>(`/users?limit=${limit}&skip=${skip}`);
        users.push(...(data.users ?? []));
        total = data.total;
        skip += limit;
    }

    return users as IUser[];
}

export const refresh = async (): Promise<void> => {
    const userWithTokens = retriveLocalStorage<IUserWithTokens>("user");
    const {
        data: {
            accessToken,
            refreshToken
        }
    } = await axiosInstance.post<ITokenPair>("/refresh", {
        refreshToken: userWithTokens.refreshToken,
        expiresInMins: 1
    });
    userWithTokens.accessToken = accessToken;
    userWithTokens.refreshToken = refreshToken;
    localStorage.setItem("user", JSON.stringify(userWithTokens));
}