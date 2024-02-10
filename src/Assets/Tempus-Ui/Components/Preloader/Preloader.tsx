import Styles from './preloader.module.scss';
import { motion } from 'framer-motion';

const Preloader = () => {
    return (
        <motion.div className={Styles.PreloaderContainer}>
            <div className={Styles.Preloader}></div>
        </motion.div>
    );
};
export default Preloader;
