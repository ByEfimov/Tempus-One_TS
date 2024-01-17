import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { encryptData } from 'Utils/CryptData/CriptingData';

type UserType = {
    email: string | null;
    id: string | null;
    name: string | null;
    age: number | null;
    photo: string | null;
    emailVerified: boolean | null;
    subscriptions?: {
        teams?: { [key: string]: string };
        users?: { [key: string]: string };
    } | null;
    members: string[] | null;
    postsLiked: Record<string, string> | null;
    viewings: string[] | null;
    experience: number | null;
    level: number | null;
    selectedVariants: Record<string, string> | null;
};

const initialState: UserType = {
    email: null,
    id: null,
    name: null,
    age: null,
    photo: null,
    emailVerified: null,
    subscriptions: null,
    members: null,
    postsLiked: null,
    viewings: null,
    experience: null,
    level: null,
    selectedVariants: null,
};

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserType>) {
            state.email = action.payload.email || null;
            state.id = encryptData(action.payload.id || null);
            state.name = action.payload.name || null;
            state.age = action.payload.age;
            state.photo = action.payload.photo || null;
            state.emailVerified = action.payload.emailVerified || null;
            state.subscriptions = action.payload.subscriptions || null;
            state.members = action.payload.members || null;
            state.postsLiked = action.payload.postsLiked || null;
            state.viewings = action.payload.viewings || null;
            state.experience = action.payload.experience || null;
            state.level = action.payload.level || null;
            state.selectedVariants = action.payload.selectedVariants || null;
        },
        setCurrentUser(
            state,
            action: PayloadAction<{ email: string | null; id: string | null }>,
        ) {
            state.email = action.payload.email || null;
            state.id = encryptData(action.payload.id || null);
        },
        removeUser(state) {
            state.email = null;
            state.id = null;
            state.name = null;
            state.age = null;
            state.photo = null;
            state.emailVerified = null;
            state.subscriptions = null;
            state.members = null;
            state.postsLiked = null;
            state.viewings = null;
            state.experience = null;
            state.level = null;
            state.selectedVariants = null;
        },
    },
});
export const { setUser, removeUser, setCurrentUser } = UserSlice.actions;

export default UserSlice.reducer;
