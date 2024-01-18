import Styles from './styles.module.scss';

export default function FakeOpenUser() {
    return (
        <div className={Styles.FakeOpenUser}>
            <div className={Styles.UserDataTop}></div>
            <div className={Styles.UserData}></div>
        </div>
    );
}
