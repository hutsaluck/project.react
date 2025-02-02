import {PaginationComponent} from "./PaginationComponent.tsx";
import {useEffect, useRef, useState} from "react";
import {IRecipe} from "../models/IRecipe.ts";
import {useSearchParams} from "react-router";
import {RecipeComponent} from "./RecipeComponent.tsx";
import {SearchComponent} from "./SearchComponent.tsx";
import {useAppSelector} from "../redux/store.ts";
import {useDispatch} from "react-redux";
import {setSearchQuery, setSearchType} from "../redux/slices/SearchSlice.ts";
import {useLocation} from "react-router-dom";
import {setFilterTag} from "../redux/slices/FilterTagSlice.ts";
import {arraysEqual} from "../helpers/helpers.ts";

interface RecipesComponentProps {
    recipes: IRecipe[]
}

export const RecipesComponent = ({recipes}: RecipesComponentProps) => {
    const [searchParams, setSearchParams] = useSearchParams({page: '1'})
    const [recipesPage, setRecipesPage] = useState<IRecipe[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const searchQuery: string = useAppSelector((state) => state.searchStoreSlice.searchQuery)
    const searchType: string = useAppSelector((state) => state.searchStoreSlice.searchType)
    const filterTags: string[] = useAppSelector((state) => state.filterTagStoreSlice.filterTags)
    const dispatch = useDispatch();
    const location = useLocation();
    const prevSearchQuery = useRef(searchQuery);
    const prevFilterTags = useRef(filterTags);

    useEffect(() => {
        if (prevSearchQuery.current !== searchQuery || arraysEqual(prevFilterTags.current, filterTags)) {
            prevSearchQuery.current = searchQuery;
            prevFilterTags.current = filterTags;

            if (searchParams.get('page') !== '1') {
                setSearchParams({page: '1'});
            }
        }

        if (searchType !== 'recipes') {
            dispatch(setSearchQuery(''))
            dispatch(setSearchType('recipes'))
        }

        const limit: number = 8
        const page: number = Number(searchParams.get('page') || 1)
        let searchRecipes: IRecipe[] = recipes
        if (filterTags.length) {
            searchRecipes = recipes.filter(recipe =>
                filterTags.some(tag => recipe.tags.includes(tag))
            );
        } else if (searchQuery) {
            searchRecipes = recipes.filter(recipe => JSON.stringify(recipe).toLowerCase().includes(searchQuery.toLowerCase()))
        }
        const skip: number = limit * page - limit
        setRecipesPage(searchRecipes.slice(skip, skip + limit))

        const total: number = searchRecipes.length
        setTotalPages(total / limit)
    }, [searchParams, recipes, searchQuery, searchType, filterTags, dispatch])

    return (
        <>
            {!location.pathname.includes('users') && (<SearchComponent/>)}
            {filterTags.length >= 1 && (<div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-5 justify-center items-start mx-5">
                {filterTags.map((tag, index) => (
                    <p
                        key={index}
                        onClick={() => dispatch(setFilterTag(tag))}
                        className="grid grid-flow-col gap-1 w-max bg-gray-400 rounded-2xl py-1 px-3 text-white text-center cursor-pointer transition-shadow duration-500 hover:shadow-lg"
                    >
                        <span>×</span>
                        <span>#{tag}</span>
                    </p>
                ))}
            </div>)}
            <div className="grid grid-cols-4 gap-5 justify-center items-start mx-5">
                {recipesPage.map((recipe: IRecipe) => <RecipeComponent key={recipe.id} recipe={recipe}/>)}
            </div>
            {(!location.pathname.includes('users') && recipes.length > 8) && (
                <PaginationComponent totalPages={Math.ceil(totalPages)}/>)}
        </>
    );
};