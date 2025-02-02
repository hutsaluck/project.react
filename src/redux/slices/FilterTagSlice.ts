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
            console.log(action.payload)
            if(state.filterTags.includes(action.payload)){
                console.log('deleted')
                state.filterTags = state.filterTags.filter(item => item !== action.payload);
            } else {
                state.filterTags.push(action.payload);
            }
        },
    },
});

export const { setFilterTag } = filterTagSlice.actions;
