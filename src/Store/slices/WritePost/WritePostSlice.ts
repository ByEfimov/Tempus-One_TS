import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import NewBlocks from './NewBlocks';
import {
    BlockOfPostType,
    SelectModeType,
} from 'Types/TypesOfData/Post/WritePost';

type WritePostType = {
    TitleOfPost: string;
    BlocksOfPost: BlockOfPostType[];
    selectMode: SelectModeType;
    PostForWhom: string | null;
};

const initialState: WritePostType = {
    TitleOfPost: '',
    BlocksOfPost: [{ text: '', id: 0, type: 'text', title: '' }],
    selectMode: {
        type: ModsOfWritePost.text,
        id: 0,
    },
    PostForWhom: null,
};

const WritePostSlice = createSlice({
    name: 'WritePost',
    initialState,
    reducers: {
        addNewVariantForSurvey(state, action) {
            state.BlocksOfPost[action.payload.BlockId].variants?.push({
                id: state.BlocksOfPost[action.payload.BlockId].variants?.length,
                text: action.payload.newVariant,
            });
        },
        removeVariantForSurvey(state, action) {
            const removeVariant =
                state.BlocksOfPost[action.payload.BlockId].variants?.findIndex(
                    (n) => n.id === action.payload.VariantId
                ) || 0;
            state.BlocksOfPost[action.payload.BlockId].variants?.splice(
                removeVariant,
                1
            );
        },
        setTitleOfPost(state, action: PayloadAction<{ title: string }>) {
            state.TitleOfPost = action.payload.title;
        },
        setPostForWhom(state, action) {
            state.PostForWhom = action.payload.PostForWhom;
        },
        addBlockToPost(state, action: PayloadAction<{ type: string }>) {
            const NewBlock: BlockOfPostType = NewBlocks(
                state.BlocksOfPost.length,
                action.payload.type
            );
            state.BlocksOfPost.push(NewBlock);
        },
        changeTitleOfBlock(
            state,
            action: PayloadAction<{ id: number; title: string }>
        ) {
            state.BlocksOfPost.forEach((item, i) => {
                if (item.id === action.payload.id) {
                    state.BlocksOfPost[i] = {
                        ...state.BlocksOfPost[i],
                        title: action.payload.title,
                    };
                }
            });
        },
        changeTextOfBlock(
            state,
            action: PayloadAction<{ id: number; text: string }>
        ) {
            state.BlocksOfPost.forEach((item, i) => {
                if (item.id === action.payload.id) {
                    state.BlocksOfPost[i] = {
                        ...state.BlocksOfPost[i],
                        text: action.payload.text,
                    };
                }
            });
        },
        removeBlockOfPost(state, action: PayloadAction<{ id: number }>) {
            if (action.payload.id !== 0) {
                const removeBlockIndex = state.BlocksOfPost.findIndex(
                    (n) => n.id === action.payload.id
                );
                state.BlocksOfPost.splice(removeBlockIndex, 1);
                state.selectMode = { type: ModsOfWritePost.text, id: 0 };
            }
        },
        clearBlockOfPost(
            state,
            action: PayloadAction<{ id: number; type: string }>
        ) {
            const purifiedText =
                action.payload.type === ModsOfWritePost.code
                    ? '<div>Пиши свой код здесь.</div>'
                    : '';

            state.BlocksOfPost.forEach((item, i) => {
                if (item.id === action.payload.id) {
                    state.BlocksOfPost[i] = {
                        ...state.BlocksOfPost[i],
                        title: '',
                        text: purifiedText,
                    };
                }
            });
        },

        setSelectMode(
            state,
            action: PayloadAction<{ type: string; id: number }>
        ) {
            state.selectMode = {
                type: action.payload.type,
                id: action.payload.id,
            };
        },
        removePost(state) {
            state.TitleOfPost = initialState.TitleOfPost;
            state.BlocksOfPost = initialState.BlocksOfPost;
            state.selectMode = initialState.selectMode;
        },
    },
});
export const {
    setTitleOfPost,
    addBlockToPost,
    setSelectMode,
    removeBlockOfPost,
    clearBlockOfPost,
    changeTextOfBlock,
    changeTitleOfBlock,
    removePost,
    setPostForWhom,
    addNewVariantForSurvey,
    removeVariantForSurvey,
} = WritePostSlice.actions;

export default WritePostSlice.reducer;
