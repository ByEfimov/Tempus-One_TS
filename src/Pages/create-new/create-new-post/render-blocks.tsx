import CodeBlock from './blocks/code-block';
import ImageBlock from './blocks/image-block';
import SurveyBlock from './blocks/survey-block';
import TextBlock from './blocks/text-block';
import { useAppDispatch } from 'Hooks/redux-hooks';
import {
    activeEditing,
    blockTypes,
    blocksType,
} from 'Store/slices/wite-post/write-post-slice';

const RenderBlocks = ({ blocksData }: { blocksData: blocksType }) => {
    const dispatch = useAppDispatch();
    function selectEditMode(blockId: number) {
        dispatch(activeEditing({ blockId }));
    }

    return blocksData.map((block) => {
        if (block?.type === blockTypes.Text) {
            return (
                <TextBlock
                    key={block.id}
                    block={block}
                    selectEditMode={selectEditMode}
                ></TextBlock>
            );
        }
        if (block?.type === blockTypes.Image) {
            return (
                <ImageBlock
                    key={block.id}
                    block={block}
                    selectEditMode={selectEditMode}
                ></ImageBlock>
            );
        }
        if (block?.type === blockTypes.Code) {
            return (
                <CodeBlock
                    key={block.id}
                    block={block}
                    selectEditMode={selectEditMode}
                ></CodeBlock>
            );
        }
        if (block?.type === blockTypes.Survey) {
            return (
                <SurveyBlock
                    key={block.id}
                    block={block}
                    selectEditMode={selectEditMode}
                ></SurveyBlock>
            );
        }
    });
};

export default RenderBlocks;
