import { useNavigate } from 'react-router-dom';
import ButtonVoid from '../../Components/minicops/B-void';
import Styles from './MainPage.module.scss';
import { usePosts } from '../../Hooks/usePosts';
import ShowPosts from '../../Components/ShowPosts/PostRender.tsx';

export default function MainPage() {
    const navigate = useNavigate();
    const { Posts } = usePosts();
    console.log(Posts);
    return (
        <>
            <ButtonVoid
                classes={Styles.button}
                title="Написать пост"
                clickHandler={() => {
                    navigate('WriteNewPost');
                }}
            ></ButtonVoid>
            <ShowPosts />
        </>
    );
}
