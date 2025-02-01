import {createSlice} from "@reduxjs/toolkit";

type SearchSliceType = {
    searchQuery: string,
    searchType: string,
}
const initSearchSliceState: SearchSliceType = {searchQuery: '', searchType: ''};

export const searchSlice = createSlice({
    name: 'searchSlice',
    initialState: initSearchSliceState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        },
    },
});

export const { setSearchQuery, setSearchType } = searchSlice.actions;
