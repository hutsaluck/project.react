import {useEffect, useRef, useState} from "react";
import {IUser} from "../models/IUser.ts";
import {UserComponent} from "./UserComponent.tsx";
import {useSearchParams} from "react-router";
import {PaginationComponent} from "./PaginationComponent.tsx";
import {SearchComponent} from "./SearchComponent.tsx";
import {useAppSelector} from "../redux/store.ts";
import {useDispatch} from "react-redux";
import {setSearchQuery, setSearchType} from "../redux/slices/SearchSlice.ts";

interface UsersComponentProps {
    users: IUser[]
}

export const UsersComponent = ({users}: UsersComponentProps) => {
    const [searchParams, setSearchParams] = useSearchParams({page: '1'})
    const [usersPage, setUsersPage] = useState<IUser[]>([])
    const [totalPages, setTotalPages] = useState<number>(1)
    const searchQuery: string = useAppSelector((state) => state.searchStoreSlice.searchQuery)
    const searchType: string = useAppSelector((state) => state.searchStoreSlice.searchType)
    const dispatch = useDispatch();
    const prevSearchQuery = useRef(searchQuery);

    useEffect(() => {
        if (prevSearchQuery.current !== searchQuery) {
            prevSearchQuery.current = searchQuery;

            if (searchParams.get('page') !== '1') {
                setSearchParams({page: '1'});
            }
        }

        if (searchType !== 'users') {
            dispatch(setSearchQuery(''))
            dispatch(setSearchType('users'))
        }

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
    }, [searchParams, setSearchParams, users, searchQuery, dispatch, searchType])

    return (
        <>
            <SearchComponent/>
            <div className="grid grid-cols-4 gap-10 justify-center items-start mx-5">
                {usersPage.map((user: IUser) => <UserComponent key={user.id} user={user}/>)}
            </div>
            <PaginationComponent totalPages={Math.ceil(totalPages)}/>
        </>
    );
};