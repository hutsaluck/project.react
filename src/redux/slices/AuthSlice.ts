import {createSlice} from '@reduxjs/toolkit';
import {IUserWithTokens} from "../../models/IUserWithTokens.ts";

type AuthSliceType = {
    isAuthenticated: boolean,
    user: IUserWithTokens | null,
}
const initAuthSliceState: AuthSliceType = {
    isAuthenticated: false,
    user: null,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initAuthSliceState,
    reducers: {
        loginUser: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const authActions = {...authSlice.actions}
export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
