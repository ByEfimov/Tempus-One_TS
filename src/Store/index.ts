import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './slices/UserSlice';
import WritePostSlice from './slices/WritePost/WritePostSlice';
import PostsSlice from './slices/PostsSlice';
import HeaderSlice from './slices/Header/HeaderSlice';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['WritePost', 'Header'],
};

const rootReducer = combineReducers({
    user: userReducer,
    WritePost: WritePostSlice,
    Posts: PostsSlice,
    Header: HeaderSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
export const persister = persistStore(store);
