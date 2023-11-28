import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = {
    email: string | null;
    id: string | null;
    name: string | null;
    age: number | null;
    photo: string | null;
};

const initialState: UserType = {
    email: null,
    id: null,
    name: null,
    age: null,
    photo: null,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(
            state,
            action: PayloadAction<{
                email: string | null;
                id: string | null;
                name: string | null;
                age: number;
                photo: string | null;
            }>
        ) {
            state.email = action.payload.email || null;
            state.id = action.payload.id || null;
            state.name = action.payload.name || null;
            state.age = action.payload.age;
            state.photo = action.payload.photo || null;
        },
        setCurrentUser(
            state,
            action: PayloadAction<{ email: string | null; id: string | null }>
        ) {
            state.email = action.payload.email || null;
            state.id = action.payload.id || null;
        },
        removeUser(state) {
            state.email = null;
            state.id = null;
            state.name = null;
            state.age = null;
            state.photo = null;
        },
    },
});
export const { setUser, removeUser, setCurrentUser } = UserSlice.actions;

export default UserSlice.reducer;
