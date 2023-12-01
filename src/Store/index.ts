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
import userReduser from './slices/UserSlice';
import WritePostSlice from './slices/WritePostSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReduser = combineReducers({
    user: userReduser,
    WritePost: WritePostSlice,
});
const persistedReduser = persistReducer(persistConfig, rootReduser);

const store = configureStore({
    reducer: persistedReduser,
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
