import CodeBlock from './post/blocks/code-block';
import ImageBlock from './post/blocks/image-block';
import SurveyBlock from './post/blocks/survey-block';
import TextBlock from './post/blocks/text-block';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { activeEditing, blockTypes, blocksType } from '@/app/slices/witePost/writePostSlice';

const RenderBlocks = ({ blocksData }: { blocksData: blocksType }) => {
  const dispatch = useAppDispatch();
  function selectEditMode(blockId: number) {
    dispatch(activeEditing({ blockId }));
  }

  const componentMap = {
    [blockTypes.Text]: TextBlock,
    [blockTypes.Image]: ImageBlock,
    [blockTypes.Code]: CodeBlock,
    [blockTypes.Survey]: SurveyBlock,
  };

  return blocksData.map((block) => {
    const Component = block && componentMap[block!.type];
    return Component ? <Component key={block!.id} block={block} selectEditMode={selectEditMode} /> : null;
  });
};

export default RenderBlocks;
