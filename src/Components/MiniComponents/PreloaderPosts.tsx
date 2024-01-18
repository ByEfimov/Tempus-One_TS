import Styles from './styles.module.scss';
import FakePost from 'Components/FakeData/fake-post';

export default function PreloaderPosts() {
    return (
        <div className={Styles.Preloader}>
            <FakePost></FakePost>
            <FakePost></FakePost>
        </div>
    );
}
