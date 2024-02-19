import { headerIcons } from '@/Assets/Tempus-Ui';
import {
    HeaderType,
    TypesOfHeader,
} from '@/Types/TypesOfData/header/header-type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

const initialState: HeaderType = {
    Title: '',
    SearchBar: '',
    Type: TypesOfHeader.WithSearchBar,
    HeaderClickBack: undefined,
    ButtonExecute: undefined,
    ShowNavBar: true,
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
            action: PayloadAction<{
                Title: string;
                Type: TypesOfHeader.WithoutSearchBar;
                ButtonExecute:
                    | {
                          icon: headerIcons;
                          function?: (() => void) | undefined;
                          component?: ReactNode;
                      }
                    | undefined;
                ShowNavBar: boolean;
                HeaderClickBack?: () => void;
            }>,
        ) {
            state.Title = action.payload.Title;
            state.Type = action.payload.Type;
            state.ShowNavBar = action.payload.ShowNavBar;
            state.ButtonExecute = action.payload.ButtonExecute;
            state.HeaderClickBack = action.payload.HeaderClickBack;
        },
        setHeaderClickBack(state, action) {
            state.HeaderClickBack = action.payload.HeaderHandleClickBack;
        },
        setTitleOfHeader(state, action) {
            state.Title = action.payload.Title;
        },
        setTypeOfHeader(state, action) {
            state.Type = action.payload.Type;
            state.ShowNavBar = action.payload.ShowNavBar;
            state.ButtonExecute = action.payload.ButtonExecute;
            state.PlaceholderForInput = action.payload.placeholderForInput;
        },
        setExecuteButton(state, action) {
            state.ButtonExecute = action.payload.button;
        },
    },
});
export const {
    setTypeOfHeader,
    setInputSearchBar,
    setHeaderClickBack,
    setHeader,
    setTitleOfHeader,
    setExecuteButton,
} = HeaderSlice.actions;

export default HeaderSlice.reducer;
