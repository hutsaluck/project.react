import {configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./slices/UserSlice.ts";
import {recipeSlice} from "./slices/RecipeSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {authSlice} from "./slices/AuthSlice.ts";

export const store = configureStore({
    reducer: {
        authStoreSlice: authSlice.reducer,
        userStoreSlice: userSlice.reducer,
        recipeStoreSlice: recipeSlice.reducer,
    }
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>()