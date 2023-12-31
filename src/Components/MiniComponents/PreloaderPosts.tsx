import Styles from './MiniComponents.module.scss';
import FakePost from 'Components/FakeData/FakePost';

export default function PreloaderPosts() {
    return (
        <div className={Styles.Preloader}>
            <FakePost></FakePost>
            <FakePost></FakePost>
        </div>
    );
}
