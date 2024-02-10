import Styles from './texts.module.scss';
import { motion } from 'framer-motion';

interface TextWithLine {
    children: React.ReactChild | React.ReactNode;
}

const TextWithLine = ({ children }: TextWithLine) => {
    return (
        <motion.div className={Styles.TextWithLine}>
            <div className={Styles.line1}></div>

            <div className={Styles.text}> {children}</div>
            <div className={Styles.line2}></div>
        </motion.div>
    );
};

export default TextWithLine;
