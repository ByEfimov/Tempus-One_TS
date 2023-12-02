import { createSlice } from '@reduxjs/toolkit';

type PostBlock = {
    id: number;
    text: string;
    type: string;
    title?: string;
};

type Post = {
    PostAuthorId: string;
    PostDataBlocks: PostBlock[];
    PostDate: number;
    PostId: string;
    PostLikes: number;
    PostShows: number;
    PostTitle: string;
};

export type PostsType = { posts: Post[] };

const initialState: PostsType = { posts: [] };

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload.posts;
        },
    },
});
export const { setPosts } = PostsSlice.actions;

export default PostsSlice.reducer;
