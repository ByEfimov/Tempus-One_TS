import Styles from './Styles.module.scss';
import { getRequestObject } from 'Api/requests/get-requests';
import UserIcon from 'Assets/Icons/User/user.svg';
import {
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import Preloader from 'Assets/Tempus-Ui/Components/Preloader/Preloader';
import SubscribeButton from 'Components/mini-components/subscribe-button';
import StatusModal from 'Components/modals/status-modal/status-modal';
import { ErrorNotification } from 'Components/notifications/notifications';
import ShowPosts from 'Components/show-posts/posts/show-posts';
import ShowUserOrTeam from 'Components/show-users-or-team/show-users-or-team';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { UserType } from 'Store/slices/UserSlice';
import { setExecuteButton } from 'Store/slices/header/header-slice';
import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import MaxXpToNextLevel from 'Utils/users-or-teams/max-xp-to-next-level';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserPage() {
    const { id } = useParams();
    const [OpenUser, setOpenUser] = useState<OpenUserType | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getRequestObject('users/' + id)
            .then((user) => {
                setOpenUser(user);
            })
            .catch(() => ErrorNotification('Пользователь не найден.'));
    }, []);

    useEffect(() => {
        dispatch(
            setExecuteButton({
                button: {
                    icon: '',
                    component: (
                        <SubscribeButton
                            WhoWrotePost={OpenUser}
                            id={OpenUser?.id}
                        />
                    ),
                },
            }),
        );
    }, [OpenUser]);

    if (OpenUser) {
        return (
            <>
                <UserData OpenUser={OpenUser} />

                <ShowTeams
                    UserSubscriptions={OpenUser.subscriptions}
                ></ShowTeams>
                <ShowPosts ShowTitle AuthorFilter={OpenUser.id}></ShowPosts>
            </>
        );
    } else if (!OpenUser) {
        return <Preloader></Preloader>;
    }
}

const ShowTeams = ({
    UserSubscriptions,
}: {
    UserSubscriptions: {
        teams?: Record<string, string>;
        users?: Record<string, string>;
    };
}) => {
    const [firstTeam, setFirstTeam] = useState<OpenTeamType>();

    useEffect(() => {
        async function getFirstTeam() {
            if (UserSubscriptions?.teams) {
                const team = await getRequestObject(
                    'teams/' + Object.values(UserSubscriptions?.teams)[0],
                );
                setFirstTeam(team);
            }
        }

        getFirstTeam();
    }, []);

    return (
        UserSubscriptions?.teams &&
        firstTeam && (
            <motion.ul
                variants={formContainer}
                initial="hidden"
                animate="visible"
                className={Styles.ShowTeams}
            >
                <motion.li variants={formItem} className={Styles.TitleTeams}>
                    Сообщества
                    <div>{Object.values(UserSubscriptions?.teams).length}</div>
                </motion.li>
                <ShowUserOrTeam Team={firstTeam}></ShowUserOrTeam>
            </motion.ul>
        )
    );
};

interface CustomCSSProperties extends React.CSSProperties {
    '--progress-value'?: number;
}

const UserData = ({ OpenUser }: { OpenUser: OpenUserType | UserType }) => {
    return (
        <motion.div className={Styles.UserData}>
            <motion.ul
                variants={formContainer}
                initial="hidden"
                animate="visible"
                className={Styles.UserTexts}
            >
                <UserLogo OpenUser={OpenUser}></UserLogo>
                <motion.li variants={formItem} className={Styles.UserName}>
                    {OpenUser.name}
                </motion.li>
                <motion.li variants={formItem} className={Styles.UserEmail}>
                    {OpenUser.specialization
                        ? OpenUser.specialization
                        : OpenUser.email}
                </motion.li>
                <motion.li variants={formItem} className={Styles.UserLevel}>
                    {OpenUser.level} уровень
                </motion.li>
            </motion.ul>
        </motion.div>
    );
};

export type statusType = {
    desc: string;
    id: string;
    name: string;
    image: string;
};

const UserLogo = ({ OpenUser }: { OpenUser: OpenUserType | UserType }) => {
    const [statusModalOpen, setStatusModalOpen] = useState(false);
    const [userStatus, setUserStatus] = useState<statusType>();

    const progressValue =
        OpenUser.experience &&
        Math.round(
            (OpenUser.experience / MaxXpToNextLevel(OpenUser.level || 0)) * 100,
        );

    useEffect(() => {
        getRequestObject('achievements/' + OpenUser.status).then((achive) =>
            setUserStatus(achive),
        );
    }, []);

    return (
        <motion.div
            variants={formContainer}
            initial="hidden"
            animate="visible"
            className={Styles.TopBar}
        >
            {statusModalOpen && (
                <StatusModal
                    status={userStatus}
                    setModalOpen={setStatusModalOpen}
                ></StatusModal>
            )}
            <div
                className={Styles.UserStatus}
                onClick={() => {
                    setStatusModalOpen(true);
                }}
            >
                <img src={userStatus?.image} alt="" />
            </div>
            <div className={Styles.UserPhoto}>
                <img
                    className={OpenUser.photo ? Styles.Photo : Styles.Fake}
                    src={OpenUser.photo || UserIcon}
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
                    max={MaxXpToNextLevel(OpenUser.level || 0)}
                    value={OpenUser.experience || 0}
                ></progress>
            </div>
        </motion.div>
    );
};

export { UserData };
