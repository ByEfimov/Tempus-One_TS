import { FC } from 'react';
import CustomInput from '../../../Components/minicops/input';
import { ModsOfInput } from '../../../Utils/ModsOfComps';

interface TitleForPostProps {
    TitleOfPost: string;
    setTitleOfPost: (title: string) => void;
}

const TitleForPost: FC<TitleForPostProps> = ({
    TitleOfPost,
    setTitleOfPost,
}) => {
    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTitleOfPost(e.target.value);
    }

    return (
        <CustomInput
            placeholder="Название поста"
            value={TitleOfPost}
            changeFunction={changeTitle}
            mode={ModsOfInput.default}
        ></CustomInput>
    );
};

export default TitleForPost;
