import { createSlice } from '@reduxjs/toolkit';

export type PostBlock = {
    id: number;
    text: string;
    type: string;
    title?: string;
};

export type Post = {
    PostAuthorId: string;
    PostDataBlocks: PostBlock[];
    PostDate: number;
    PostId: string;
    PostLikes: number;
    PostShows: number;
    PostTitle: string;
    PostReposts: number;
    PostComments: [];
};

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
