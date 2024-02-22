import BottomInfo from '../create/bottom-block-info';
import Styles from '../styles.module.scss';
import { ButtonIcons, buttonIcons, defaultItem, formItem } from '@/app/assets/Tempus-Ui';
import { useAppDispatch } from '@/app/hooks/redux-hooks';
import { blockType, changeDataBlock } from '@/app/slices/wite-post/write-post-slice';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const TextBlock = ({ block, selectEditMode }: { block: blockType; selectEditMode: (blockId: number) => void }) => {
  return (
    <motion.div
      variants={formItem}
      className={classNames(Styles.block, block.isEditing && Styles.active)}
      onClick={() => selectEditMode(block.id)}
    >
      {block.isEditing ? <EditingMode block={block}></EditingMode> : <RenderMode block={block}></RenderMode>}

      <BottomInfo block={block}>
        <motion.li variants={defaultItem}>
          <ButtonIcons Icon={buttonIcons.MarkDown}></ButtonIcons>
        </motion.li>
      </BottomInfo>
    </motion.div>
  );
};

const EditingMode = ({ block }: { block: blockType }) => {
  const dispatch = useAppDispatch();
  if ('content' in block.data) {
    return (
      <motion.textarea
        value={block.data.content}
        variants={defaultItem}
        autoFocus
        onChange={(e) =>
          dispatch(
            changeDataBlock({
              content: e.target.value,
              blockId: block.id,
              type: block.type,
            }),
          )
        }
      ></motion.textarea>
    );
  }
};

const RenderMode = ({ block }: { block: blockType }) => {
  if ('content' in block.data) {
    return (
      <motion.div variants={defaultItem}>
        <ReactMarkdown
          skipHtml
          rehypePlugins={[rehypeHighlight]}
          remarkPlugins={[remarkGfm]}
          children={block.data.content}
        />
      </motion.div>
    );
  }
};

export default TextBlock;
export { RenderMode };
