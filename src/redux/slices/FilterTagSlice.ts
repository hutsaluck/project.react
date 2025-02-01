import {createSlice} from "@reduxjs/toolkit";

type FilterTagSliceType = {
    filterTag: string,
}
const initFilterTagSliceState: FilterTagSliceType = {filterTag: ''};

export const filterTagSlice = createSlice({
    name: 'filterTagSlice',
    initialState: initFilterTagSliceState,
    reducers: {
        setFilterTag: (state, action) => {
            if(state.filterTag === action.payload){
                state.filterTag = '';
            } else {
                state.filterTag = action.payload;
            }
        },
    },
});

export const { setFilterTag } = filterTagSlice.actions;
