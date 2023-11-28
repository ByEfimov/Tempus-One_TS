import { useAuth } from '../../Hooks/useAuth';
import React, { useState, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ModsOfWritePost, ModsOfInput } from '../../Utils/ModsOfComps';
import Styles from './Styles.module.scss';
import ControlBlocksPanel from './ControllPanel/ControlPanel';
import CustomInput from '../../Components/minicops/input';
import TextMode from './Mods/TextMode';
import KodMode from './Mods/KodMode';
import ImageMode from './Mods/ImageMode';
import ButtonVoid from '../../Components/minicops/B-void';

interface TitleForPostProps {
    TitleOfPost: string;
    setTitleOfPost: (title: string) => void;
}

const TitleForPost: FC<TitleForPostProps> = ({
    TitleOfPost,
    setTitleOfPost,
}) => {
    function changeTitle(e: React.ChangeEvent<HTMLInputElement>) {
        setTitleOfPost(e.target.value);
    }

    return (
        <CustomInput
            placeholder="Название поста"
            value={TitleOfPost}
            changeFunction={changeTitle}
            mode={ModsOfInput.default}
        ></CustomInput>
    );
};

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

    const openSelectMode = () => {
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

            {openSelectMode()}

            <ControlBlocksPanel
                SelectMode={SelectMode}
                AllDataOfPost={AllDataOfPost}
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
