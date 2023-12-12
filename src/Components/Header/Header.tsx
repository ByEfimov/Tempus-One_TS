import Styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import { useState } from 'react';
import NavPanel from './NavPanel';
import UserIcon from '../../Assets/Icons/Header/user.svg';
import SearchIcon from '../../Assets/Icons/Header/search.svg';
import SlidersIcon from '../../Assets/Icons/Header/sliders.svg';
import { useHeader } from '../../Hooks/useHeader';
import {
    TypesOfHeader,
    TypesOfHeaderButton,
    setInputSearchBar,
    setTypeOfButtonHeader,
} from '../../Store/slices/Header/HeaderSlice';
import classNames from 'classnames';
import { useAppDispatch } from '../../Hooks/redus-hooks';

export default function Header() {
    const [openNavPanel, setOpenNavPanel] = useState(false);
    const { UserIsAuth, UserPhoto, UserId } = useAuth();
    const { HeaderTitle, HeaderType, HeaderSearchBar, HeaderTypeOfButton } =
        useHeader();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function OpenNav() {
        if (
            HeaderTypeOfButton === TypesOfHeaderButton.NavBar ||
            HeaderTypeOfButton === TypesOfHeaderButton.ToLeft
        ) {
            setOpenNavPanel(true);
            document.body.style.overflowY = 'hidden';
            dispatch(
                setTypeOfButtonHeader({
                    TypeOfButton: TypesOfHeaderButton.ToLeft,
                })
            );
        } else {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    }

    const Avatar = UserIsAuth ? (
        <img src={UserPhoto || undefined}></img>
    ) : (
        <img src={UserIcon} alt="" />
    );

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 60) {
            dispatch(
                setTypeOfButtonHeader({
                    TypeOfButton: TypesOfHeaderButton.ToTop,
                })
            );
        } else {
            dispatch(
                setTypeOfButtonHeader({
                    TypeOfButton: TypesOfHeaderButton.NavBar,
                })
            );
        }
    });

    const ClassToButton =
        HeaderTypeOfButton === TypesOfHeaderButton.ToTop
            ? Styles.ToTop
            : HeaderTypeOfButton === TypesOfHeaderButton.ToLeft
            ? Styles.ToLeft
            : undefined;

    return (
        <>
            {openNavPanel && (
                <NavPanel setOpenNavPanel={setOpenNavPanel}></NavPanel>
            )}
            <header className={Styles.Header}>
                <div className={Styles.TopBar}>
                    <button
                        onClick={OpenNav}
                        className={classNames(
                            Styles.ButtonWithLines,
                            ClassToButton
                        )}
                    ></button>
                    <Link to="/" className={Styles.Title}>
                        {HeaderTitle}
                    </Link>
                    <button
                        onClick={() =>
                            UserIsAuth
                                ? navigate('/User/' + UserId)
                                : navigate('/Login')
                        }
                        className={Styles.ProfileIcon}
                    >
                        {Avatar}
                    </button>
                </div>
                {HeaderType === TypesOfHeader.WithSearchBar && (
                    <div className={Styles.SearchBar}>
                        <button className={Styles.SearchIcon}>
                            <img src={SearchIcon} alt="" />
                        </button>
                        <input
                            onChange={(e) =>
                                dispatch(
                                    setInputSearchBar({
                                        SearchBar: e.target.value,
                                    })
                                )
                            }
                            type="text"
                            placeholder="Поиск"
                            className={Styles.Input}
                            value={HeaderSearchBar}
                        />
                        <button className={Styles.SlidersIcon}>
                            <img src={SlidersIcon} alt="" />
                        </button>
                    </div>
                )}
            </header>
        </>
    );
}
