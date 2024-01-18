import Styles from './Input.module.scss';
import { formItemType } from 'Assets/Tempus-Ui/Animation/Form-animate';
import { motion } from 'framer-motion';

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
    Icon?: string;
    MaxLength?: number;
    Type: InputTypes;
    Variants?: formItemType;
    IconPosition?: IconPositions;
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
                <div className={Styles.Input__Icon}>
                    <img src={Icon} alt="" />
                </div>
            )}
            <input
                maxLength={MaxLength}
                type={Type}
                onChange={(e) => Change(e)}
                defaultValue={DefaultValue}
                value={Value}
                placeholder={Placeholder}
            ></input>
            {Icon && IconPosition === IconPositions.rigth && (
                <div className={Styles.Input__Icon_r}>
                    <img src={Icon} alt="" />
                </div>
            )}
        </motion.div>
    );
};

export default Input;
