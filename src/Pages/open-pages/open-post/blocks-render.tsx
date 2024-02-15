import Styles from './Styles.module.scss';
import { formContainer, formItem } from 'Assets/Tempus-Ui';
import ShowSurvey from 'Components/show-posts/post-components/show-survey';
import { RenderMode as RenderText } from 'Pages/create-new/create-new-post/blocks/text-block';
import {
    PostType,
    blockType,
    blockTypes,
} from 'Store/slices/wite-post/write-post-slice';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { LivePreview, LiveProvider } from 'react-live';

const BlocksRender = ({ post }: { post: PostType }) => {
    return (
        <motion.ul
            variants={formContainer}
            initial="hidden"
            animate="visible"
            className={Styles.container}
        >
            {post.blocks.map((block) =>
                block?.type === blockTypes.Text ? (
                    <motion.li variants={formItem} className={Styles.block}>
                        <RenderText key={block.id} block={block}></RenderText>
                    </motion.li>
                ) : block?.type === blockTypes.Survey ? (
                    <motion.li
                        variants={formItem}
                        className={classNames(Styles.block, Styles.SurveyBlock)}
                    >
                        <ShowSurvey postId={post.id} block={block}></ShowSurvey>
                    </motion.li>
                ) : block?.type === blockTypes.Image ? (
                    <RenderImage key={block.id} block={block}></RenderImage>
                ) : (
                    block?.type === blockTypes.Code && (
                        <CodeMode key={block.id} block={block}></CodeMode>
                    )
                ),
            )}
        </motion.ul>
    );
};

const RenderImage = ({ block }: { block: blockType }) => {
    return (
        <motion.li
            variants={formItem}
            className={classNames(Styles.block, Styles.ImageBlock)}
        >
            <img
                src={
                    (block &&
                        'imageUrl' in block.data &&
                        block.data.imageUrl) ||
                    ''
                }
                alt=""
            />
        </motion.li>
    );
};

const CodeMode = ({ block }: { block: blockType }) => {
    return (
        <motion.li variants={formItem} className={Styles.block}>
            <LiveProvider
                code={(block && 'code' in block.data && block.data.code) || ''}
            >
                <LivePreview />
            </LiveProvider>
        </motion.li>
    );
};

export default BlocksRender;
