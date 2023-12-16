import { FC } from 'react';
import Styles from './MiniComponents.module.scss';

interface ButtonVoid {
    clickHandler: () => void;
    title: string;
    classes?: string;
}
const ButtonVoid: FC<ButtonVoid> = ({
    clickHandler,
    title,
    classes = Styles.Button,
}) => {
    return (
        <div className={Styles.ButtonWrapper}>
            <button
                className={classes}
                type="submit"
                onClick={() => clickHandler()}
            >
                {title}
            </button>
        </div>
    );
};

export default ButtonVoid;
