import { getRequestObject } from 'Api/requests/get-requests';
import FakePost from 'Components/fake-data/fake-post';
import ButtonVoid from 'Components/mini-components/button';
import SettingsPostModal from 'Components/modals/settings-modal/settings-post-modal';
import { ErrorNotification } from 'Components/notifications/notifications';
import PostRender from 'Components/show-posts/posts/post-render';
import { useAuth } from 'Hooks/useAuth';
import { Post } from 'Types/TypesOfData/post/post';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
    const { id } = useParams();
    const { UserId } = useAuth();
    const [OpenPost, setOpenPost] = useState<Post | null>(null);
    const [SettingsModalOpen, setSettingsModalOpen] = useState(false);
    const canChange = OpenPost?.PostAuthorId === UserId;

    useEffect(() => {
        getRequestObject('posts/' + id)
            .then((OpenPost) => {
                setOpenPost(OpenPost);
            })
            .catch(() => ErrorNotification('Пост не найден.'));
    }, []);

    if (OpenPost) {
        return (
            <div style={{ marginTop: 17 }}>
                {SettingsModalOpen && (
                    <SettingsPostModal
                        setModalOpen={setSettingsModalOpen}
                        postid={id}
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
