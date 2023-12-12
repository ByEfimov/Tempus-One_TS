import Styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { useState } from 'react';
import NavPanel from './NavPanel';
import UserIcon from '../../Assets/Icons/user.svg';
import SearchIcon from '../../Assets/Icons/search.svg';
import SlidersIcon from '../../Assets/Icons/sliders.svg';

export default function Header() {
    const [openNavPanel, setOpenNavPanel] = useState(false);
    const { UserIsAuth, UserPhoto } = useAuth();

    function OpenNav() {
        setOpenNavPanel(!openNavPanel);
    }

    const Avatar = UserIsAuth ? (
        <img src={UserPhoto || undefined}></img>
    ) : (
        <img src={UserIcon} alt="" />
    );

    return (
        <>
            {openNavPanel && (
                <NavPanel setOpenNavPanel={setOpenNavPanel}></NavPanel>
            )}
            <header className={Styles.Header}>
                <div className={Styles.TopBar}>
                    <button
                        onClick={OpenNav}
                        className={Styles.ButtonWithLines}
                    ></button>
                    <Link to="/" className={Styles.Title}>
                        TEMPUS
                    </Link>
                    <button className={Styles.ProfileIcon}>{Avatar}</button>
                </div>
                <div className={Styles.SearchBar}>
                    <button className={Styles.SearchIcon}>
                        <img src={SearchIcon} alt="" />
                    </button>
                    <input
                        type="text"
                        placeholder="Поиск"
                        className={Styles.Input}
                    />
                    <button className={Styles.SlidersIcon}>
                        <img src={SlidersIcon} alt="" />
                    </button>
                </div>
            </header>
        </>
    );
}
