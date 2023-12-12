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
    },
});
export const { setInputSearchBar, setTypeOfButtonHeader, setHeader } =
    HeaderSlice.actions;

export default HeaderSlice.reducer;
