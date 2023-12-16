import { useAuth } from 'Hooks/useAuth';
import { Navigate, useNavigate } from 'react-router-dom';
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
import {
    BlockOfPostType,
    removePost,
} from 'Store/slices/WritePost/WritePostSlice';
import { addNewPost } from 'Api/Posts/addNewPost';
import PostForWhom from './Mods/PostForWhom';

export type NewPost = {
    PostDataBlocks: BlockOfPostType[];
    PostTitle: string;
    PostAuthorId: string | null;
    PostDate: number;
    PostLikes: number;
    PostShows: number;
    PostComments: object;
    PostReposts: number;
};

const WritePost = () => {
    const { UserCanChanging } = useAuth();
    const { TitleOfPost, selectMode, BlocksOfPost, postForWhom } =
        useWritePost();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function sendNewPost() {
        const ToDay = new Date().getTime();
        const NewPost: NewPost = {
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

    return UserCanChanging ? (
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
    ) : (
        <Navigate to="/NeedAuth" />
    );
};

export default WritePost;
