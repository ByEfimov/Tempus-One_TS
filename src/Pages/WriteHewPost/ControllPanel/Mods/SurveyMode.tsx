import { FC } from 'react';

interface SurveyMode {
    openMode: () => void;
    className: string;
    id: number;
    Text: string;
}

const SurveyMode: FC<SurveyMode> = ({ openMode, id, Text, className }) => {
    return (
        <div onClick={openMode} className={className} key={id}>
            {Text}
        </div>
    );
};
export default SurveyMode;
