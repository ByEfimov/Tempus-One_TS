import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from 'Store/slices/PostsSlice';
import { setTitleOfHeader } from 'Store/slices/Header/HeaderSlice';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { getPostFromId } from 'Api/Posts/getPostDataFromId';

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getPostFromId(id).then((post) => {
            setPost(post);
            dispatch(setTitleOfHeader({ Title: post?.PostTitle }));
        });
    }, []);

    return (
        post && <h1 style={{ marginTop: 80, padding: 20 }}>{post.PostTitle}</h1>
    );
}
