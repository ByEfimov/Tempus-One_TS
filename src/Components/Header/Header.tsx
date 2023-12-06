import FeatherIcon from 'feather-icons-react';
import Styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { useState } from 'react';
import NavPanel from './NavPanel';

export default function Header() {
    const [openNavPanel, setOpenNavPanel] = useState(false);
    const { UserIsAuth, UserPhoto } = useAuth();

    function OpenNav() {
        setOpenNavPanel(!openNavPanel);
    }

    return (
        <div className={Styles.Header}>
            {openNavPanel && (
                <NavPanel setOpenNavPanel={setOpenNavPanel}></NavPanel>
            )}
            <Link to="/" className={Styles.Title}>
                Tempus-One
            </Link>
            <div className={Styles.UseHeader}>
                <div className={Styles.notifications}>
                    <FeatherIcon icon="bell" className={Styles.Img} />
                </div>
                <button className={Styles.ProfileIcon} onClick={OpenNav}>
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
