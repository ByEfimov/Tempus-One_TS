import PostForWhom from './Components/PostForWhom';
import TitleForPost from './Components/TitleForPost';
import { ControlBlocksPanel } from './ControllPanel/ControlBlocksPanel';
import CodeMode from './ModsOfWrite/CodeMode';
import ImageMode from './ModsOfWrite/ImageMode';
import SurveyMode from './ModsOfWrite/SurveyMode';
import TextMode from './ModsOfWrite/TextMode';
import Styles from './Styles.module.scss';
import { changeRequest } from 'Api/requests/change-request';
import { postRequestWithNewId } from 'Api/requests/post-requests-with-new-id';
import Button, {
    ButtonTypes,
} from 'Assets/Tempus-Ui/Components/Buttons/Button';
import ButtonIcons, {
    buttonIcons,
} from 'Assets/Tempus-Ui/Icons/Buttons/Button-icons';
import ButtonVoid from 'Components/mini-components/button';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { useWritePost } from 'Hooks/useWritePost';
import { setExecuteButton } from 'Store/slices/header/header-slice';
import { removePost } from 'Store/slices/wite-post/write-post-slice';
import { NewPostType } from 'Types/TypesOfData/post/new-post-type';
import { ModsOfWritePost } from 'Utils/mods-of-comps';
import { applyFilterToNewPost } from 'Utils/post-utils/filter-bad-words';
import AppRoutes from 'Utils/routes/app-routes';
import { getUnixTime } from 'date-fns';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const WritePost = () => {
    const { UserExperience, UserId } = useAuth();
    const { TitleOfPost, selectMode, BlocksOfPost, postForWhom } =
        useWritePost();
    const currentDate = new Date();
    const currentUnixTime = getUnixTime(currentDate);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const NewPost: NewPostType = {
        PostDataBlocks: BlocksOfPost,
        PostTitle: TitleOfPost,
        PostAuthorId: postForWhom,
        PostDate: currentUnixTime,
    };

    useEffect(() => {
        function sendNewPost() {
            const filteredPost = applyFilterToNewPost(NewPost);
            changeRequest(
                'users/' + UserId,
                '/experience',
                UserExperience + 40,
            );
            postRequestWithNewId('posts/', filteredPost);
            dispatch(removePost());
            navigate(AppRoutes.DEFAULT);
        }
        dispatch(
            setExecuteButton({
                button: {
                    icon: '',
                    component: (
                        <Button Click={sendNewPost} Type={ButtonTypes.icon}>
                            <ButtonIcons Icon={buttonIcons.Sent} />
                        </Button>
                    ),
                },
            }),
        );
    }, [NewPost]);

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
