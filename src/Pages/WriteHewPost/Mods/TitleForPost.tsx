import CustomInput from 'Components/MiniComponents/input';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { setTitleOfPost } from 'Store/slices/WritePost/WritePostSlice';
import { ModsOfInput } from 'Utils/ModsOfComps';

const TitleForPost = () => {
    const dispatch = useAppDispatch();
    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setTitleOfPost({ title: e.target.value }));
    }

    return (
        <CustomInput
            placeholder="Название поста"
            changeFunction={changeTitle}
            mode={ModsOfInput.default}
        ></CustomInput>
    );
};

export default TitleForPost;
