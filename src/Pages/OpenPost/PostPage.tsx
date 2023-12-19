import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from 'Types/TypesOfData/Post/Post';
import { setTitleOfHeader } from 'Store/slices/Header/HeaderSlice';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { getPostFromId } from 'Api/Posts/getPostDataFromId';
import PostRender from 'Components/ShowPosts/Posts/PostRender';
import FakePost from 'Components/FakeData/FakePost';
import { ErrorNotification } from 'Components/Notifications/Notifications';

export default function PostPage() {
    const { id } = useParams();
    const [OpenPost, setOpenPost] = useState<Post | null>(null);
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
                <PostRender post={OpenPost}></PostRender>
            </div>
        );
    } else {
        return <FakePost></FakePost>;
    }
}
