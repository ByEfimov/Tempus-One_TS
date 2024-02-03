import Styles from './Styles.module.scss';
import TeamInfoModal from './team-info-modal';
import getUserAdmins from 'Api/Teams/get-user-admins';
import { getRequestObject } from 'Api/requests/get-requests';
import {
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import Preloader from 'Assets/Tempus-Ui/Components/Preloader/Preloader';
import ButtonIcons, {
    buttonIcons,
} from 'Assets/Tempus-Ui/Icons/Buttons/Button-icons';
import ButtonVoid from 'Components/mini-components/button';
import SubscribeButton from 'Components/mini-components/subscribe-button';
import SettingsTeamModal from 'Components/modals/settings-modal/settings-team-modal';
import { ErrorNotification } from 'Components/notifications/notifications';
import ShowPosts from 'Components/show-posts/posts/show-posts';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setExecuteButton } from 'Store/slices/header/header-slice';
import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import MaxXpToNextLevel from 'Utils/users-or-teams/max-xp-to-next-level';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function TeamPage() {
    const { id } = useParams();
    const { UserId } = useAuth();
    const [OpenTeam, setOpenTeam] = useState<OpenTeamType | null>(null);
    const [UserAdmin, setUserAdmin] = useState(false);
    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getRequestObject('teams/' + id)
            .then((team) => {
                setOpenTeam(team);
                getUserAdmins(UserId).then((teams) => {
                    setUserAdmin(teams.some((team) => team.TeamId === id));
                });
            })
            .catch(() => ErrorNotification('Сообщество не найдено.'));
    }, []);

    useEffect(() => {
        dispatch(
            setExecuteButton({
                button: {
                    icon: '',
                    component: (
                        <SubscribeButton
                            WhoWrotePost={OpenTeam}
                            id={OpenTeam?.id}
                        />
                    ),
                },
            }),
        );
    }, [OpenTeam]);

    if (OpenTeam) {
        return (
            <motion.div
                variants={formContainer}
                initial="hidden"
                animate="visible"
                className={Styles.TeamPage}
            >
                {settingsModalOpen && (
                    <SettingsTeamModal
                        setModalOpen={setSettingsModalOpen}
                        team={OpenTeam}
                    />
                )}

                <TeamData OpenTeam={OpenTeam}></TeamData>

                {UserAdmin && (
                    <ButtonVoid
                        clickHandler={() => {
                            setSettingsModalOpen(true);
                        }}
                        title="Настройки"
                        padding={false}
                        classes={Styles.buttonSettings}
                    />
                )}

                <TeamInfo OpenTeam={OpenTeam}></TeamInfo>

                <ShowPosts ShowTitle AuthorFilter={OpenTeam.id}></ShowPosts>
            </motion.div>
        );
    } else if (!OpenTeam) {
        return <Preloader></Preloader>;
    }
}

function TeamInfo({ OpenTeam }: { OpenTeam: OpenTeamType }) {
    const [modalInfoOpen, setModalInfoOpen] = useState(false);

    return (
        OpenTeam && (
            <motion.div variants={formItem} className={Styles.TeamInfo}>
                {modalInfoOpen && (
                    <TeamInfoModal
                        setModalOpen={setModalInfoOpen}
                        OpenTeam={OpenTeam}
                    ></TeamInfoModal>
                )}
                <motion.div
                    className={Styles.Title}
                    onClick={() => {
                        setModalInfoOpen(true);
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

function TeamData({ OpenTeam }: { OpenTeam: OpenTeamType }) {
    const progressValue =
        OpenTeam.experience &&
        Math.round(
            (OpenTeam.experience / MaxXpToNextLevel(OpenTeam.level || 0)) * 100,
        );

    return (
        <motion.div className={Styles.UserData} variants={formItem}>
            <div className={Styles.TopBar}>
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
            </div>

            <motion.ul
                variants={formContainer}
                initial="hidden"
                animate="visible"
                className={Styles.UserTexts}
            >
                <motion.li variants={formItem} className={Styles.UserName}>
                    {OpenTeam.title}
                </motion.li>
                <motion.li variants={formItem} className={Styles.UserEmail}>
                    {Object.values(OpenTeam.members).length} подписчиков
                </motion.li>
                <motion.li variants={formItem} className={Styles.UserLevel}>
                    {OpenTeam.level || 1} уровень
                </motion.li>
            </motion.ul>
        </motion.div>
    );
}
