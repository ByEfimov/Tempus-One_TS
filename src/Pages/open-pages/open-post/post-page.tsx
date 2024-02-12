import { getRequestObject } from 'Api/requests/get-requests';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    buttonIcons,
    defaultContainer,
} from 'Assets/Tempus-Ui';
import FakePost from 'Components/fake-data/fake-post';
import { ErrorNotification } from 'Components/notifications/notifications';
import PostRender from 'Components/show-posts/posts/post-render';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setExecuteButton } from 'Store/slices/header/header-slice';
import { PostType } from 'Store/slices/wite-post/write-post-slice';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
    const { id } = useParams();
    const { UserId } = useAuth();
    const [OpenPost, setOpenPost] = useState<PostType | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getRequestObject('posts/' + id)
            .then((OpenPost) => {
                setOpenPost(OpenPost);
                dispatch(
                    setExecuteButton({
                        button: {
                            icon: '',
                            component: OpenPost?.author === UserId && (
                                <Button
                                    Type={ButtonTypes.icon}
                                    Click={() => {}}
                                >
                                    <ButtonIcons Icon={buttonIcons.Settings} />
                                </Button>
                            ),
                        },
                    }),
                );
            })
            .catch(() => ErrorNotification('Пост не найден.'));
    }, []);

    if (OpenPost) {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={defaultContainer}
                style={{ padding: 10, paddingTop: 20 }}
            >
                {/* {SettingsModalOpen && (
                    <SettingsPostModal
                        setModalOpen={setSettingsModalOpen}
                        postid={id}
                        post={OpenPost}
                    ></SettingsPostModal>
                )} */}
                <PostRender post={OpenPost}></PostRender>
            </motion.div>
        );
    } else {
        return <FakePost></FakePost>;
    }
}
