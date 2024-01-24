import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
    HeaderType,
    TypesOfHeader,
} from 'Types/TypesOfData/header/header-type';

const initialState: HeaderType = {
    Title: '',
    SearchBar: '',
    Type: TypesOfHeader.WithSearchBar,
    HeaderClickBack: undefined,
    ButtonExecute: undefined,
    ShowFooter: true,
    PlaceholderForInput: 'Найти пост...',
};

const HeaderSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setInputSearchBar(state, action) {
            state.SearchBar = action.payload.SearchBar;
        },
        setHeader(
            state,
            action: PayloadAction<
                Omit<Omit<HeaderType, 'SearchBar'>, 'PlaceholderForInput'>
            >,
        ) {
            state.Title = action.payload.Title;
            state.Type = action.payload.Type;
            state.HeaderClickBack = action.payload.HeaderClickBack;
            state.ShowFooter = action.payload.ShowFooter;
            state.ButtonExecute = action.payload.ButtonExecute;
        },
        setHeaderClickBack(state, action) {
            state.HeaderClickBack = action.payload.HeaderHandleClickBack;
        },
        setTitleOfHeader(state, action) {
            state.Title = action.payload.Title;
        },
        setTypeOfHeader(state, action) {
            state.Type = action.payload.Type;
            state.ShowFooter = action.payload.ShowFooter;
            state.ButtonExecute = action.payload.ButtonExecute;
            state.PlaceholderForInput = action.payload.placeholderForInput;
        },
        setExecuteFunction(state, action) {
            if (state.ButtonExecute)
                state.ButtonExecute.function = action.payload.function;
        },
    },
});
export const {
    setTypeOfHeader,
    setInputSearchBar,
    setHeaderClickBack,
    setHeader,
    setTitleOfHeader,
    setExecuteFunction,
} = HeaderSlice.actions;

export default HeaderSlice.reducer;
