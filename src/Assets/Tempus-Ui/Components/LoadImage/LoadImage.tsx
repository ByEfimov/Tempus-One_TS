import Styles from './LoadImage.module.scss';
import { handleImageUpload } from 'Utils/handlers/handler-image-upload';
import FeatherIcon from 'feather-icons-react';

const LoadImage = ({
    Callback,
    Image,
}: {
    Callback: (value: React.SetStateAction<string>) => void;
    Image: string;
}) => {
    return (
        <div className={Styles.LoadImage}>
            {Image ? (
                <div>
                    <img src={Image} alt="" />
                </div>
            ) : (
                <div className={Styles.input}>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(e) => handleImageUpload(e, Callback)}
                    />
                    <FeatherIcon
                        icon={'image'}
                        className={Styles.Image}
                    ></FeatherIcon>
                </div>
            )}
        </div>
    );
};
export default LoadImage;
