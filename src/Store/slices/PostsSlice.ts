import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PostData = {
    text: string;
    id: number;
    type: string;
    title?: string;
};

export type Post = {
    PostId: number;
    PostAuthorId: number;
    PostTitle: string;
    PostDataBlocks: PostData[];
};

export type AllPostsData = Post[];

const initialState: AllPostsData = [];

const PostsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost(
            state,
            action: PayloadAction<{
                NewPost: Post;
            }>
        ) {
            state.push(action.payload.NewPost);
        },
        removePost(
            state,
            action: PayloadAction<{
                idDellPost: number;
            }>
        ) {
            state.filter((post) => post.PostId !== action.payload.idDellPost);
        },
    },
});
export const { addPost, removePost } = PostsSlice.actions;

export default PostsSlice.reducer;
