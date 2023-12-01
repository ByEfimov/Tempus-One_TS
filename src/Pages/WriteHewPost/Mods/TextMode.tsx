import CustomTextarea from '../../../Components/minicops/textarea';
import { useWritePost } from '../../../Hooks/useWritePost';
import { useAppDispatch } from '../../../Hooks/redus-hooks';
import { changeTextOfBlock } from '../../../Store/slices/WritePostSlice';

const TextMode = () => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const dispatch = useAppDispatch();

    function changeMainText(e: React.ChangeEvent<HTMLTextAreaElement>) {
        dispatch(
            changeTextOfBlock({ id: selectMode.id, text: e.target.value })
        );
    }

    return (
        <CustomTextarea
            value={BlocksOfPost[selectMode.id].text}
            placeholder="Основной текст блока"
            changeFunction={changeMainText}
        ></CustomTextarea>
    );
};

export default TextMode;
