import HeaderSlice from '@/app/slices/header/headerSlice';
import PostsSlice from '@/app/slices/postsSlice';
import userReducer from '@/app/slices/userSlice';
import WritePostSlice from '@/app/slices/witePost/writePostSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  user: userReducer,
  Posts: PostsSlice,
  WritePost: WritePostSlice,
  Header: HeaderSlice,
});
