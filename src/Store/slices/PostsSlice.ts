import { createSlice } from '@reduxjs/toolkit';

export type PostsType = { lastPostKey: string | null };

const initialState: PostsType = { lastPostKey: null };

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setLastPostKey(state, action) {
            state.lastPostKey = action.payload.lastPostKey;
        },
    },
});
export const { setLastPostKey } = PostsSlice.actions;

export default PostsSlice.reducer;
