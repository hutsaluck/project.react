import {IUser} from "../../models/IUser.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadAuthUsers, refresh} from "../../services/api.service.ts";

type UserSliceType = {
    users: IUser[],
}
const initUserSliceState: UserSliceType = {users: []};

const loadUsers = createAsyncThunk(
    'loadUsers',
    async (_, thunkAPI) => {
        try {
            const users: IUser[] = await loadAuthUsers();
            return thunkAPI.fulfillWithValue(users);
        } catch (error) {
            console.error("Error loading users, trying to update token:", error);
            try {
                await refresh();
                const users: IUser[] = await loadAuthUsers();
                return thunkAPI.fulfillWithValue(users);
            } catch (refreshError) {
                console.error("Token update failed:", refreshError);
                return thunkAPI.rejectWithValue(refreshError);
            }
        }
    }
);

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initUserSliceState,
    reducers: {},
    extraReducers: builder => builder.addCase(loadUsers.fulfilled, (state, action:PayloadAction<IUser[]>) => {
        state.users = action.payload
    })
})

export const userActions = {...userSlice.actions, loadUsers}