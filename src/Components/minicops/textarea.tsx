import { ChangeEvent, FC } from 'react';
import Styles from './minicomps.module.scss';

interface CustomTextarea {
    value: string;
    placeholder: string;
    changeFunction: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
const CustomTextarea: FC<CustomTextarea> = ({
    value,
    placeholder,
    changeFunction,
}) => {
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
