import FakeUser from 'Components/FakeData/FakeUser';
import Styles from './MiniComponents.module.scss';

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
