import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostFromId } from '../../Api/Posts/getPostdataFromId';
import { Post } from '../../Store/slices/PostsSlice';

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState<Post | null>(null);

    useEffect(() => {
        getPostFromId(id).then((post) => setPost(post));
    }, []);

    return (
        post && <h1 style={{ marginTop: 80, padding: 20 }}>{post.PostTitle}</h1>
    );
}
