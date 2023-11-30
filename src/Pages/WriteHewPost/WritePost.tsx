import { useAuth } from '../../Hooks/useAuth';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ModsOfWritePost } from '../../Utils/ModsOfComps';
import Styles from './Styles.module.scss';
import { getDatabase, set, ref } from '@firebase/database';
import { ControlBlocksPanel } from './ControllPanel/ControlBlocksPanel';
import TextMode from './Mods/TextMode';
import KodMode from './Mods/KodMode';
import ImageMode from './Mods/ImageMode';
import ButtonVoid from '../../Components/minicops/B-void';
import TitleForPost from './Mods/TitleForPost';
import { v4 as uuidv4 } from 'uuid';
import { countEmptyValues } from '../../Utils/countEmptyValues';

export type AllDataOfPost = {
    text: string;
    id: number;
    type: string;
    title?: string;
};

export type SelectMode = {
    type: string;
    id: number;
};

const WritePost = () => {
    const { UserIsAuth, UserId } = useAuth();
    const navigate = useNavigate();
    const db = getDatabase();

    const [TitleOfPost, setTitleOfPost] = useState('');
    const [AllDataOfPost, setAllDataForPost] = useState<AllDataOfPost[]>([
        { text: '', id: 0, type: 'text' },
    ]);
    const [SelectMode, setSelectMode] = useState<SelectMode>({
        type: ModsOfWritePost.text,
        id: 0,
    });

    function sendNewPost() {
        const ToDay = new Date().getTime();
        const NewPost = {
            PostId: uuidv4(),
            PostDataBlocks: AllDataOfPost,
            PostTitle: TitleOfPost,
            PostAuthorId: UserId,
            PostDate: ToDay,
            PostLikes: 0,
            PostShows: 0,
            PostComments: {},
        };

        if (countEmptyValues(NewPost) - 3 === 0) {
            set(ref(db, 'posts/' + NewPost.PostId), NewPost);
            navigate('/');
        }
    }

    const showSelectMode = () => {
        switch (SelectMode.type) {
            case ModsOfWritePost.text:
                return (
                    <TextMode
                        setAllDataForPost={setAllDataForPost}
                        AllDataOfPost={AllDataOfPost}
                        SelectMode={SelectMode}
                    ></TextMode>
                );
            case ModsOfWritePost.kod:
                return (
                    <KodMode
                        setAllDataForPost={setAllDataForPost}
                        AllDataOfPost={AllDataOfPost}
                        SelectMode={SelectMode}
                    />
                );
            case ModsOfWritePost.image:
                return (
                    <ImageMode
                        setAllDataForPost={setAllDataForPost}
                        AllDataOfPost={AllDataOfPost}
                        SelectMode={SelectMode}
                    />
                );
        }
    };

    return UserIsAuth ? (
        <div className={Styles.WritePost}>
            <TitleForPost
                TitleOfPost={TitleOfPost}
                setTitleOfPost={setTitleOfPost}
            ></TitleForPost>

            {showSelectMode()}

            <ControlBlocksPanel
                AllDataOfPost={AllDataOfPost}
                SelectMode={SelectMode}
                setAllDataForPost={setAllDataForPost}
                setSelectMode={setSelectMode}
            ></ControlBlocksPanel>

            <ButtonVoid
                classes={Styles.ButtonWrite}
                title="Отправить пост"
                clickHandler={sendNewPost}
            ></ButtonVoid>
        </div>
    ) : (
        <Navigate to="/NeedAuth" />
    );
};

export default WritePost;
