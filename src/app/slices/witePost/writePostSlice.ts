import getNewBlockStructure from './getBlockStructure';
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
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
export type VariantData = {
  text: string;
  selected?: Record<string, string>;
  id: number;
};

export type SurveyData = {
  question?: string;
  variants?: VariantData[];
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

function getNewId(blocks: (Draft<blockType | VariantData> | undefined)[]) {
  const maxId = Math.max(...blocks.map((block) => (block ? block.id : 0)));
  return maxId + 1;
}

function clearAllEditingMods(blocks: (Draft<blockType> | undefined)[]) {
  if (blocks) {
    for (let i = 0; i < blocks.length; i++) {
      blocks[i]!.isEditing = false;
    }
  }
}

const WritePostSlice = createSlice({
  name: 'WritePost',
  initialState,
  reducers: {
    addNewBlock(state, action: PayloadAction<{ newBlockType: blockTypes }>) {
      clearAllEditingMods(state.blocks);
      state.blocks.push(getNewBlockStructure(action.payload.newBlockType, getNewId(state.blocks)));
    },

    activeEditing(state, action: PayloadAction<{ blockId: number }>) {
      clearAllEditingMods(state.blocks);
      const blockToEdit = state.blocks.find((block) => block?.id === action.payload.blockId);
      if (blockToEdit) blockToEdit.isEditing = true;
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
      const block = state.blocks.find((block) => block?.id === action.payload.blockId);
      if (block && 'data' in block) {
        switch (action.payload.type) {
          case blockTypes.Text:
            if ('content' in block.data) block.data.content = action.payload.content;
            break;
          case blockTypes.Image:
            if ('imageUrl' in block.data) block.data.imageUrl = action.payload.imageUrl;
            break;
          case blockTypes.Code:
            if ('code' in block.data) block.data.code = action.payload.code;
            break;
          case blockTypes.Survey:
            if ('question' in block.data) block.data.question = action.payload.question;
            break;
        }
      }
    },

    changeVariantData(
      state,
      action: PayloadAction<{ blockId: number; variantId: number; variant: string; type: blockTypes }>,
    ) {
      const block = state.blocks.find((block) => block?.id === action.payload.blockId);
      if (block && 'data' in block && 'variants' in block.data && action.payload.type === blockTypes.Survey) {
        const variantToUpdate = block.data.variants!.find((variant) => variant.id === action.payload.variantId);
        if (variantToUpdate) {
          variantToUpdate.text = action.payload.variant;
        }
      }
    },

    changeAuthorPost(state, action: PayloadAction<{ authorId: string }>) {
      state.author = action.payload.authorId;
    },

    removeBlock(state, action: PayloadAction<{ blockId: number }>) {
      if (state.blocks.length > 1) {
        state.blocks = state.blocks.filter((block) => block?.id !== action.payload.blockId);
      }
    },

    removeVariant(state, action: PayloadAction<{ blockId: number; variantId: number }>) {
      const block = state.blocks.find((block) => block?.id === action.payload.blockId);
      if (block && 'variants' in block.data && block.data.variants && block.data.variants?.length > 1) {
        block.data.variants = block.data.variants.filter((variant) => variant?.id !== action.payload.variantId);
      }
    },

    addVariant(state, action: PayloadAction<{ blockId: number }>) {
      const block = state.blocks.find((block) => block?.id === action.payload.blockId);
      if (block && 'variants' in block.data) {
        block.data.variants?.push({
          text: `Вариант ответа ${block.data.variants.length + 1}`,
          id: getNewId(block.data.variants),
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
