import { FC } from 'react';

interface ShowImageProps {
    imageSrc: string | undefined;
}

const ShowImage: FC<ShowImageProps> = ({ imageSrc }) => {
    return imageSrc ? <img src={imageSrc} alt="" /> : 'Картинка сломалась(';
};
export default ShowImage;
