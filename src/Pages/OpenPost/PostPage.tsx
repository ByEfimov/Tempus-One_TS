import { getPostFromId } from 'Api/Posts/getPostDataFromId';
import FakePost from 'Components/FakeData/FakePost';
import ButtonVoid from 'Components/MiniComponents/button';
import SettingsPostModal from 'Components/Modals/SettingsModals/SettingsPostModal';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import PostRender from 'Components/ShowPosts/Posts/PostRender';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setTitleOfHeader } from 'Store/slices/Header/HeaderSlice';
import { Post } from 'Types/TypesOfData/Post/Post';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
    const { id } = useParams();
    const { UserId } = useAuth();
    const [OpenPost, setOpenPost] = useState<Post | null>(null);
    const [SettingsModalOpen, setSettingsModalOpen] = useState(false);
    const canChange = OpenPost?.PostAuthorId === UserId;
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPostFromId(id)
            .then((OpenPost) => {
                setOpenPost(OpenPost);
                dispatch(setTitleOfHeader({ Title: OpenPost?.PostTitle }));
            })
            .catch(() => ErrorNotification('Пост не найден.'));
    }, []);

    if (OpenPost) {
        return (
            <div style={{ marginTop: 17 }}>
                {SettingsModalOpen && (
                    <SettingsPostModal
                        setModalOpen={setSettingsModalOpen}
                        post={OpenPost}
                    ></SettingsPostModal>
                )}
                <PostRender post={OpenPost}></PostRender>
                {canChange && (
                    <ButtonVoid
                        title="Настройки"
                        clickHandler={() => {
                            setSettingsModalOpen(true);
                        }}
                    ></ButtonVoid>
                )}
            </div>
        );
    } else {
        return <FakePost></FakePost>;
    }
}
