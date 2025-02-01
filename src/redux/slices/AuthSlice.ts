import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserWithTokens } from '../../models/IUserWithTokens';

const storedUser = localStorage.getItem('user');
const initUser: IUserWithTokens | null = storedUser ? JSON.parse(storedUser) : null;

type AuthSliceType = {
    isAuthenticated: boolean;
    user: IUserWithTokens | null;
};

const initAuthSliceState: AuthSliceType = {
    isAuthenticated: !!initUser,
    user: initUser,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initAuthSliceState,
    reducers: {
        loginUser: (state, action: PayloadAction<IUserWithTokens>) => {
            state.isAuthenticated = true;
            state.user = action.payload;

            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.isAuthenticated = false;
            state.user = null;

            localStorage.removeItem('user');
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;

