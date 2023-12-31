import HeaderSlice from './slices/Header/HeaderSlice';
import NotifySlice from './slices/Notifications/NotifySlice';
import PostsSlice from './slices/PostsSlice';
import userReducer from './slices/UserSlice';
import WritePostSlice from './slices/WritePost/WritePostSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['WritePost', 'Header', 'Notify'],
};

const rootReducer = combineReducers({
    user: userReducer,
    Posts: PostsSlice,
    WritePost: WritePostSlice,
    Header: HeaderSlice,
    Notify: NotifySlice,
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
