import { createSlice } from '@reduxjs/toolkit';

export const TypesOfHeader = {
    WithSearchBar: 'WithSearchBar',
    WithoutSearchBar: 'WithoutSearchBar',
};
export const TypesOfHeaderButton = {
    ToTop: 'ToTop',
    ToLeft: 'ToLeft',
    NavBar: 'NavBar',
};

export type HeaderType = {
    Title: string;
    SearchBar: string;
    Type: string;
    TypeOfButton: string;
};

const initialState: HeaderType = {
    Title: 'TEMPUS',
    SearchBar: '',
    Type: TypesOfHeader.WithSearchBar,
    TypeOfButton: TypesOfHeaderButton.NavBar,
};

const HeaderSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setTypeOfHeader(state, action) {
            state.Type = action.payload.TypeOfHeader;
        },
        setTitleToHeader(state, action) {
            state.Title = action.payload.Title;
        },
        setInputSearchBar(state, action) {
            state.SearchBar = action.payload.SearchBar;
        },
        setTypeOfButtonHeader(state, action) {
            state.TypeOfButton = action.payload.TypeOfButton;
        },
    },
});
export const {
    setTypeOfHeader,
    setTitleToHeader,
    setInputSearchBar,
    setTypeOfButtonHeader,
} = HeaderSlice.actions;

export default HeaderSlice.reducer;
