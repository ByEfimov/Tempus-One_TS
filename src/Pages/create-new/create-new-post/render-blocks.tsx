import {
    CodeData,
    ImageData,
    SurveyData,
    TextData,
    blockTypes,
    blocksType,
} from 'Store/slices/wite-post/write-post-slice';

const RenderBlocks = ({ blocksData }: { blocksData: blocksType }) => {
    return blocksData.map((block) => {
        if (block?.type === blockTypes.Text) {
            return <TextBlock blockData={block.data}></TextBlock>;
        }
        if (block?.type === blockTypes.Image) {
            return <ImageBlock blockData={block.data}>image</ImageBlock>;
        }
        if (block?.type === blockTypes.Code) {
            return <CodeBlock blockData={block.data}>code</CodeBlock>;
        }

        if (block?.type === blockTypes.Survey) {
            return <SurveyBlock blockData={block.data}>survey</SurveyBlock>;
        }
    });
};

const TextBlock = ({ blockData }: { blockData: TextData }) => {
    return <h1>{blockData.content}</h1>;
};
const ImageBlock = ({ blockData }: { blockData: ImageData }) => {
    return <h1>{blockData.imageUrl}</h1>;
};
const CodeBlock = ({ blockData }: { blockData: CodeData }) => {
    return <h1>{blockData.code}</h1>;
};
const SurveyBlock = ({ blockData }: { blockData: SurveyData }) => {
    return <h1>{blockData.question}</h1>;
};

export default RenderBlocks;
