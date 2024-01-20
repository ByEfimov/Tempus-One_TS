import { getPostFromId } from 'Api/Posts/get-post-data-fromId';
import FakePost from 'Components/fake-data/fake-post';
import ButtonVoid from 'Components/mini-components/button';
import SettingsPostModal from 'Components/modals/settings-modal/settings-post-modal';
import { ErrorNotification } from 'Components/notifications/notifications';
import PostRender from 'Components/show-posts/posts/post-render';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setTitleOfHeader } from 'Store/slices/header/header-slice';
import { Post } from 'Types/TypesOfData/post/post';
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
