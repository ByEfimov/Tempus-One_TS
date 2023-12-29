import { useAuth } from 'Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import Styles from './Styles.module.scss';
import { ControlBlocksPanel } from './ControllPanel/ControlBlocksPanel';
import TextMode from './ModsOfWrite/TextMode';
import CodeMode from './ModsOfWrite/CodeMode';
import ImageMode from './ModsOfWrite/ImageMode';
import ButtonVoid from 'Components/MiniComponents/button';
import TitleForPost from './Components/TitleForPost';
import { countEmptyValues } from 'Utils/countEmptyValues';
import { useWritePost } from 'Hooks/useWritePost';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { removePost } from 'Store/slices/WritePost/WritePostSlice';
import { addNewPost } from 'Api/Posts/addNewPost';
import PostForWhom from './Components/PostForWhom';
import { NewPostType } from 'Types/TypesOfData/Post/NewPostType';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import SurveyMode from './ModsOfWrite/SurveyMode';
import changeUserData from 'Api/Users/changeUserData';

const WritePost = () => {
    const { UserCanChanging, UserIsAuth, UserExperience, UserId } = useAuth();
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

        if (countEmptyValues(NewPost) - 4 >= 0) {
            changeUserData('experience', UserExperience + 40, UserId);
            addNewPost(NewPost);
            dispatch(removePost());
            navigate('/');
        } else {
            ErrorNotification('Не все поля заполнены.');
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
            case ModsOfWritePost.survey:
                return <SurveyMode />;
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
                    padding={false}
                ></ButtonVoid>
                <ButtonVoid
                    padding={false}
                    classes={Styles.ButtonClear}
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
