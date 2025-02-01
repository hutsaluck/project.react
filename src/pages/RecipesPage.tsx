import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import {recipeActions} from "../redux/slices/RecipeSlice.ts";
import {IRecipe} from "../models/IRecipe.ts";
import {RecipesComponent} from "../components/RecipesComponent.tsx";


export const RecipesPage = () => {
    const dispatch = useAppDispatch()
    const recipes: IRecipe[] = useAppSelector((state) => state.recipeStoreSlice.recipes)

    useEffect(() => {
        dispatch(recipeActions.loadRecipes())
    }, [])

    return (
        <>
            <RecipesComponent recipes={recipes}/>
        </>
    );
};