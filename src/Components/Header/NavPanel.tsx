import { FC } from 'react';
import Styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import React from 'react';

interface NavPanelType {
    setOpenNavPanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavPanel: FC<NavPanelType> = ({ setOpenNavPanel }) => {
    const navigate = useNavigate();
    const { UserId } = useAuth();

    const NavBarRef = React.createRef<HTMLDivElement>();

    function closeNav() {
        NavBarRef.current?.classList.add(Styles.NavPanelClose);
        setTimeout(() => {
            setOpenNavPanel(false);
        }, 300);
    }

    return (
        <div className={Styles.NavPanel} ref={NavBarRef}>
            <div className={Styles.back} onClick={() => closeNav()}></div>
            <div className={Styles.blocks}>
                <div
                    className={Styles.block}
                    onClick={() => {
                        navigate('/');
                        closeNav();
                    }}
                >
                    Главная
                </div>
                <div
                    className={Styles.block}
                    onClick={() => {
                        navigate('/Users');
                        closeNav();
                    }}
                >
                    Люди
                </div>
                <div
                    className={Styles.block}
                    onClick={() => {
                        navigate('/Teams');
                        closeNav();
                    }}
                >
                    Команды
                </div>
                <div
                    className={Styles.block}
                    onClick={() => {
                        if (UserId) {
                            navigate('/User/' + UserId);
                        } else {
                            navigate('/Login');
                        }

                        closeNav();
                    }}
                >
                    Я
                </div>
            </div>
        </div>
    );
};

export default NavPanel;
