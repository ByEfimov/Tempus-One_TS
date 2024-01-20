import { FC } from 'react';

interface ShowImageProps {
    imageSrc: string;
}

const ShowImage: FC<ShowImageProps> = ({ imageSrc }) => {
    return imageSrc ? <img src={imageSrc} alt="" /> : 'Здесь будет результат.';
};
export default ShowImage;
