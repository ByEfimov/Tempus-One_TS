import NotifySlice from '@/app/slices/Notifications/NotifySlice';
import PostsSlice from '@/app/slices/PostsSlice';
import userReducer from '@/app/slices/UserSlice';
import HeaderSlice from '@/app/slices/header/header-slice';
import WritePostSlice from '@/app/slices/wite-post/write-post-slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  Posts: PostsSlice,
  WritePost: WritePostSlice,
  Header: HeaderSlice,
  Notify: NotifySlice,
});
