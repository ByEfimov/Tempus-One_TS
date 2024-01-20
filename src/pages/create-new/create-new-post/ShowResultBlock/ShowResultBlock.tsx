import Styles from '../Styles.module.scss';
import ShowCode from 'Components/show-posts/post-components/show-code';
import ShowImage from 'Components/show-posts/post-components/show-image';
import { BlockOfPostType } from 'Types/TypesOfData/post/write-post';
import { ModsOfWritePost } from 'Utils/mods-of-comps';
import { FC } from 'react';

interface ShowResultBlock {
    blockData: BlockOfPostType | undefined;
    ClickFunction?: () => void;
}

const ShowResultBlock: FC<ShowResultBlock> = ({ blockData, ClickFunction }) => {
    return blockData?.type === ModsOfWritePost.text ? (
        <TextMode blockData={blockData} openMod={ClickFunction}></TextMode>
    ) : blockData?.type === ModsOfWritePost.code ? (
        <CodeMode blockData={blockData} openMod={ClickFunction}></CodeMode>
    ) : blockData?.type === ModsOfWritePost.image ? (
        <ImageMode blockData={blockData} openMod={ClickFunction}></ImageMode>
    ) : (
        blockData?.type === ModsOfWritePost.survey && (
            <SurveyMode
                blockData={blockData}
                openMod={ClickFunction}
            ></SurveyMode>
        )
    );
};

interface blockData {
    blockData: BlockOfPostType;
    openMod?: () => void;
}

const clueOfBlock = 'Здесь будет результат.';

const TextMode: FC<blockData> = ({ blockData, openMod }) => {
    return (
        <div
            onClick={openMod}
            className={Styles.ShowResultBlock}
            key={blockData.id}
        >
            {blockData.text || clueOfBlock}
        </div>
    );
};

const CodeMode: FC<blockData> = ({ blockData, openMod = undefined }) => {
    return (
        <div
            onClick={openMod}
            className={Styles.ShowResultBlock}
            key={blockData.id}
        >
            <ShowCode UserCode={blockData.text || clueOfBlock} />
        </div>
    );
};

const ImageMode: FC<blockData> = ({ blockData, openMod }) => {
    return (
        <div
            onClick={openMod}
            key={blockData.id}
            className={Styles.ShowResultBlock}
        >
            <ShowImage imageSrc={blockData.text || clueOfBlock}></ShowImage>
        </div>
    );
};

const SurveyMode: FC<blockData> = ({ blockData, openMod }) => {
    return (
        <div
            onClick={openMod}
            key={blockData.id}
            className={Styles.ShowResultBlock}
        >
            <h1>{blockData.title}</h1>
            <div>
                {blockData.variants?.map((variant) => (
                    <div key={variant.id}>{variant.text || clueOfBlock}</div>
                ))}
            </div>
        </div>
    );
};

export default ShowResultBlock;
