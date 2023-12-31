import Styles from './MiniComponents.module.scss';
import { useWritePost } from 'Hooks/useWritePost';
import { ChangeEvent, FC } from 'react';

interface CustomTextarea {
    placeholder: string;
    changeFunction: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    mode?: string;
    stateValue?: string;
}
const CustomTextarea: FC<CustomTextarea> = ({
    placeholder,
    changeFunction,
    mode,
    stateValue,
}) => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const value = BlocksOfPost[selectMode.id].text;

    return (
        <textarea
            className={Styles.CustomTextarea}
            value={mode === 'large' ? stateValue : value}
            placeholder={placeholder}
            onChange={(e) => {
                changeFunction(e);
            }}
        ></textarea>
    );
};

export default CustomTextarea;
