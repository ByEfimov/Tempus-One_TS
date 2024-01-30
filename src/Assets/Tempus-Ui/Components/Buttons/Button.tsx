import Styles from './Button.module.scss';
import { formItemType } from 'Assets/Tempus-Ui/Animation/Form-animate';
import classNames from 'classnames';
import { motion } from 'framer-motion';

export enum ButtonTypes {
    active = 'active',
    default = 'default',
    error = 'error',
}

interface Button {
    Title: string;
    Click: () => void;
    Type: ButtonTypes;
    Variants?: formItemType;
    Class?: string;
    children?: React.ReactChild | React.ReactNode;
}

const Button = ({ Title, Click, Type, Variants, Class, children }: Button) => {
    const moreStyleOfButton =
        Type === ButtonTypes.active
            ? Styles.ButtonActive
            : Type === ButtonTypes.error
            ? Styles.ButtonError
            : undefined;

    return (
        <motion.button
            className={classNames(Styles.Button, moreStyleOfButton, Class)}
            onClick={() => {
                Click();
            }}
            type="submit"
            variants={Variants}
        >
            {children && children}
            {Title}
        </motion.button>
    );
};
export default Button;
