import getNewBlockStructure from './get-block-structure';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getUnixTime } from 'date-fns';

export enum blockTypes {
    Text = 'Text',
    Code = 'Code',
    Image = 'Image',
    Survey = 'Survey',
}

export type TextData = {
    content?: string;
};
export type CodeData = {
    code?: string;
};
export type SurveyData = {
    question?: string;
    variants?: Array<{
        text: string;
        selected?: Record<string, string>;
        id: number;
    }>;
};
export type ImageData = {
    imageUrl?: string;
};

type BlockTypeData<T extends blockTypes> = T extends blockTypes.Code
    ? CodeData
    : T extends blockTypes.Survey
    ? SurveyData
    : T extends blockTypes.Text
    ? TextData
    : T extends blockTypes.Image
    ? ImageData
    : never;

export type blockType = {
    type: blockTypes;
    data: BlockTypeData<blockTypes>;
    isEditing: boolean;
    id: number;
};

export type blocksType = Array<blockType | undefined>;

type PostType = {
    author?: string;
    date: number;
    blocks: blocksType;
    comments?: Array<{ date: number; text: string; commentator: string }>;
    likes?: Record<string, string>;
    reposts?: number;
    views?: Record<string, string>;
};

const currentDate = new Date();
const currentUnixTime = getUnixTime(currentDate);

const initialState: PostType = {
    date: currentUnixTime,
    blocks: [getNewBlockStructure(blockTypes.Text, 0)],
};

const WritePostSlice = createSlice({
    name: 'WritePost',
    initialState,
    reducers: {
        addNewBlock(
            state,
            action: PayloadAction<{ newBlockType: blockTypes }>,
        ) {
            for (let i = 0; i < state.blocks.length; i++) {
                state.blocks[i]!.isEditing = false;
            }

            const newBlockStructure = getNewBlockStructure(
                action.payload.newBlockType,
                state.blocks.length,
            );
            state.blocks.push(newBlockStructure);
        },
        activeEditing(state, action: PayloadAction<{ blockId: number }>) {
            for (let i = 0; i < state.blocks.length; i++) {
                state.blocks[i]!.isEditing = false;
            }

            state.blocks[action.payload.blockId]!.isEditing = true;
        },
        changeDataBlock(
            state,
            action: PayloadAction<{ blockId: number; content?: string }>,
        ) {
            const block = state.blocks[action.payload.blockId];
            if (block && 'data' in block && 'content' in block.data) {
                block.data.content = action.payload.content;
            }
        },

        changeAuthorPost(state, action: PayloadAction<{ authorId: string }>) {
            state.author = action.payload.authorId;
        },
    },
});
export const { addNewBlock, activeEditing, changeDataBlock, changeAuthorPost } =
    WritePostSlice.actions;

export default WritePostSlice.reducer;
