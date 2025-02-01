import {configureStore} from "@reduxjs/toolkit";
import {useDispatch, useSelector} from "react-redux";
import {userSlice} from "./slices/UserSlice.ts";
import {recipeSlice} from "./slices/RecipeSlice.ts";
import {authSlice} from "./slices/AuthSlice.ts";
import {searchSlice} from "./slices/SearchSlice.ts";
import {filterTagSlice} from "./slices/FilterTagSlice.ts";

export const store = configureStore({
    reducer: {
        userStoreSlice: userSlice.reducer,
        recipeStoreSlice: recipeSlice.reducer,
        authStoreSlice: authSlice.reducer,
        searchStoreSlice: searchSlice.reducer,
        filterTagStoreSlice: filterTagSlice.reducer,
    }
})

export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>()
export const useAppSelector = useSelector.withTypes<ReturnType<typeof store.getState>>()