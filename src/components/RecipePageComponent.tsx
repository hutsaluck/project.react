import React, {useEffect, useState} from 'react';
import {IRecipe} from "../models/IRecipe.ts";
import {Link, useParams} from "react-router-dom";
import {IUser} from "../models/IUser.ts";

interface RecipeProps {
    recipes: IRecipe[],
    users: IUser[]
}

const RecipePageComponent: React.FC<RecipeProps> = ({recipes, users}) => {
    const {id} = useParams();
    const [recipe, setRecipe] = useState<IRecipe | null>(null)
    const [recipeUser, setRecipeUser] = useState<IUser | null>(null)

    useEffect(() => {
        setRecipe(recipes.find(recipe => recipe.id === Number(id)) ?? null)
        setRecipeUser(users.find(user => user.id === Number(recipe?.userId)) ?? null);
    }, [recipe, recipes, id, users])

    return (
        <div>
            {recipe && (
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{recipe.name}</h1>

                    {recipe.image && (
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-180 object-cover rounded-2xl mb-6"
                        />
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <p className="text-gray-600">
                                <span className="font-semibold">ID:</span> {recipe.id}
                            </p>
                            <Link to={`/users/${recipe.userId}`} className="text-gray-600">
                                <span className="font-semibold">Автор:</span> {recipeUser?.firstName} {recipeUser?.lastName}
                            </Link>
                            <p className="text-gray-600">
                                <span className="font-semibold">Кухня:</span> {recipe.cuisine}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Складність:</span> {recipe.difficulty}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Порції:</span> {recipe.servings}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">
                                <span className="font-semibold">Час приготування:</span>{' '}
                                {recipe.prepTimeMinutes} хв (підготовка) + {recipe.cookTimeMinutes} хв (готування)
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Калорій на порцію:</span> {recipe.caloriesPerServing}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Рейтинг:</span> {recipe.rating}{' '}
                                <span className="text-sm text-gray-500">({recipe.reviewCount} відгуків)</span>
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Тип страви:</span> {recipe.mealType.join(', ')}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-semibold">Теги:</span> {recipe.tags.join(', ')}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Інгредієнти</h2>
                        <ul className="list-disc list-inside text-gray-700">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Інструкції</h2>
                        <ol className="list-decimal list-inside text-gray-700">
                            {recipe.instructions.map((instruction, index) => (
                                <li key={index} className="mb-2">
                                    {instruction}
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecipePageComponent;
