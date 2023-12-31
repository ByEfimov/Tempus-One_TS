import Styles from './MiniComponents.module.scss';
import FakeUser from 'Components/FakeData/FakeUser';

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
