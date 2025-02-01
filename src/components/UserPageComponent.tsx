import {useParams} from "react-router-dom";
import {IUser} from "../models/IUser.ts";
import {useEffect, useState} from "react";
import {RecipesComponent} from "./RecipesComponent.tsx";
import {IRecipe} from "../models/IRecipe.ts";

interface UserPageComponentProps {
    users: IUser[],
    recipes: IRecipe[],
}

export const UserPageComponent = ({users, recipes}: UserPageComponentProps) => {
    const {id} = useParams();

    const [user, setUser] = useState<IUser | null>(null)
    const [userRecipes, setUserRecipes] = useState<IRecipe[]>([])

    useEffect(() => {
        setUser(users.find(user => user.id === Number(id)) ?? null);
        setUserRecipes(recipes.filter(recipe => recipe.userId === Number(id)))
    }, [users, recipes, id])


    return (
        <div>
            {user && (
                <div className="p-5 md:px-24 grid md:grid-cols-[300px_1fr] gap-5 justify-center">
                    <img src={user?.image} alt="user" className="w-full max-w-[300px] rounded-lg"/>
                    <div>
                        <h1 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h1>
                        <p className="text-gray-500">@{user?.username}</p>
                        <p className="text-gray-500">{user?.birthDate}</p>
                        <p><a href={'mailto:' + user?.email}
                              className="font-bold hover:text-white hover:shadow-black">{user?.email}</a></p>
                        <p><a href={'tel:' + user?.phone}
                              className="font-bold hover:text-white hover:shadow-black">{user?.phone}</a></p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                            <div>
                                <h2 className="text-lg font-semibold">Address:</h2>
                                <p>{user?.address.country}</p>
                                <p>{user?.address.state}</p>
                                <p>{user?.address.city}</p>
                                <p>{user?.address.address}</p>
                                <p>{user?.address.postalCode}</p>
                                <p>{user?.address.coordinates.lat} {user?.address.coordinates.lng}</p>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold">Company:</h2>
                                <p>{user?.company.name}</p>
                                <p>{user?.company.title}</p>
                                <p>{user?.company.department}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {userRecipes.length > 0 && (
                <RecipesComponent recipes={userRecipes}/>
            )}
        </div>
    );
};