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

export type PostType = {
  author?: string;
  date: number;
  blocks: blocksType;
  comments?: Array<{ date: number; text: string; commentator: string }>;
  likes?: Record<string, string>;
  reposts?: number;
  id?: string;
  views?: Record<string, string>;
  PostWithRepostUs?: string;
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
    addNewBlock(state, action: PayloadAction<{ newBlockType: blockTypes }>) {
      for (let i = 0; i < state.blocks.length; i++) {
        state.blocks[i]!.isEditing = false;
      }

      const newBlockStructure = getNewBlockStructure(action.payload.newBlockType, state.blocks.length);
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
      action: PayloadAction<{
        blockId: number;
        content?: string;
        imageUrl?: string;
        code?: string;
        type: blockTypes;
        question?: string;
      }>,
    ) {
      const block = state.blocks[action.payload.blockId];

      if (block && 'data' in block && 'content' in block.data && action.payload.type === blockTypes.Text) {
        block.data.content = action.payload.content;
      }
      if (block && 'data' in block && 'imageUrl' in block.data && action.payload.type === blockTypes.Image) {
        block.data.imageUrl = action.payload.imageUrl;
      }
      if (block && 'data' in block && 'code' in block.data && action.payload.type === blockTypes.Code) {
        block.data.code = action.payload.code;
      }
      if (block && 'data' in block && 'question' in block.data && action.payload.type === blockTypes.Survey) {
        block.data.question = action.payload.question;
      }
    },

    changeVariantData(
      state,
      action: PayloadAction<{
        blockId: number;
        variantId: number;
        variant: string;
        type: blockTypes;
      }>,
    ) {
      const block = state.blocks[action.payload.blockId];

      if (
        block &&
        'data' in block &&
        'variants' in block.data &&
        block.data.variants &&
        action.payload.type === blockTypes.Survey
      ) {
        block.data.variants[action.payload.variantId].text = action.payload.variant;
      }
    },

    changeAuthorPost(state, action: PayloadAction<{ authorId: string }>) {
      state.author = action.payload.authorId;
    },
    removeBlock(state, action: PayloadAction<{ blockId: number }>) {
      if (state.blocks.length > 1) {
        state.blocks.splice(action.payload.blockId, 1);
      }
    },
    removeVariant(state, action: PayloadAction<{ blockId: number; variantId: number }>) {
      const block = state.blocks[action.payload.blockId];
      if (
        block &&
        'variants' in block.data &&
        'data' in block &&
        block.data.variants &&
        block.data.variants?.length > 1
      ) {
        block.data.variants.splice(action.payload.variantId, 1);
      }
    },
    addVariant(state, action: PayloadAction<{ blockId: number }>) {
      const block = state.blocks[action.payload.blockId];
      if (block && 'variants' in block.data && 'data' in block) {
        block.data.variants?.push({
          text: `Вариант ответа ${block.data.variants.length + 1}`,
          id: block.data.variants.length,
        });
      }
    },
    removePost(state) {
      state.blocks = [getNewBlockStructure(blockTypes.Text, 0)];
    },
  },
});
export const {
  addNewBlock,
  activeEditing,
  changeDataBlock,
  removeBlock,
  changeVariantData,
  changeAuthorPost,
  removeVariant,
  addVariant,
  removePost,
} = WritePostSlice.actions;

export default WritePostSlice.reducer;
