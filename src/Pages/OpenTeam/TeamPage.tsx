/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTeamFromId } from 'Api/Teams/getTeamDataFromId';
import ShowPosts from 'Components/ShowPosts/Posts/ShowPosts';
import { setTitleOfHeader } from 'Store/slices/Header/HeaderSlice';
import { useAppDispatch } from 'Hooks/redux-hooks';
import { OpenTeamType } from 'Types/TypesOfData/TeamOrUser/OpenTeamType';
import FakeOpenUser from 'Components/FakeData/FakeOpenUser';
import { ErrorNotification } from 'Components/Notifications/Notifications';
import SubscribeButton from 'Components/MiniComponents/SubscribeButton';
import SettingsTeamModal from 'Components/Modals/SettingsModals/SettingsTeamModal';
import getUserAdmins from 'Api/Teams/GetUserAdmins';
import { useAuth } from 'Hooks/useAuth';
import ButtonVoid from 'Components/MiniComponents/button';
import Styles from './Styles.module.scss';

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
