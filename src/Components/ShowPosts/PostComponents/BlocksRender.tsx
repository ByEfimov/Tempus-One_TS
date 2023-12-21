import { FC } from 'react';
import { PostBlock } from 'Types/TypesOfData/Post/Post';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import ShowCode from './ShowCode';
import Styles from '../Posts/Styles.module.scss';
// import Styles from '../Styles.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';

interface BlocksRender {
    Blocks: PostBlock[];
}

const BlocksRender: FC<BlocksRender> = ({ Blocks }) => {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{
                type: 'fraction',
            }}
            modules={[Pagination]}
        >
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
                                        className={Styles.CodePostBlock}
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
