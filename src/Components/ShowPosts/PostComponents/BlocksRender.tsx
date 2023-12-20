import { FC } from 'react';
import { PostBlock } from 'Types/TypesOfData/Post/Post';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import ShowCode from './ShowCode';
import Styles from '../Styles.module.scss';
// import Styles from '../Styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface BlocksRender {
    Blocks: PostBlock[];
}

const BlocksRender: FC<BlocksRender> = ({ Blocks }) => {
    console.log(Blocks);

    return (
        <Swiper spaceBetween={20} slidesPerView={1}>
            {Blocks.map((block) => {
                if (
                    block.type === ModsOfWritePost.image ||
                    block.type === ModsOfWritePost.code
                ) {
                    return (
                        <SwiperSlide key={block.id}>
                            {block.type === ModsOfWritePost.image ? (
                                <div className={Styles.ImageBlock}>
                                    <img src={block.text}></img>
                                </div>
                            ) : (
                                block.type === ModsOfWritePost.code && (
                                    <div
                                        key={block.id}
                                        className={Styles.CodeBlock}
                                    >
                                        <ShowCode
                                            UserCode={block.text}
                                        ></ShowCode>
                                    </div>
                                )
                            )}
                        </SwiperSlide>
                    );
                }
            })}
        </Swiper>
    );
};

export default BlocksRender;
