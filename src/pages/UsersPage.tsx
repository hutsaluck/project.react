import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/store.ts";
import {userActions} from "../redux/slices/UserSlice.ts";
import {IUser} from "../models/IUser.ts";
import {UsersComponent} from "../components/UsersComponent.tsx";


export const UsersPage = () => {
    const dispatch = useAppDispatch()
    const users: IUser[] = useAppSelector((state) => state.userStoreSlice.users)

    useEffect(() => {
        dispatch(userActions.loadUsers())
    }, [])

    return (
        <>
            <UsersComponent users={users}/>
        </>
    );
};