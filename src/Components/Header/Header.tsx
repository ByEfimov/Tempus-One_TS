import FeatherIcon from 'feather-icons-react';
import Styles from './Header.module.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

export default function Header() {
    const navigate = useNavigate();
    const { UserIsAuth, UserId, UserPhoto } = useAuth();
    function OpenProfile() {
        if (UserIsAuth) {
            navigate(`/User/${UserId}`);
        } else {
            navigate('/Login');
        }
    }

    return (
        <div className={Styles.Header}>
            <Link to="/" className={Styles.Title}>
                Tempus-One
            </Link>
            <div className={Styles.UseHeader}>
                <div className={Styles.notifications}>
                    <FeatherIcon icon="bell" className={Styles.Img} />
                </div>
                <button className={Styles.ProfileIcon} onClick={OpenProfile}>
                    {UserIsAuth ? (
                        <img src={UserPhoto || undefined}></img>
                    ) : (
                        <FeatherIcon icon="user" className={Styles.Img} />
                    )}
                </button>
            </div>
        </div>
    );
}
