import Styles from '../posts/Styles.module.scss';
import ShowCode from './show-code';
import ShowImage from './show-image';
import ShowSurvey from './show-survey';
import {
    blockTypes,
    blocksType,
} from 'Store/slices/wite-post/write-post-slice';
import { FC } from 'react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface BlocksRender {
    Blocks: blocksType;
    postId: string | undefined;
}

const BlocksRender: FC<BlocksRender> = ({ Blocks, postId }) => {
    return (
        <div className={Styles.BlocksData}>
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
                        block?.type === blockTypes.Code ||
                        block?.type === blockTypes.Image ||
                        block?.type === blockTypes.Survey
                    ) {
                        return (
                            <SwiperSlide key={block.id}>
                                {block.type === blockTypes.Image &&
                                'imageUrl' in block.data ? (
                                    <div className={Styles.ImageBlock}>
                                        <ShowImage
                                            imageSrc={block.data.imageUrl}
                                        ></ShowImage>
                                    </div>
                                ) : block.type === blockTypes.Code &&
                                  'code' in block.data ? (
                                    <div
                                        key={block.id}
                                        className={Styles.CodePostBlock}
                                    >
                                        <ShowCode
                                            UserCode={block.data.code}
                                        ></ShowCode>
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
        </div>
    );
};

export default BlocksRender;
