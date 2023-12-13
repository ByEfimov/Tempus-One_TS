import FakeUser from '../FakeDatas/FakeUser';
import Styles from './minicomps.module.scss';

export default function PreloaderUsers() {
    return (
        <div className={Styles.Preloader}>
            <FakeUser></FakeUser>
            <FakeUser></FakeUser>
            <FakeUser></FakeUser>
            <FakeUser></FakeUser>
            <FakeUser></FakeUser>
            <FakeUser></FakeUser>
        </div>
    );
}
