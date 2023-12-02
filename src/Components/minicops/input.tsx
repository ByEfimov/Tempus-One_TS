import { ChangeEvent, FC } from 'react';
import Styles from './minicomps.module.scss';
import { useWritePost } from '../../Hooks/useWritePost';

interface CustomInput {
    changeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    mode: string;
}
const CustomInput: FC<CustomInput> = ({
    placeholder,
    changeFunction,
    mode,
}) => {
    const { selectMode, BlocksOfPost, TitleOfPost } = useWritePost();
    const value = BlocksOfPost[selectMode.id].title;
    return (
        <input
            className={
                mode === 'default'
                    ? Styles.CustomInput
                    : (mode === 'small' && Styles.CustomInputSmall) || undefined
            }
            value={mode === 'default' ? TitleOfPost : value}
            placeholder={placeholder}
            onChange={(e) => changeFunction(e)}
        ></input>
    );
};

export default CustomInput;
