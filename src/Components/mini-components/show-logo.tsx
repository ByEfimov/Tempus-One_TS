import Styles from './styles.module.scss';
import UserIcon from 'Assets/Icons/Header/user.svg';
import { FC } from 'react';

const ShowLogo: FC<{ ImageUrl: string | undefined | null }> = ({
    ImageUrl,
}) => {
    if (ImageUrl) {
        return (
            <div className={Styles.Logo}>
                <img src={ImageUrl} alt="" />
            </div>
        );
    } else {
        return (
            <div className={Styles.FakeLogo}>
                <img src={UserIcon} alt="" />
            </div>
        );
    }
};
export default ShowLogo;
