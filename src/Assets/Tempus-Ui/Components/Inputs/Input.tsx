import Styles from './Input.module.scss';
import { formItemType } from 'Assets/Tempus-Ui/Animation/Form-animate';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export enum InputTypes {
    text = 'text',
    number = 'number',
    password = 'password',
    email = 'email',
    phone = 'phone',
}
export enum IconPositions {
    left = 'left',
    rigth = 'rigth',
}

interface Input {
    Placeholder: string;
    Change: (e: React.ChangeEvent<HTMLInputElement>) => void;
    Value: string | number;
    DefaultValue?: string;
    Icon?: string | ReactNode;
    MaxLength?: number;
    Type: InputTypes;
    Variants?: formItemType;
    IconPosition?: IconPositions;
    SearchFun?: () => void;
}

const Input = ({
    Placeholder,
    Change,
    Value,
    DefaultValue,
    Icon,
    MaxLength,
    Type,
    Variants,
    IconPosition = IconPositions.left,
}: Input) => {
    return (
        <motion.div variants={Variants} className={Styles.Input}>
            {Icon && IconPosition === IconPositions.left && (
                <div className={Styles.Input__Icon}>{Icon}</div>
            )}
            <input
                maxLength={MaxLength}
                type={Type}
                onChange={(e) => Change(e)}
                defaultValue={DefaultValue}
                value={Value}
                placeholder={Placeholder}
            ></input>
        </motion.div>
    );
};

export default Input;
