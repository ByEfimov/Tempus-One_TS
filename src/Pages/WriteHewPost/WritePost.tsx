import { useAuth } from '../../Hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
import { ModsOfWritePost } from '../../Utils/ModsOfComps';
import Styles from './Styles.module.scss';
import { ControlBlocksPanel } from './ControllPanel/ControlBlocksPanel';
import TextMode from './Mods/TextMode';
import KodMode from './Mods/KodMode';
import ImageMode from './Mods/ImageMode';
import ButtonVoid from '../../Components/minicops/B-void';
import TitleForPost from './Mods/TitleForPost';
import { v4 as uuidv4 } from 'uuid';
import { countEmptyValues } from '../../Utils/countEmptyValues';
import { useWritePost } from '../../Hooks/useWritePost';
import { useAppDispatch } from '../../Hooks/redus-hooks';
import { BlockOfPostType, removePost } from '../../Store/slices/WritePostSlice';
import { addNewPost } from '../../Api/Posts/addNewPost';

export type NewPost = {
    PostId: string;
    PostDataBlocks: BlockOfPostType[];
    PostTitle: string;
    PostAuthorId: string | null;
    PostDate: number;
    PostLikes: number;
    PostShows: number;
    PostComments: object;
};

const WritePost = () => {
    const { UserIsAuth, UserId } = useAuth();
    const { TitleOfPost, selectMode, BlocksOfPost } = useWritePost();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function sendNewPost() {
        const ToDay = new Date().getTime();
        const NewPost: NewPost = {
            PostId: uuidv4(),
            PostDataBlocks: BlocksOfPost,
            PostTitle: TitleOfPost,
            PostAuthorId: UserId,
            PostDate: ToDay,
            PostLikes: 0,
            PostShows: 0,
            PostComments: {},
        };

        if (countEmptyValues(NewPost) - 4 === 0) {
            addNewPost(NewPost);
            dispatch(removePost());
            navigate('/');
        }
    }

    const showSelectMode = () => {
        switch (selectMode.type) {
            case ModsOfWritePost.text:
                return <TextMode />;
            case ModsOfWritePost.kod:
                return <KodMode />;
            case ModsOfWritePost.image:
                return <ImageMode />;
        }
    };

    return UserIsAuth ? (
        <div className={Styles.WritePost}>
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
    ) : (
        <Navigate to="/NeedAuth" />
    );
};

export default WritePost;
