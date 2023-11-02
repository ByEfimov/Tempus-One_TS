import { FC, useState } from 'react';
import { ModsOfInput } from '../../../Utils/ModsOfComps';
import CustomInput from '../../../Components/minicops/input';

interface ModsProps {
    AllDataOfPost: Array<{
        id: number;
        type: string;
        text: string;
        title?: string;
    }>;
    SelectMode: { type: string; id: number };
}

const ImageMode: FC<ModsProps> = ({ AllDataOfPost, SelectMode }) => {
    const [TitleOfImage, setTitleOfImage] = useState('');

    console.log(AllDataOfPost, SelectMode);
    return (
        <>
            <CustomInput
                value={TitleOfImage}
                placeholder="Название для картинки"
                changeFunction={(e) => setTitleOfImage(e.target.value)}
                mode={ModsOfInput.small}
            ></CustomInput>
        </>
    );
};

export default ImageMode;
