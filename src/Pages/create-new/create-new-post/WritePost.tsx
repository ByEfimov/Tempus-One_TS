import PostForWhom from './Components/PostForWhom';
import TitleForPost from './Components/TitleForPost';
import { ControlBlocksPanel } from './ControllPanel/ControlBlocksPanel';
import CodeMode from './ModsOfWrite/CodeMode';
import ImageMode from './ModsOfWrite/ImageMode';
import SurveyMode from './ModsOfWrite/SurveyMode';
import TextMode from './ModsOfWrite/TextMode';
import Styles from './Styles.module.scss';
import { addNewPost } from 'Api/Posts/add-new-post';
import changeUserData from 'Api/Users/change-user-data';
import ButtonVoid from 'Components/mini-components/button';
import { ErrorNotification } from 'Components/notifications/notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { useWritePost } from 'Hooks/useWritePost';
import { removePost } from 'Store/slices/wite-post/write-post-slice';
import { NewPostType } from 'Types/TypesOfData/post/new-post-type';
import { ModsOfWritePost } from 'Utils/mods-of-comps';
import { applyFilterToNewPost } from 'Utils/post-utils/filter-bad-words';
import { countEmptyValues } from 'Utils/validate-data/count-empty-values';
import { getUnixTime } from 'date-fns';
import { useNavigate } from 'react-router-dom';

const WritePost = () => {
    const { UserExperience, UserId } = useAuth();
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
};

export default WritePost;
