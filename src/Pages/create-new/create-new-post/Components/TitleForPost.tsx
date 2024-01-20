import CustomInput from 'Components/mini-components/input';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { setTitleOfPost } from 'Store/slices/wite-post/write-post-slice';
import { ModsOfInput } from 'Utils/mods-of-comps';

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
