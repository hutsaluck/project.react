import {SearchIconComponent} from "./SearchIconComponent.tsx";
import React from "react";
import {useDispatch} from "react-redux";
import {useAppSelector} from "../redux/store.ts";
import {setSearchQuery} from "../redux/slices/SearchSlice.ts";

export const SearchComponent = () => {
    const dispatch = useDispatch();
    const searchQuery: string = useAppSelector((state) => state.searchStoreSlice.searchQuery)

    return (
        <div className="flex justify-center items-center w-full mt-4">
            <div className="relative w-80">
                <SearchIconComponent/>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setSearchQuery(e.target.value))}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
            </div>
        </div>
    );
};