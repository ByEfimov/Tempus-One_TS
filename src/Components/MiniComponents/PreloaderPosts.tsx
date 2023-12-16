import FakePost from 'Components/FakeData/FakePost';
import Styles from './MiniComponents.module.scss';

export default function PreloaderPosts() {
    return (
        <div className={Styles.Preloader}>
            <FakePost></FakePost>
            <FakePost></FakePost>
        </div>
    );
}
