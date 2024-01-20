import Styles from './styles.module.scss';
import FakeUser from 'Components/fake-data/fake-user';

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
