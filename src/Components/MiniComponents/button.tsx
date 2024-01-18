import Styles from './styles.module.scss';
import classNames from 'classnames';
import { FC } from 'react';

interface ButtonVoid {
    clickHandler: () => void;
    title: string;
    classes?: string;
    padding?: boolean;
}
const ButtonVoid: FC<ButtonVoid> = ({
    clickHandler,
    title,
    classes,
    padding = true,
}) => {
    return (
        <div
            className={Styles.ButtonWrapper}
            style={
                (padding && { padding: 17 }) || {
                    padding: 0,
                    paddingTop: 17,
                }
            }
        >
            <button
                className={classNames(Styles.Button, classes)}
                type="submit"
                onClick={() => clickHandler()}
            >
                {title}
            </button>
        </div>
    );
};

export default ButtonVoid;
