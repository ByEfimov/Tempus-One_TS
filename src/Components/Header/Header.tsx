import Styles from './Header.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'Hooks/useAuth';
import { useState } from 'react';
import NavPanel from './NavPanel';
import UserIcon from 'Assets/Icons/Header/user.svg';
import { useHeader } from 'Hooks/useHeader';
import { setTypeOfButtonHeader } from 'Store/slices/Header/HeaderSlice';
import classNames from 'classnames';
import { useAppDispatch } from 'Hooks/redux-hooks';
import SearchBarComp from './SearchBar';
import {
    TypesOfHeader,
    TypesOfHeaderButton,
} from 'Types/TypesOfData/Header/HeaderType';

export default function Header() {
    const [openNavPanel, setOpenNavPanel] = useState(false);
    const { UserIsAuth, UserPhoto, UserId } = useAuth();
    const { HeaderTitle, HeaderType, HeaderTypeOfButton } = useHeader();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function ClickActiveButton() {
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
        <img src={UserPhoto || UserIcon}></img>
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
                        onClick={ClickActiveButton}
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
                    <SearchBarComp></SearchBarComp>
                )}
            </header>
        </>
    );
}
