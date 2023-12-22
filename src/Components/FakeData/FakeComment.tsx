import Styles from './FakeStyles.module.scss';

export default function FakeComment() {
    return (
        <div className={Styles.FakeComment}>
            <div className={Styles.Comment}></div>
        </div>
    );
}
