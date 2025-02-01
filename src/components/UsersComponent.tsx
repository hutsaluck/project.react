import {useEffect, useState} from "react";
import {IUser} from "../models/IUser.ts";
import {UserComponent} from "./UserComponent.tsx";
import {useSearchParams} from "react-router";
import {PaginationComponent} from "./PaginationComponent.tsx";
import {SearchComponent} from "./SearchComponent.tsx";

interface UsersComponentProps {
    users: IUser[]
}

export const UsersComponent = ({users}: UsersComponentProps) => {
    const [searchParams] = useSearchParams({page: '1'})
    const [usersPage, setUsersPage] = useState<IUser[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const [searchQuery, setSearchQuery] = useState<string>('')

    useEffect(() => {
        const limit: number = 28
        const page: number = Number(searchParams.get('page') || 1)
        const skip: number = limit * page - limit
        let searchUsers: IUser[] = users
        if (searchQuery) {
            searchUsers = users.filter(user => JSON.stringify(user).toLowerCase().includes(searchQuery.toLowerCase()))
        }
        setUsersPage(searchUsers.slice(skip, skip + limit))

        const total: number = searchUsers.length
        setTotalPages(total / limit)
    }, [searchParams, users, searchQuery])

    return (
        <>
            <SearchComponent searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
            <div className="grid grid-cols-4 gap-10 justify-center items-start mx-5">
                {usersPage.map((user: IUser) => <UserComponent key={user.id} user={user}/>)}
            </div>
            <PaginationComponent totalPages={Math.ceil(totalPages)}/>
        </>
    );
};