import { createSlice } from '@reduxjs/toolkit';
import { HeaderType } from 'Types/TypesOfData/Header/HeaderType';

export const TypesOfHeader = {
    WithSearchBar: 'WithSearchBar',
    WithoutSearchBar: 'WithoutSearchBar',
};
export const TypesOfHeaderButton = {
    ToTop: 'ToTop',
    ToLeft: 'ToLeft',
    NavBar: 'NavBar',
};

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
        setAnimOfHeader(state, action) {
            state.Animation = action.payload.Animation;
        },
    },
});
export const {
    setInputSearchBar,
    setTypeOfButtonHeader,
    setHeader,
    setTitleOfHeader,
    setAnimOfHeader,
} = HeaderSlice.actions;

export default HeaderSlice.reducer;
