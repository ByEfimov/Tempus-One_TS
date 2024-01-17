/* eslint-disable import/order */
import { createSlice } from '@reduxjs/toolkit';
import { HeaderType, TypesOfHeader } from 'Types/TypesOfData/Header/HeaderType';

const initialState: HeaderType = {
    Title: '',
    SearchBar: '',
    Type: TypesOfHeader.WithSearchBar,
    HeaderClickBack: undefined,
    HeaderClickExecute: undefined,
};

const HeaderSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setInputSearchBar(state, action) {
            state.SearchBar = action.payload.SearchBar;
        },
        setHeader(state, action) {
            state.Title = action.payload.Title;
            state.Type = action.payload.Type;
            state.HeaderClickBack = action.payload.HeaderClickBack;
            state.HeaderClickExecute = action.payload.HeaderClickExecute;
        },
        setHeaderClickBack(state, action) {
            state.HeaderClickBack = action.payload.HeaderHandleClickBack;
        },
        setHeaderClickExecute(state, action) {
            state.HeaderClickExecute = action.payload.HeaderHandleClickBack;
        },
        setTitleOfHeader(state, action) {
            state.Title = action.payload.Title;
        },
        setTypeOfHeader(state, action) {
            state.Type = action.payload.Type;
        },
    },
});
export const {
    setTypeOfHeader,
    setInputSearchBar,
    setHeaderClickBack,
    setHeaderClickExecute,
    setHeader,
    setTitleOfHeader,
} = HeaderSlice.actions;

export default HeaderSlice.reducer;
