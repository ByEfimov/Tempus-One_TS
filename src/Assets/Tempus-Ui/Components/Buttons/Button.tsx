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
    Icon?: string;
    Variants?: formItemType;
}

const Button = ({ Title, Click, Type, Icon, Variants }: Button) => {
    const moreStyleOfButton =
        Type === ButtonTypes.active
            ? Styles.ButtonActive
            : Type === ButtonTypes.error
            ? Styles.ButtonError
            : undefined;

    return (
        <motion.button
            className={classNames(Styles.Button, moreStyleOfButton)}
            onClick={() => {
                Click();
            }}
            type="submit"
            variants={Variants}
        >
            {Icon && <img src={Icon} alt="" />}
            {Title}
        </motion.button>
    );
};
export default Button;
