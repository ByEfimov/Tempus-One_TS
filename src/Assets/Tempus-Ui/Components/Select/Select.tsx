import Styles from './Select.module.scss';
import {
    defaultContainer,
    defaultItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import classNames from 'classnames';
import { motion } from 'framer-motion';

const Select = ({
    Array,
    setSelect,
    selectFilter,
}: {
    Array: { name: string; value: string }[];
    setSelect: React.Dispatch<React.SetStateAction<string>>;
    selectFilter: string;
}) => {
    return (
        <motion.div
            variants={defaultContainer}
            initial="hidden"
            animate="visible"
            className={Styles.Select}
        >
            {Array.map((item) => (
                <motion.button
                    key={item.value}
                    variants={defaultItem}
                    onClick={() => setSelect(item.value)}
                    className={classNames(
                        Styles.Item,
                        selectFilter === item.value && Styles.Selected,
                    )}
                >
                    {item.name}
                </motion.button>
            ))}
        </motion.div>
    );
};
export default Select;
