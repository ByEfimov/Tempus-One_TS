import PostForWhom from './Components/PostForWhom';
import TitleForPost from './Components/TitleForPost';
import { ControlBlocksPanel } from './ControllPanel/ControlBlocksPanel';
import CodeMode from './ModsOfWrite/CodeMode';
import ImageMode from './ModsOfWrite/ImageMode';
import SurveyMode from './ModsOfWrite/SurveyMode';
import TextMode from './ModsOfWrite/TextMode';
import Styles from './Styles.module.scss';
import { addNewPost } from 'Api/Posts/addNewPost';
import changeUserData from 'Api/Users/changeUserData';
import ButtonVoid from 'Components/MiniComponents/button';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { useWritePost } from 'Hooks/useWritePost';
import { removePost } from 'Store/slices/WritePost/WritePostSlice';
import { NewPostType } from 'Types/TypesOfData/Post/NewPostType';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import filterBadWords, {
    applyFilterToNewPost,
} from 'Utils/Posts/FilterBadWords';
import { countEmptyValues } from 'Utils/countEmptyValues';
import { getUnixTime } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const WritePost = () => {
    const { UserCanChanging, UserIsAuth, UserExperience, UserId } = useAuth();
    const { TitleOfPost, selectMode, BlocksOfPost, postForWhom } =
        useWritePost();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function sendNewPost() {
        const currentDate = new Date();
        const currentUnixTime = getUnixTime(currentDate);

        const NewPost: NewPostType = {
            PostDataBlocks: BlocksOfPost,
            PostTitle: TitleOfPost,
            PostAuthorId: postForWhom,
            PostDate: currentUnixTime,
            PostLikes: 0,
            PostShows: 1,
            PostComments: {},
            PostReposts: 0,
        };

        const filteredPost = applyFilterToNewPost(NewPost);

        if (countEmptyValues(filteredPost) - 4 === 0) {
            changeUserData('experience', UserExperience + 40, UserId);
            addNewPost(filteredPost);
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
