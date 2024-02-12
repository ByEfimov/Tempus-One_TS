import Styles from '../posts/Styles.module.scss';
import { PostType } from 'Store/slices/wite-post/write-post-slice';
import { FC } from 'react';

interface PostDataRenderProps {
    post: PostType;
}

const PostDataRender: FC<PostDataRenderProps> = ({ post }) => {
    const filteredArray = post.blocks.filter((obj) => obj?.type === 'Text');

    return (
        <div className={Styles.PostData}>
            {filteredArray && (
                <div className={Styles.Text}>
                    {filteredArray.map(
                        (text) =>
                            text &&
                            'content' in text.data &&
                            text?.data.content + ' ',
                    )}
                </div>
            )}
        </div>
    );
};
export default PostDataRender;
