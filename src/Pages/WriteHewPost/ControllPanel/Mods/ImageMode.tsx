import { FC } from 'react';
import ShowImage from 'Components/ShowPosts/PostComponents/ShowImage';

interface ImageMode {
    openMode: () => void;
    className: string;
    id: number;
    imageUrl: string;
}

const ImageMode: FC<ImageMode> = ({ openMode, id, imageUrl, className }) => {
    return (
        <div className={className} onClick={openMode} key={id}>
            <ShowImage imageSrc={imageUrl}></ShowImage>
        </div>
    );
};
export default ImageMode;
