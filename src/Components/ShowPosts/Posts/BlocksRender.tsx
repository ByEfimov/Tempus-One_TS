import { FC } from 'react';
import { PostBlock } from 'Types/TypesOfData/Post/Post';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import ShowCode from '../PostsComponents/ShowCode';
import Styles from './Styles.module.scss';

interface BlocksRender {
    Blocks: PostBlock[];
}

const BlocksRender: FC<BlocksRender> = ({ Blocks }) => {
    return Blocks.map((block) =>
        block.type === ModsOfWritePost.image ? (
            <div key={block.id} className={Styles.ImageBlock}>
                <img src={block.text}></img>
            </div>
        ) : (
            block.type === ModsOfWritePost.code && (
                <div key={block.id} className={Styles.CodeBlock}>
                    <ShowCode UserCode={block.text}></ShowCode>
                </div>
            )
        )
    );
};

export default BlocksRender;
