import Styles from './styles.module.scss';
import TeamInfoModal from './team-info-modal';
import getUserAdmins from '@/Api/Teams/get-user-admins';
import { getRequestObject } from '@/Api/requests/get-requests';
import {
    Button,
    ButtonIcons,
    ButtonTypes,
    Preloader,
    buttonIcons,
    formContainer,
    formItem,
} from '@/Assets/Tempus-Ui';
import SubscribeButton from '@/Components/mini-components/subscribe-button';
import SettingsTeamModal from '@/Components/modals/settings-modal/settings-team-modal';
import { ErrorNotification } from '@/Components/notifications/notifications';
import ShowPosts from '@/Components/show-posts/posts/show-posts';
import { useAppDispatch } from '@/Hooks/redux-hooks';
import { useAuth } from '@/Hooks/useAuth';
import { setExecuteButton } from '@/Store/slices/header/header-slice';
import { OpenTeamType } from '@/Types/TypesOfData/team-or-user/open-team-type';
import MaxXpToNextLevel from '@/Utils/users-or-teams/max-xp-to-next-level';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function TeamPage() {
    const { id } = useParams();
    const { UserId } = useAuth();
    const [openTeam, setOpenTeam] = useState<OpenTeamType>();
    const [isUserAdmin, setUserAdmin] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const [infoModalOpen, setInfoModalOpen] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        getRequestObject('teams/' + id)
            .then((team) => {
                setOpenTeam(team);
                getUserAdmins(UserId).then((teams) => {
                    setUserAdmin(teams.some((team) => team.value === id));
                });
            })
            .catch(() => ErrorNotification('Сообщество не найдено.'));
    }, []);

    useEffect(() => {
        dispatch(
            setExecuteButton({
                button: {
                    component: (
                        <SubscribeButton
                            WhoWrotePost={openTeam}
                            id={openTeam?.id}
                        />
                    ),
                },
            }),
        );
    }, [openTeam]);

    if (openTeam) {
        return (
            <>
                <TeamModals
                    setSettingsModalOpen={setSettingsModalOpen}
                    OpenTeam={openTeam}
                    setInfoModalOpen={setInfoModalOpen}
                    infoModalOpen={infoModalOpen}
                    settingsModalOpen={settingsModalOpen}
                />
                <TeamData
                    setInfoModalOpen={setInfoModalOpen}
                    setSettingsModalOpen={setSettingsModalOpen}
                    UserAdmin={isUserAdmin}
                    OpenTeam={openTeam}
                />
                <div className={Styles.TeamPosts}>
                    <ShowPosts ShowTitle AuthorFilter={openTeam.id} />
                </div>
            </>
        );
    } else if (!openTeam) {
        return <Preloader></Preloader>;
    }
}

interface modalInterface {
    setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    OpenTeam: OpenTeamType;
    setInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    infoModalOpen: boolean;
    settingsModalOpen: boolean;
}

function TeamModals({
    setSettingsModalOpen,
    OpenTeam,
    setInfoModalOpen,
    infoModalOpen,
    settingsModalOpen,
}: modalInterface) {
    return (
        <>
            {settingsModalOpen && (
                <SettingsTeamModal
                    setModalOpen={setSettingsModalOpen}
                    team={OpenTeam}
                />
            )}
            {infoModalOpen && (
                <TeamInfoModal
                    setModalOpen={setInfoModalOpen}
                    OpenTeam={OpenTeam}
                ></TeamInfoModal>
            )}
        </>
    );
}

function TeamInfo({
    OpenTeam,
    setInfoModalOpen,
}: {
    OpenTeam: OpenTeamType;
    setInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        OpenTeam && (
            <motion.div variants={formItem} className={Styles.TeamInfo}>
                <motion.div
                    className={Styles.Title}
                    onClick={() => {
                        setInfoModalOpen(true);
                    }}
                >
                    Информация
                    <div>
                        <ButtonIcons Icon={buttonIcons.Arrow}></ButtonIcons>
                    </div>
                </motion.div>
            </motion.div>
        )
    );
}

interface CustomCSSProperties extends React.CSSProperties {
    '--progress-value'?: number;
}

function TeamData({
    OpenTeam,
    UserAdmin,
    setSettingsModalOpen,
    setInfoModalOpen,
}: {
    OpenTeam: OpenTeamType;
    UserAdmin: boolean;
    setSettingsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setInfoModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const progressValue =
        OpenTeam.experience &&
        Math.round(
            (OpenTeam.experience / MaxXpToNextLevel(OpenTeam.level || 0)) * 100,
        );

    return (
        <motion.div className={Styles.UserData} variants={formItem}>
            <motion.div {...formContainer} className={Styles.TopBar}>
                <div className={Styles.UserPhoto}>
                    <img
                        className={OpenTeam.image ? Styles.Photo : Styles.Fake}
                        src={OpenTeam.image}
                        alt="UserPhoto"
                    />
                </div>

                <div
                    className="progress-bar css"
                    style={
                        {
                            '--progress-value': progressValue,
                        } as CustomCSSProperties
                    }
                >
                    <progress
                        id="css"
                        max={MaxXpToNextLevel(OpenTeam.level || 0)}
                        value={OpenTeam.experience || 0}
                    ></progress>
                </div>
            </motion.div>

            <motion.ul {...formContainer} className={Styles.UserTexts}>
                <motion.li variants={formItem} className={Styles.UserName}>
                    {OpenTeam.title}
                </motion.li>
                <motion.li variants={formItem} className={Styles.UserEmail}>
                    {OpenTeam.direction ||
                        Object.values(OpenTeam.members).length + ' подписчиков'}
                </motion.li>
                <motion.li variants={formItem} className={Styles.UserLevel}>
                    {OpenTeam.level || 1} уровень
                </motion.li>
                <TeamInfo
                    setInfoModalOpen={setInfoModalOpen}
                    OpenTeam={OpenTeam}
                ></TeamInfo>
                {UserAdmin && (
                    <Button
                        Click={() => {
                            setSettingsModalOpen(true);
                        }}
                        Variants={formItem}
                        Title="Настройки"
                        Class={Styles.buttonSettings}
                        Type={ButtonTypes.default}
                    />
                )}
            </motion.ul>
        </motion.div>
    );
}
