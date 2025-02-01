import {IRecipe} from "../models/IRecipe.ts";
import {Link} from "react-router-dom";
import {RecipeTagComponent} from "./RecipeTagComponent.tsx";

interface RecipeComponentProps {
    recipe: IRecipe
}

export const RecipeComponent = ({recipe}: RecipeComponentProps) => {
    return (
        <div
            className="overflow-hidden my-10 border border-gray-300 rounded-2xl grid justify-center items-center cursor-pointer transition-shadow duration-500 hover:shadow-lg group">
            <Link to={`/recipes/${recipe.id}`}>
                <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full object-cover rounded-t-2xl transition-transform duration-500 hover:scale-110"
                />
            </Link>
            <div className="p-4">
                <Link to={`/recipes/${recipe.id}`}>

                    <h3 className="text-lg font-semibold text-gray-800">{recipe.name}</h3>
                </Link>
                <div className="p-4">
                    <h4 className="text-base font-semibold text-gray-800 my-2">Tags:</h4>
                    <p className="grid grid-cols-3 gap-1 justify-center items-start">
                        {recipe.tags.map((tag, index) => <RecipeTagComponent key={index} tag={tag} index={index}/>)}
                    </p>
                </div>
            </div>
        </div>
    );
};