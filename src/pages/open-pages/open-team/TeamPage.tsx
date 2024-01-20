import Styles from './Styles.module.scss';
import { getTeamFromId } from 'Api/Teams/get-team-data-from-id';
import getUserAdmins from 'Api/Teams/get-user-admins';
import FakeOpenUser from 'Components/fake-data/fake-open-user';
import ButtonVoid from 'Components/mini-components/button';
import SubscribeButton from 'Components/mini-components/subscribe-button';
import SettingsTeamModal from 'Components/modals/settings-modal/settings-team-modal';
import { ErrorNotification } from 'Components/notifications/notifications';
import ShowPosts from 'Components/show-posts/posts/show-posts';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { useAuth } from 'Hooks/useAuth';
import { setTitleOfHeader } from 'Store/slices/header/header-slice';
import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
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
        getTeamFromId(id)
            .then((team) => {
                setOpenTeam(team);
                dispatch(setTitleOfHeader({ Title: team?.title }));
                getUserAdmins(UserId).then((teams) => {
                    setUserAdmin(teams.some((team) => team.TeamId === id));
                });
            })
            .catch(() => ErrorNotification('Сообщество не найдено.'));
    }, []);

    if (OpenTeam) {
        return (
            <div className={Styles.TeamPage}>
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

                <ShowPosts filter={OpenTeam.id}></ShowPosts>
            </div>
        );
    } else if (!OpenTeam) {
        return <FakeOpenUser></FakeOpenUser>;
    }
}

interface TeamData {
    OpenTeam: OpenTeamType;
}

function TeamData({ OpenTeam }: TeamData) {
    return (
        <div className={Styles.TeamData}>
            <div className={Styles.TopBlock}>
                <div className={Styles.TeamImage}>
                    <img src={OpenTeam.image} alt="" />
                </div>
                <div className={Styles.TeamTitle}>{OpenTeam.title}</div>
            </div>
            <div className={Styles.bottomBlock}>
                <div className={Styles.Subscriptions}>
                    {Object.values(OpenTeam.members).length | 0} Подписчиков
                </div>
                <SubscribeButton WhoWrotePost={OpenTeam} />
            </div>
        </div>
    );
}