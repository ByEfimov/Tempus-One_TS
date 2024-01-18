import Styles from './styles.module.scss';

export default function FakePost() {
    return (
        <div className={Styles.FakePost}>
            <div className={Styles.UserData}></div>
            <div className={Styles.PostData}></div>
            <div className={Styles.BlocksData}></div>
        </div>
    );
}
