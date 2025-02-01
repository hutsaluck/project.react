import {PaginationComponent} from "./PaginationComponent.tsx";
import {useEffect, useState} from "react";
import {IRecipe} from "../models/IRecipe.ts";
import {useSearchParams} from "react-router";
import {RecipeComponent} from "./RecipeComponent.tsx";
import {SearchComponent} from "./SearchComponent.tsx";
import {useAppSelector} from "../redux/store.ts";
import {useDispatch} from "react-redux";
import {setSearchQuery, setSearchType} from "../redux/slices/SearchSlice.ts";

interface RecipesComponentProps {
    recipes: IRecipe[]
}

export const RecipesComponent = ({recipes}: RecipesComponentProps) => {
    const [searchParams] = useSearchParams({page: '1'})
    const [recipesPage, setRecipesPage] = useState<IRecipe[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const searchQuery: string = useAppSelector((state) => state.searchStoreSlice.searchQuery)
    const searchType: string = useAppSelector((state) => state.searchStoreSlice.searchType)
    const filterTag: string = useAppSelector((state) => state.filterTagStoreSlice.filterTag)
    const dispatch = useDispatch();

    useEffect(() => {
        if(searchType !== 'recipes'){
            dispatch(setSearchQuery(''))
            dispatch(setSearchType('recipes'))
        }

        const limit: number = 8
        let page: number = Number(searchParams.get('page') || 1)
        let searchRecipes: IRecipe[] = recipes
        if (filterTag) {
            page = 1
            searchRecipes = recipes.filter(recipe => recipe.tags.includes(filterTag))
        } else if (searchQuery) {
            page = 1
            searchRecipes = recipes.filter(recipe => JSON.stringify(recipe).toLowerCase().includes(searchQuery.toLowerCase()))
        }
        const skip: number = limit * page - limit
        setRecipesPage(searchRecipes.slice(skip, skip + limit))

        const total: number = searchRecipes.length
        setTotalPages(total / limit)
    }, [searchParams, recipes, searchQuery, searchType, filterTag, dispatch])

    return (
        <>
            <SearchComponent/>
            <div className="grid grid-cols-4 gap-5 justify-center items-start mx-5">
                {recipesPage.map((recipe: IRecipe) => <RecipeComponent key={recipe.id} recipe={recipe} />)}
            </div>
            <PaginationComponent totalPages={Math.ceil(totalPages)}/>
        </>
    );
};