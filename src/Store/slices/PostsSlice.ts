import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PostData = {
    text: string;
    id: string;
    type: string;
    title?: string;
};

export type Post = {
    Postid: string;
    PostAuthorid: string;
    PostTitle: string;
    PostDataBlocks: PostData[];
    PostDate: number;
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
