import { useAuth } from '../../Hooks/useAuth';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ModsOfWritePost } from '../../Utils/ModsOfComps';
import Styles from './Styles.module.scss';
import { ControlBlocksPanel } from './ControllPanel/ControlBlocksPanel';
import TextMode from './Mods/TextMode';
import KodMode from './Mods/KodMode';
import ImageMode from './Mods/ImageMode';
import ButtonVoid from '../../Components/minicops/B-void';
import TitleForPost from './Mods/TitleForPost';

export type PostData = {
    text: string;
    id: number;
    type: string;
    title?: string;
}[];

const WritePost = () => {
    const { UserIsAuth, UserId } = useAuth();
    const [TitleOfPost, setTitleOfPost] = useState('');

    const [AllDataOfPost, setAllDataForPost] = useState<PostData>([
        { text: '', id: 0, type: 'text' },
    ]);
    const [SelectMode, setSelectMode] = useState({
        type: ModsOfWritePost.text,
        id: 0,
    });

    function sendNewPost() {
        const ToDay = new Date().getTime();
        const NewPost = {
            Postid: 0, // ПОСТАВИТЬ ID
            PostDataBlocks: AllDataOfPost,
            PostTitle: TitleOfPost,
            PostAuthorid: UserId,
            PostDate: ToDay,
        };
        console.log(NewPost);
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
