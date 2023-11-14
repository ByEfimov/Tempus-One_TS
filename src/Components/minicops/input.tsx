import { ChangeEvent, FC } from 'react';
import Styles from './minicomps.module.scss';

interface CustomInput {
    changeFunction: (e: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    placeholder: string;
    mode: string;
}
const CustomInput: FC<CustomInput> = ({
    value,
    placeholder,
    changeFunction,
    mode,
}) => {
    return (
        <input
            className={
                mode === 'default'
                    ? Styles.CustomInput
                    : (mode === 'small' && Styles.CustomInputSmall) || undefined
            }
            value={value}
            placeholder={placeholder}
            onChange={(e) => changeFunction(e)}
        ></input>
    );
};

export default CustomInput;
