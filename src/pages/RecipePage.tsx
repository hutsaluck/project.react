import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import {useEffect} from "react";
import {recipeActions} from "../redux/slices/RecipeSlice.ts";
import RecipePageComponent from "../components/RecipePageComponent.tsx";
import {userActions} from "../redux/slices/UserSlice.ts";

export const RecipePage = () => {
    const dispatch = useAppDispatch()
    const users = useAppSelector(state => state.userStoreSlice.users);
    const recipes = useAppSelector(state => state.recipeStoreSlice.recipes);

    useEffect(() => {
        if (!users.length) {
            dispatch(userActions.loadUsers())
        }
        if (!recipes.length) {
            dispatch(recipeActions.loadRecipes())
        }
    }, [users, recipes, dispatch])

    return (
        <>
            <RecipePageComponent recipes={recipes} users={users}/>
        </>
    );
};