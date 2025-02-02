import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {RecipesComponent} from "./RecipesComponent.tsx";
import {IUser} from "../models/IUser.ts";
import {IRecipe} from "../models/IRecipe.ts";
import {removeFilterTag} from "../redux/slices/FilterTagSlice.ts";
import {useDispatch} from "react-redux";

interface UserPageComponentProps {
    users: IUser[];
    recipes: IRecipe[];
}

export const UserPageComponent = ({users, recipes}: UserPageComponentProps) => {
    const {id} = useParams();

    const [user, setUser] = useState<IUser | null>(null);
    const [userRecipes, setUserRecipes] = useState<IRecipe[]>([]);
    const [moreInfo, setMoreInfo] = useState<boolean>(false)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeFilterTag())
        const currentUser = users.find((user) => user.id === Number(id)) ?? null;
        setUser(currentUser);
        setUserRecipes(recipes.filter((recipe) => recipe.userId === Number(id)));
    }, [users, recipes, id, dispatch]);


    return (
        <div className="p-5">
            {user ? (
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-5 mb-8">
                        <img
                            src={user.image}
                            alt={`${user.firstName} ${user.lastName}`}
                            className="w-50 h-50 rounded-lg"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">
                                {user.firstName} {user.lastName}
                            </h1>
                            <p className="text-gray-500">Maiden Name: {user.maidenName}</p>
                            <p className="text-gray-500">Username: @{user.username}</p>
                            <p className="text-gray-500">Birth Date: {user.birthDate}</p>
                            <p className="text-gray-500">Age: {user.age}</p>
                            <p className="text-gray-500">Gender: {user.gender}</p>
                            <p className="text-gray-500">Blood Group: {user.bloodGroup}</p>
                            <p className="text-gray-500">Height: {user.height} cm</p>
                            <p className="text-gray-500">Weight: {user.weight} kg</p>
                            <p className="text-gray-500">Eye Color: {user.eyeColor}</p>
                            <p className="text-gray-500">
                                Hair: {user.hair.type} ({user.hair.color})
                            </p>
                            <p className="text-gray-500">IP: {user.ip}</p>
                            <p className="text-gray-500">MAC: {user.macAddress}</p>
                            <p className="text-gray-500">University: {user.university}</p>
                            <p className="text-gray-500">Role: {user.role}</p>
                            <p className="text-gray-500">User Agent: {user.userAgent}</p>
                            <p className="text-gray-500">EIN: {user.ein}</p>
                            <p className="text-gray-500">SSN: {user.ssn}</p>
                            <p>
                                <a
                                    href={`mailto:${user.email}`}
                                    className="font-bold hover:text-gray-500 hover:shadow-black"
                                >
                                    {user.email}
                                </a>
                            </p>
                            <p>
                                <a
                                    href={`tel:${user.phone}`}
                                    className="font-bold hover:text-gray-500 hover:shadow-black"
                                >
                                    {user.phone}
                                </a>
                            </p>
                            <button
                                onClick={() => setMoreInfo(!moreInfo)}
                                className="my-5 bg-gray-500 hover:bg-gray-600 text-white cursor-pointer font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200"
                            >
                                Show {!moreInfo ? `more`: `less`} info
                            </button>
                        </div>
                    </div>

                    {moreInfo && (
                        <div className="grid grid-cols-4 gap-5 justify-center items-start mx-5">
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Address</h2>
                                <p>
                                    <strong>Country:</strong> {user.address.country}
                                </p>
                                <p>
                                    <strong>State:</strong> {user.address.state} ({user.address.stateCode})
                                </p>
                                <p>
                                    <strong>City:</strong> {user.address.city}
                                </p>
                                <p>
                                    <strong>Address:</strong> {user.address.address}
                                </p>
                                <p>
                                    <strong>Postal Code:</strong> {user.address.postalCode}
                                </p>
                                <p>
                                    <strong>Coordinates:</strong> {user.address.coordinates.lat},{" "}
                                    {user.address.coordinates.lng}
                                </p>
                            </div>
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Company</h2>
                                <p>
                                    <strong>Name:</strong> {user.company.name}
                                </p>
                                <p>
                                    <strong>Title:</strong> {user.company.title}
                                </p>
                                <p>
                                    <strong>Department:</strong> {user.company.department}
                                </p>
                                {/* Адреса компанії */}
                                {user.company.address && (
                                    <div className="ml-4 mt-2">
                                        <h3 className="text-lg font-semibold">Company Address</h3>
                                        <p>
                                            <strong>Country:</strong> {user.company.address.country}
                                        </p>
                                        <p>
                                            <strong>State:</strong> {user.company.address.state} ({user.company.address.stateCode})
                                        </p>
                                        <p>
                                            <strong>City:</strong> {user.company.address.city}
                                        </p>
                                        <p>
                                            <strong>Address:</strong> {user.company.address.address}
                                        </p>
                                        <p>
                                            <strong>Postal Code:</strong> {user.company.address.postalCode}
                                        </p>
                                        <p>
                                            <strong>Coordinates:</strong> {user.company.address.coordinates.lat},{" "}
                                            {user.company.address.coordinates.lng}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Bank</h2>
                                <p>
                                    <strong>Card Number:</strong> {user.bank.cardNumber}
                                </p>
                                <p>
                                    <strong>Card Expire:</strong> {user.bank.cardExpire}
                                </p>
                                <p>
                                    <strong>Card Type:</strong> {user.bank.cardType}
                                </p>
                                <p>
                                    <strong>Currency:</strong> {user.bank.currency}
                                </p>
                                <p>
                                    <strong>IBAN:</strong> {user.bank.iban}
                                </p>
                            </div>
                            <div className="mb-8">
                                <h2 className="text-xl font-semibold mb-2">Crypto</h2>
                                <p>
                                    <strong>Coin:</strong> {user.crypto.coin}
                                </p>
                                <p>
                                    <strong>Wallet:</strong> {user.crypto.wallet}
                                </p>
                                <p>
                                    <strong>Network:</strong> {user.crypto.network}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}

            {userRecipes.length > 0 && (
                <div className="mt-8">
                    <RecipesComponent recipes={userRecipes}/>
                </div>
            )}
        </div>
    );
};
