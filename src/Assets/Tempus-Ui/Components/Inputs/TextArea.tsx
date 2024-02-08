import { InputColors } from './Input';
import Styles from './Input.module.scss';
import { formItemType } from 'Assets/Tempus-Ui/Animation/Form-animate';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface TextArea {
    Placeholder: string;
    Change: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    Value: string | number;
    DefaultValue?: string;
    MaxLength?: number;
    Variants?: formItemType;
    Color?: InputColors;
}

const TextArea = ({
    Placeholder,
    Change,
    Value,
    DefaultValue,
    MaxLength,
    Variants,
    Color,
}: TextArea) => {
    return (
        <motion.div
            variants={Variants}
            className={classNames(
                Styles.Input,
                Color === InputColors.primary && Styles.primary,
            )}
        >
            <textarea
                maxLength={MaxLength}
                onChange={(e) => Change(e)}
                defaultValue={DefaultValue}
                value={Value}
                placeholder={Placeholder}
            ></textarea>
        </motion.div>
    );
};

export default TextArea;
