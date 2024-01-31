import Styles from './Styles.module.scss';
import { getRequestObject } from 'Api/requests/get-requests';
import UserIcon from 'Assets/Icons/User/user.svg';
import {
    formContainer,
    formItem,
} from 'Assets/Tempus-Ui/Animation/Form-animate';
import Preloader from 'Assets/Tempus-Ui/Components/Preloader/Preloader';
import { ErrorNotification } from 'Components/notifications/notifications';
import ShowPosts from 'Components/show-posts/posts/show-posts';
import ShowUserOrTeam from 'Components/show-users-or-team/show-users-or-team';
import { UserType } from 'Store/slices/UserSlice';
import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import { OpenUserType } from 'Types/TypesOfData/team-or-user/open-user-type';
import MaxXpToNextLevel from 'Utils/users-or-teams/max-xp-to-next-level';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UserPage() {
    const { id } = useParams();
    const [OpenUser, setOpenUser] = useState<OpenUserType | null>(null);

    useEffect(() => {
        getRequestObject('users/' + id)
            .then((user) => {
                setOpenUser(user);
            })
            .catch(() => ErrorNotification('Пользователь не найден.'));
    }, []);

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

interface UserDataProps {
    OpenUser: OpenUserType | UserType;
}
interface CustomCSSProperties extends React.CSSProperties {
    '--progress-value'?: number;
}

const UserData = ({ OpenUser }: UserDataProps) => {
    const progressValue =
        OpenUser.experience &&
        Math.round(
            (OpenUser.experience / MaxXpToNextLevel(OpenUser.level || 0)) * 100,
        );

    return (
        <motion.div className={Styles.UserData}>
            <div className={Styles.TopBar}>
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
            </div>

            <motion.ul
                variants={formContainer}
                initial="hidden"
                animate="visible"
                className={Styles.UserTexts}
            >
                <motion.li variants={formItem} className={Styles.UserName}>
                    {OpenUser.name}
                </motion.li>
                <motion.li variants={formItem} className={Styles.UserEmail}>
                    {OpenUser.email}
                </motion.li>
                <motion.li variants={formItem} className={Styles.UserLevel}>
                    {OpenUser.level} уровень
                </motion.li>
            </motion.ul>
        </motion.div>
    );
};

export { UserData };
