import Styles from '../Posts/Styles.module.scss';
import ShowCode from './ShowCode';
import ShowImage from './ShowImage';
import ShowSurvey from './ShowSurvey';
import { PostBlock } from 'Types/TypesOfData/Post/Post';
import { ModsOfWritePost } from 'Utils/ModsOfComps';
import { FC } from 'react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface BlocksRender {
    Blocks: PostBlock[];
    postId: string;
}

const BlocksRender: FC<BlocksRender> = ({ Blocks, postId }) => {
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
                    block.type === ModsOfWritePost.code ||
                    block.type === ModsOfWritePost.survey
                ) {
                    return (
                        <SwiperSlide key={block.id}>
                            {block.type === ModsOfWritePost.image ? (
                                <div className={Styles.ImageBlock}>
                                    <ShowImage
                                        imageSrc={block.text}
                                    ></ShowImage>
                                </div>
                            ) : block.type === ModsOfWritePost.code ? (
                                <div
                                    key={block.id}
                                    className={Styles.CodePostBlock}
                                >
                                    <ShowCode UserCode={block.text}></ShowCode>
                                </div>
                            ) : (
                                <ShowSurvey
                                    postId={postId}
                                    block={block}
                                ></ShowSurvey>
                            )}
                        </SwiperSlide>
                    );
                }
            })}
        </Swiper>
    );
};

export default BlocksRender;
