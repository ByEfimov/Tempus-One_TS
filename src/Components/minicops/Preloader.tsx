import FakePost from '../ShowPosts/Posts/FakePost';
import Styles from './minicomps.module.scss';

export default function Preloader() {
    return (
        <div className={Styles.Preloader}>
            <FakePost></FakePost>
            <FakePost></FakePost>
        </div>
    );
}
