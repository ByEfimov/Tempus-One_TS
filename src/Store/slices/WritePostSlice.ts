import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModsOfWritePost } from '../../Utils/ModsOfComps';

export type BlockOfPostType = {
    text: string;
    id: number;
    type: string;
    title?: string;
};
export type SelectModeType = {
    type: string;
    id: number;
};
type WritePostType = {
    TitleOfPost: string;
    BlocksOfPost: BlockOfPostType[];
    selectMode: SelectModeType;
};

const initialState: WritePostType = {
    TitleOfPost: '',
    BlocksOfPost: [{ text: '', id: 0, type: 'text', title: '' }],
    selectMode: {
        type: ModsOfWritePost.text,
        id: 0,
    },
};

const WritePostSlice = createSlice({
    name: 'WritePost',
    initialState,
    reducers: {
        setTitleOfPost(state, action: PayloadAction<{ title: string }>) {
            state.TitleOfPost = action.payload.title;
        },
        addBlockToPost(state, action: PayloadAction<{ type: string }>) {
            const NewBlock: BlockOfPostType =
                action.payload.type == ModsOfWritePost.kod
                    ? {
                          text: '<div>Пиши свой код здесь.</div>',
                          id: state.BlocksOfPost.length,
                          type: ModsOfWritePost.kod,
                          title: '',
                      }
                    : action.payload.type == ModsOfWritePost.image
                    ? {
                          text: '',
                          id: state.BlocksOfPost.length,
                          type: ModsOfWritePost.image,
                          title: '',
                      }
                    : { text: '', id: 0, type: 'text', title: '' };
            state.BlocksOfPost.push(NewBlock);
        },
        changeTitleOfBlock(
            state,
            action: PayloadAction<{ id: number; title: string }>
        ) {
            state.BlocksOfPost.forEach((item, i) => {
                if (item.id === action.payload.id) {
                    state.BlocksOfPost[i] = {
                        type: state.BlocksOfPost[i].type,
                        id: state.BlocksOfPost[i].id,
                        text: state.BlocksOfPost[i].text,
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
                        type: state.BlocksOfPost[i].type,
                        id: state.BlocksOfPost[i].id,
                        title:
                            state.BlocksOfPost[i].title &&
                            state.BlocksOfPost[i].title,
                        text: action.payload.text,
                    };
                }
            });
        },
        removeBlockOfPost(state, action: PayloadAction<{ id: number }>) {
            const removeBlockIndex = state.BlocksOfPost.findIndex(
                (n) => n.id === action.payload.id
            );
            state.BlocksOfPost.splice(removeBlockIndex, 1);
            state.selectMode = { type: ModsOfWritePost.text, id: 0 };
        },
        clearBlockOfPost(
            state,
            action: PayloadAction<{ id: number; type: string }>
        ) {
            const purifiedText =
                action.payload.type === ModsOfWritePost.kod
                    ? '<div>Пиши свой код здесь.</div>'
                    : action.payload.type === ModsOfWritePost.image
                    ? ''
                    : '';

            state.BlocksOfPost.forEach((item, i) => {
                if (item.id === action.payload.id) {
                    state.BlocksOfPost[i] = {
                        title: state.BlocksOfPost[i].title && '',
                        type: state.BlocksOfPost[i].type,
                        id: state.BlocksOfPost[i].id,
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
            (state.TitleOfPost = ''),
                (state.BlocksOfPost = [
                    { text: '', id: 0, type: 'text', title: '' },
                ]),
                (state.selectMode = {
                    type: ModsOfWritePost.text,
                    id: 0,
                });
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
} = WritePostSlice.actions;

export default WritePostSlice.reducer;
