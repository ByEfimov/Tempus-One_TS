import { InputColors } from '../Inputs/Input';
import Styles from './Select.module.scss';
import './Select.scss';
import {
    defaultContainer,
    defaultItem,
    formItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import { Select as AntdSelect } from 'antd';
import classNames from 'classnames';
import { motion } from 'framer-motion';

export enum SelectTypes {
    Row = 'Row',
    Input = 'Input',
}

const Select = ({
    Array,
    setSelect,
    Select,
    Type,
    Placeholder,
    Color = InputColors.default,
}: {
    Array?: { label: string; value: string }[];
    setSelect: React.Dispatch<React.SetStateAction<string>>;
    Select?: string;
    Type: SelectTypes;
    Placeholder?: string;
    Color?: InputColors;
}) => {
    if (Type === SelectTypes.Row) {
        return (
            <motion.div
                variants={defaultContainer}
                initial="hidden"
                animate="visible"
                className={Styles.Select}
            >
                {Array?.map((item) => (
                    <motion.button
                        key={item.value}
                        variants={defaultItem}
                        onClick={() => setSelect(item.value)}
                        className={classNames(
                            Styles.Item,
                            Select === item.value && Styles.Selected,
                        )}
                    >
                        {item.label}
                    </motion.button>
                ))}
            </motion.div>
        );
    } else if (Type === SelectTypes.Input) {
        return (
            <motion.div
                variants={formItem}
                className={classNames(
                    Styles.SelectInput,
                    Color === InputColors.primary && 'Primary',
                )}
            >
                <AntdSelect
                    placeholder={Placeholder}
                    className={Styles.SelectInput}
                    onChange={(value: string) => setSelect(value)}
                    options={Array}
                />
            </motion.div>
        );
    }
};
export default Select;
