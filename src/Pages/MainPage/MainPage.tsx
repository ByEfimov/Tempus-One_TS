import { useNavigate } from 'react-router-dom';
import ButtonVoid from '../../Components/minicops/B-void';
import Styles from './MainPage.module.scss';
import ShowPosts from './Posts/ShowPosts';

export default function MainPage() {
    const navigate = useNavigate();

    return (
        <>
            <ButtonVoid
                classes={Styles.button}
                title="Написать пост"
                clickHandler={() => {
                    navigate('WriteNewPost');
                }}
            ></ButtonVoid>
            <ShowPosts></ShowPosts>
        </>
    );
}
