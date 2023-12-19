import { createSlice } from '@reduxjs/toolkit';
import {
    HeaderType,
    TypesOfHeader,
    TypesOfHeaderButton,
} from 'Types/TypesOfData/Header/HeaderType';

const initialState: HeaderType = {
    Title: 'TEMPUS',
    Animation: 'Open',
    SearchBar: '',
    Type: TypesOfHeader.WithSearchBar,
    TypeOfButton: TypesOfHeaderButton.NavBar,
};

const HeaderSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setInputSearchBar(state, action) {
            state.SearchBar = action.payload.SearchBar;
        },
        setTypeOfButtonHeader(state, action) {
            state.TypeOfButton = action.payload.TypeOfButton;
        },
        setHeader(state, action) {
            state.Title = action.payload.Title;
            state.Type = action.payload.Type;
        },
        setTitleOfHeader(state, action) {
            state.Title = action.payload.Title;
        },
        setTypeOfHeader(state, action) {
            state.Type = action.payload.Type;
        },
        setAnimOfHeader(state, action) {
            state.Animation = action.payload.Animation;
        },
    },
});
export const {
    setTypeOfHeader,
    setInputSearchBar,
    setTypeOfButtonHeader,
    setHeader,
    setTitleOfHeader,
    setAnimOfHeader,
} = HeaderSlice.actions;

export default HeaderSlice.reducer;
