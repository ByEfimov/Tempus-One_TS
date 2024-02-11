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
    content: string;
};
export type CodeData = {
    code: string;
};
export type SurveyData = {
    question: string;
    variants: Array<{
        text: string;
        selected?: Record<string, string>;
        id: number;
    }>;
};
export type ImageData = {
    imageUrl: string;
};

export type blocksType = Array<
    | {
          type: blockTypes;
          data: blockTypes.Text extends typeof blockTypes
              ? TextData
              : blockTypes.Code extends typeof blockTypes
              ? CodeData
              : blockTypes.Image extends typeof blockTypes
              ? ImageData
              : blockTypes.Survey extends typeof blockTypes
              ? SurveyData
              : unknown;
          isEditing: boolean;
          id: number;
      }
    | undefined
>;

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
            const newBlockStructure = getNewBlockStructure(
                action.payload.newBlockType,
                state.blocks.length,
            );

            state.blocks.push(newBlockStructure);
        },
    },
});
export const { addNewBlock } = WritePostSlice.actions;

export default WritePostSlice.reducer;
