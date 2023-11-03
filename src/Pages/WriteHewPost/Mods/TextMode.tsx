import { FC } from 'react';
import CustomTextarea from '../../../Components/minicops/textarea';
import { UpdateData } from '../../../Utils/UpdatePostData';
import { PostData } from '../WritePost';

interface TextOfPostProps {
    AllDataOfPost: Array<{
        id: number;
        type: string;
        text: string;
        title?: string;
    }>;
    SelectMode: { type: string; id: number };
    setAllDataForPost: React.Dispatch<React.SetStateAction<PostData>>;
}

const TextMode: FC<TextOfPostProps> = ({
    AllDataOfPost,
    SelectMode,
    setAllDataForPost,
}) => {
    function changeMainText(e: React.ChangeEvent<HTMLTextAreaElement>) {
        UpdateData(setAllDataForPost, SelectMode, AllDataOfPost, 'text', e);
    }

    return (
        <CustomTextarea
            value={AllDataOfPost[SelectMode.id].text}
            placeholder="Основной текст блока"
            changeFunction={changeMainText}
        ></CustomTextarea>
    );
};

export default TextMode;
