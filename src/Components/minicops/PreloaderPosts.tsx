import FakePost from '../FakeDatas/FakePost';
import Styles from './minicomps.module.scss';

export default function PreloaderPosts() {
    return (
        <div className={Styles.Preloader}>
            <FakePost></FakePost>
            <FakePost></FakePost>
        </div>
    );
}
