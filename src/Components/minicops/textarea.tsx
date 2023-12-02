import { ChangeEvent, FC } from 'react';
import Styles from './minicomps.module.scss';
import { useWritePost } from '../../Hooks/useWritePost';

interface CustomTextarea {
    placeholder: string;
    changeFunction: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const CustomTextarea: FC<CustomTextarea> = ({
    placeholder,
    changeFunction,
}) => {
    const { selectMode, BlocksOfPost } = useWritePost();
    const value = BlocksOfPost[selectMode.id].text;

    return (
        <textarea
            className={Styles.CustomTextarea}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
                changeFunction(e);
            }}
        ></textarea>
    );
};

export default CustomTextarea;
