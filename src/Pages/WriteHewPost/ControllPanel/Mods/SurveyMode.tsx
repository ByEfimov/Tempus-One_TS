import { BlockOfPostType } from 'Types/TypesOfData/Post/WritePost';
import { FC } from 'react';

interface SurveyMode {
    openMode: () => void;
    className: string;
    blockData: BlockOfPostType;
}

const SurveyMode: FC<SurveyMode> = ({ openMode, className, blockData }) => {
    return (
        <div onClick={openMode} className={className} key={blockData.id}>
            <h1>{blockData.title}</h1>
            <div>
                {blockData.variants?.map((variant) => (
                    <div key={variant.id}>{variant.text}</div>
                ))}
            </div>
        </div>
    );
};
export default SurveyMode;
