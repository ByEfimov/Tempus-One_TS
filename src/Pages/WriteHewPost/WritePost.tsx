import { useAuth } from 'Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import Styles from './Styles.module.scss';
import { ControlBlocksPanel } from './ControllPanel/ControlBlocksPanel';
import TextMode from './Mods/TextMode';
import CodeMode from './Mods/CodeMode';
import ImageMode from './Mods/ImageMode';
import ButtonVoid from 'Components/MiniComponents/button';
import TitleForPost from './Mods/TitleForPost';
import { countEmptyValues } from 'Utils/countEmptyValues';
import { useWritePost } from 'Hooks/useWritePost';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { removePost } from 'Store/slices/WritePost/WritePostSlice';
import { addNewPost } from 'Api/Posts/addNewPost';
import PostForWhom from './Mods/PostForWhom';
import { NewPostType } from 'Types/TypesOfData/Post/NewPostType';
import { ErrorNotification } from 'Components/Notifications/Notifications';

const WritePost = () => {
    const { UserCanChanging, UserIsAuth } = useAuth();
    const { TitleOfPost, selectMode, BlocksOfPost, postForWhom } =
        useWritePost();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function sendNewPost() {
        const ToDay = new Date().getTime();
        const NewPost: NewPostType = {
            PostDataBlocks: BlocksOfPost,
            PostTitle: TitleOfPost,
            PostAuthorId: postForWhom,
            PostDate: ToDay,
            PostLikes: 0,
            PostShows: 1,
            PostComments: {},
            PostReposts: 0,
        };
        console.log(countEmptyValues(NewPost));

        if (countEmptyValues(NewPost) - 5 === 0) {
            addNewPost(NewPost);
            dispatch(removePost());
            navigate('/');
        }
    }

    const showSelectMode = () => {
        switch (selectMode.type) {
            case ModsOfWritePost.text:
                return <TextMode />;
            case ModsOfWritePost.code:
                return <CodeMode />;
            case ModsOfWritePost.image:
                return <ImageMode />;
        }
    };

    if (UserCanChanging) {
        return (
            <div className={Styles.WritePost}>
                <PostForWhom></PostForWhom>

                <TitleForPost></TitleForPost>

                {showSelectMode()}

                <ControlBlocksPanel></ControlBlocksPanel>

                <ButtonVoid
                    classes={Styles.ButtonWrite}
                    title="Отправить пост"
                    clickHandler={sendNewPost}
                ></ButtonVoid>
                <ButtonVoid
                    classes={Styles.ButtonWrite}
                    title="Очистить пост"
                    clickHandler={() => {
                        dispatch(removePost());
                    }}
                ></ButtonVoid>
            </div>
        );
    } else if (!UserCanChanging) {
        if (!UserIsAuth) {
            ErrorNotification('Нужно войти в аккаунт.');
        } else {
            ErrorNotification('Нужно подтвердить почту.');
        }
    }
};

export default WritePost;
