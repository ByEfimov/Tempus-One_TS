import { FC } from 'react';

interface TextMode {
    openMode: () => void;
    className: string;
    id: number;
    Text: string;
}

const TextMode: FC<TextMode> = ({ openMode, id, Text, className }) => {
    return (
        <div onClick={openMode} className={className} key={id}>
            {Text}
        </div>
    );
};
export default TextMode;
