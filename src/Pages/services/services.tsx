import Styles from './services.module.scss';
import Table from 'Assets/Tempus-Ui/Components/Table/table';
import { motion } from 'framer-motion';

const Services = () => {
    const data = [
        { person: 'Chris', interest: 'HTML tables', age: 22 },
        { person: 'Dennis', interest: 'Web accessibility', age: 45 },
        { person: 'Sarah', interest: 'JavaScript frameworks', age: 29 },
        { person: 'Karen', interest: 'Web performance', age: 36 },
    ];
    return (
        <motion.div className={Styles.table}>
            <Table Array={data}></Table>
        </motion.div>
    );
};
export default Services;
