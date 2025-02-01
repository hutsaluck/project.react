import {SearchIconComponent} from "./SearchIconComponent.tsx";
import React from "react";

interface SearchComponentProps {
    searchQuery: string,
    setSearchQuery: (value: (((prevState: string) => string) | string)) => void
}

export const SearchComponent = ({searchQuery, setSearchQuery}: SearchComponentProps) => {
    return (
        <div className="flex justify-center items-center w-full mt-4">
            <div className="relative w-80">
                <SearchIconComponent/>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
            </div>
        </div>
    );
};