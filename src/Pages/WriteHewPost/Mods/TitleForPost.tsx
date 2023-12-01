import CustomInput from '../../../Components/minicops/input';
import { useAppDispatch } from '../../../Hooks/redus-hooks';
import { useWritePost } from '../../../Hooks/useWritePost';
import { setTitleOfPost } from '../../../Store/slices/WritePostSlice';
import { ModsOfInput } from '../../../Utils/ModsOfComps';

const TitleForPost = () => {
    const { TitleOfPost } = useWritePost();
    const dispatch = useAppDispatch();
    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setTitleOfPost({ title: e.target.value }));
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
