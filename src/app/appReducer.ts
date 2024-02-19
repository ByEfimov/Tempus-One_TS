import NotifySlice from '@/Store/slices/Notifications/NotifySlice';
import PostsSlice from '@/Store/slices/PostsSlice';
import userReducer from '@/Store/slices/UserSlice';
import HeaderSlice from '@/Store/slices/header/header-slice';
import WritePostSlice from '@/Store/slices/wite-post/write-post-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    user: userReducer,
    Posts: PostsSlice,
    WritePost: WritePostSlice,
    Header: HeaderSlice,
    Notify: NotifySlice,
});
