import {IRecipe} from "../../models/IRecipe.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadAuthRecipes, refresh} from "../../services/api.service.ts";

type RecipeSliceType = {
    recipes: IRecipe[],
}
const initRecipeSliceState: RecipeSliceType = {recipes: []};

const loadRecipes = createAsyncThunk(
    'loadRecipes',
    async (_, thunkAPI) => {
        try {
            const recipes: IRecipe[] = await loadAuthRecipes();
            return thunkAPI.fulfillWithValue(recipes);
        } catch (error) {
            console.error("Error loading recipes, trying to update the token:", error);
            try {
                await refresh();
                const recipes: IRecipe[] = await loadAuthRecipes();
                return thunkAPI.fulfillWithValue(recipes);
            } catch (refreshError) {
                console.error("Token update failed:", refreshError);
                return thunkAPI.rejectWithValue(refreshError);
            }
        }
    }
);

export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState: initRecipeSliceState,
    reducers: {},
    extraReducers: builder => builder.addCase(loadRecipes.fulfilled, (state, action:PayloadAction<IRecipe[]>) => {
        state.recipes = action.payload
    })
})

export const recipeActions = {...recipeSlice.actions, loadRecipes}