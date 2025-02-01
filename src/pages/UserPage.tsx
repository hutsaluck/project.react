import {UserPageComponent} from "../components/UserPageComponent.tsx";
import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import {useEffect} from "react";
import {userActions} from "../redux/slices/UserSlice.ts";
import {recipeActions} from "../redux/slices/RecipeSlice.ts";

export const UserPage = () => {
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
            <UserPageComponent users={users} recipes={recipes} />
        </>
    );
};