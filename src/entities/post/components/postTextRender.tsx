import Styles from '../styles.module.scss';
import { PostType } from '@/Store/slices/wite-post/write-post-slice';
import { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

interface PostTextRenderProps {
    post: PostType;
}

const PostTextRender: FC<PostTextRenderProps> = ({ post }) => {
    const filteredArray = post.blocks.filter((obj) => obj?.type === 'Text');

    return (
        <div className={Styles.PostData}>
            {filteredArray && (
                <div className={Styles.Text}>
                    {filteredArray.map(
                        (text, index: number) =>
                            text &&
                            'content' in text.data && (
                                <ReactMarkdown
                                    key={index}
                                    skipHtml
                                    rehypePlugins={[rehypeHighlight]}
                                    remarkPlugins={[remarkGfm]}
                                >
                                    {text?.data.content + ' '}
                                </ReactMarkdown>
                            ),
                    )}
                </div>
            )}
        </div>
    );
};
export default PostTextRender;
