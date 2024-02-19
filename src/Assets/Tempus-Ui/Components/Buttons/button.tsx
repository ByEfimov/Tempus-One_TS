import Styles from './button.module.scss';
import { formItemType } from '@/Assets/Tempus-Ui';
import classNames from 'classnames';
import { motion } from 'framer-motion';

export enum ButtonTypes {
    active = 'active',
    default = 'default',
    error = 'error',
    icon = 'icon',
}

interface Button {
    Title?: string;
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
            : Type === ButtonTypes.icon
            ? Styles.ButtonIcon
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
            {Type !== ButtonTypes.icon && Title}
        </motion.button>
    );
};
export default Button;
