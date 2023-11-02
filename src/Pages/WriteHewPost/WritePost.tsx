import { useAuth } from '../../Hooks/useAuth';
import { useState, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { ModsOfWritePost, ModsOfInput } from '../../Utils/ModsOfComps';
import Styles from './Styles.module.css';
import ControlBlocksPanel from './ControllPanel/ControlPanel';
import CustomInput from '../../Components/minicops/input';
import TextMode from './Mods/TextMode';
import KodMode from './Mods/KodMode';
import ImageMode from './Mods/ImageMode';

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

export default function WritePost() {
    const { UserIsAuth } = useAuth();
    const [TitleOfPost, setTitleOfPost] = useState('');
    const [AllDataOfPost, setAllDataForPost] = useState<PostData>([
        { text: '', id: 0, type: 'text' },
    ]);

    console.log(AllDataOfPost);

    const [SelectMode, setSelectMode] = useState({
        type: ModsOfWritePost.text,
        id: 0,
    });

    return UserIsAuth ? (
        <div className={Styles.WritePost}>
            <TitleForPost
                TitleOfPost={TitleOfPost}
                setTitleOfPost={setTitleOfPost}
            ></TitleForPost>

            {SelectMode.type === ModsOfWritePost.text && (
                <TextMode
                    setAllDataForPost={setAllDataForPost}
                    AllDataOfPost={AllDataOfPost}
                    SelectMode={SelectMode}
                ></TextMode>
            )}
            {SelectMode.type === ModsOfWritePost.kod && (
                <KodMode
                    setAllDataForPost={setAllDataForPost}
                    AllDataOfPost={AllDataOfPost}
                    SelectMode={SelectMode}
                />
            )}
            {SelectMode.type === ModsOfWritePost.image && (
                <ImageMode
                    AllDataOfPost={AllDataOfPost}
                    SelectMode={SelectMode}
                />
            )}

            <ControlBlocksPanel
                SelectMode={SelectMode}
                AllDataOfPost={AllDataOfPost}
                setAllDataForPost={setAllDataForPost}
                setSelectMode={setSelectMode}
            ></ControlBlocksPanel>
        </div>
    ) : (
        <Navigate to="/NeedAuth" />
    );
}
