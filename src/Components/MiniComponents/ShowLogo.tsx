import { FC } from 'react';
import UserIcon from 'Assets/Icons/Header/user.svg';

const ShowLogo: FC<{ ImageUrl: string | undefined }> = ({ ImageUrl }) => {
    if (ImageUrl) {
        return (
            <div className="Logo">
                <img src={ImageUrl} alt="" />
            </div>
        );
    } else {
        return (
            <div className="FakeLogo">
                <img src={UserIcon} alt="" />
            </div>
        );
    }
};
export default ShowLogo;
