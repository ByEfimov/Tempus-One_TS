import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = {
    email: string | null;
    id: number | null;
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
                email: string;
                id: number;
                name: string;
                age: number;
                photo: string;
            }>
        ) {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.age = action.payload.age;
            state.photo = action.payload.photo;
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
export const { setUser, removeUser } = UserSlice.actions;

export default UserSlice.reducer;
