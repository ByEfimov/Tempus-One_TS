import Styles from './Preloader.module.scss';

const Preloader = () => {
    return (
        <div className={Styles.PreloaderContainer}>
            <div className={Styles.Preloader}></div>
        </div>
    );
};
export default Preloader;
