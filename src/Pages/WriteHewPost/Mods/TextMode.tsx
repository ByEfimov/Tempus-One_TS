import CustomTextarea from 'Components/MiniComponents/textarea';
import { useWritePost } from 'Hooks/useWritePost';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { changeTextOfBlock } from 'Store/slices/WritePost/WritePostSlice';

const TextMode = () => {
    const { selectMode } = useWritePost();
    const dispatch = useAppDispatch();

    function changeMainText(e: React.ChangeEvent<HTMLTextAreaElement>) {
        dispatch(
            changeTextOfBlock({ id: selectMode.id, text: e.target.value })
        );
    }

    return (
        <CustomTextarea
            placeholder="Основной текст блока"
            changeFunction={changeMainText}
        ></CustomTextarea>
    );
};

export default TextMode;
