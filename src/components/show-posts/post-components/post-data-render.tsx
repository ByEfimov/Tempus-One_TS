import Styles from '../Posts/Styles.module.scss';
import { Post } from 'Types/TypesOfData/post/post';
import { FC } from 'react';

interface PostDataRenderProps {
    post: Post;
}

const PostDataRender: FC<PostDataRenderProps> = ({ post }) => {
    return (
        <div className={Styles.PostData}>
            <div className={Styles.Title}>{post.PostTitle}</div>
            {!post.PostDataBlocks[1] && (
                <div className={Styles.Text}>{post.PostDataBlocks[0].text}</div>
            )}
        </div>
    );
};
export default PostDataRender;
