import Styles from './Header.module.scss';
import TeamsIcon from 'Assets/Icons/NavBar/channel.svg';
import MainPageIcon from 'Assets/Icons/NavBar/clipboard.svg';
import MessagesIcon from 'Assets/Icons/NavBar/comments-alt.svg';
import WritePostIcon from 'Assets/Icons/NavBar/edit.svg';
import StatisticIcon from 'Assets/Icons/NavBar/game-structure.svg';
import UsersIcon from 'Assets/Icons/NavBar/users-alt.svg';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { useHeader } from 'Hooks/useHeader';
import { setTypeOfButtonHeader } from 'Store/slices/Header/HeaderSlice';
import { TypesOfHeaderButton } from 'Types/TypesOfData/Header/HeaderType';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavPanelType {
    setOpenNavPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavPanel: FC<NavPanelType> = ({ setOpenNavPanel }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { HeaderTitle } = useHeader();
    const { UserCanChanging, UserIsAuth } = useAuth();

    const NavBarRef = React.createRef<HTMLDivElement>();

    function closeNav() {
        NavBarRef.current?.classList.add(Styles.NavPanelClose);
        document.body.style.overflowY = 'auto';
        dispatch(
            setTypeOfButtonHeader({
                TypeOfButton: TypesOfHeaderButton.NavBar,
            }),
        );
        setTimeout(() => {
            setOpenNavPanel(false);
        }, 500);
    }

    return (
        <div className={Styles.NavPanel} ref={NavBarRef}>
            <div className={Styles.back} onClick={() => closeNav()}></div>
            <div className={Styles.blocks}>
                <div className={Styles.Title}>{HeaderTitle}</div>
                <div
                    className={Styles.block}
                    onClick={() => {
                        if (UserCanChanging) {
                            navigate('/WriteNewPost');
                        } else if (!UserCanChanging) {
                            if (!UserIsAuth) {
                                ErrorNotification('Нужно войти в аккаунт.');
                            } else {
                                ErrorNotification('Нужно подтвердить почту.');
                            }
                        }
                        closeNav();
                    }}
                >
                    <img src={WritePostIcon} alt="" />
                    Написать пост
                </div>
                <div
                    className={Styles.block}
                    onClick={() => {
                        navigate('/');
                        closeNav();
                    }}
                >
                    <img src={MainPageIcon} alt="" />
                    Главная
                </div>
                <div
                    className={Styles.block}
                    onClick={() => {
                        navigate('/Users');
                        closeNav();
                    }}
                >
                    <img src={UsersIcon} alt="" />
                    Люди
                </div>
                <div
                    className={Styles.block}
                    onClick={() => {
                        navigate('/Teams');
                        closeNav();
                    }}
                >
                    <img src={TeamsIcon} alt="" />
                    Сообщества
                </div>
                <div
                    className={Styles.block}
                    onClick={() => {
                        ErrorNotification('Сервис недоступен.');
                        closeNav();
                    }}
                >
                    <img src={MessagesIcon} alt="" />
                    Сообщения
                </div>
                <div
                    className={Styles.block}
                    onClick={() => {
                        ErrorNotification('Сервис недоступен.');
                        closeNav();
                    }}
                >
                    <img src={StatisticIcon} alt="" />
                    Статистика
                </div>
            </div>
        </div>
    );
};

export default NavPanel;
