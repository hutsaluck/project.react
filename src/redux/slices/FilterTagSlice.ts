import {createSlice} from "@reduxjs/toolkit";

type FilterTagSliceType = {
    filterTags: string[],
}
const initFilterTagSliceState: FilterTagSliceType = {filterTags: []};

export const filterTagSlice = createSlice({
    name: 'filterTagSlice',
    initialState: initFilterTagSliceState,
    reducers: {
        setFilterTag: (state, action) => {
            if(state.filterTags.includes(action.payload)){
                state.filterTags = state.filterTags.filter(item => item !== action.payload);
            } else {
                state.filterTags.push(action.payload);
            }
        },
        removeFilterTag: (state) => {
            state.filterTags.length = 0
        },
    },
});

export const { setFilterTag, removeFilterTag } = filterTagSlice.actions;
