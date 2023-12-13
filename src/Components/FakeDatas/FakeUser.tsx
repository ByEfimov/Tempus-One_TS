import Styles from './FakeStyles.module.scss';

export default function FakeUser() {
    return (
        <div className={Styles.FakeUser}>
            <div className={Styles.User}></div>
        </div>
    );
}
