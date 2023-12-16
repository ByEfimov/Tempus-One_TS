import { ChangeEvent, FC } from 'react';
import Styles from './MiniComponents.module.scss';
import { useWritePost } from 'Hooks/useWritePost';

interface CustomInput {
    changeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    mode: string;
    stateValue?: string;
}
const CustomInput: FC<CustomInput> = ({
    placeholder,
    changeFunction,
    mode,
    stateValue,
}) => {
    const { selectMode, BlocksOfPost, TitleOfPost } = useWritePost();
    const value = BlocksOfPost[selectMode.id].title;
    return (
        <input
            className={
                mode === 'default' || mode === 'large'
                    ? Styles.CustomInput
                    : (mode === 'small' && Styles.CustomInputSmall) || undefined
            }
            value={
                mode === 'default'
                    ? TitleOfPost
                    : mode === 'large'
                    ? stateValue
                    : value
            }
            placeholder={placeholder}
            onChange={(e) => changeFunction(e)}
        ></input>
    );
};

export default CustomInput;
