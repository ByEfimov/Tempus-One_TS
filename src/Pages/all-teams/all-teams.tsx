import Styles from './Styles.module.scss';
import { getRequestArray } from 'Api/requests/get-requests';
import ButtonVoid from 'Components/mini-components/button';
import PreloaderUsers from 'Components/mini-components/preloader-users';
import { ErrorNotification } from 'Components/notifications/notifications';
import ShowUserOrTeam from 'Components/show-users-or-team/ShowUsersOrTeam';
import { OpenTeamType } from 'Types/TypesOfData/team-or-user/open-team-type';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AllTeams() {
    const [teams, setTeams] = useState<OpenTeamType[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getRequestArray('teams/')
            .then((teams) => setTeams(teams))
            .catch(() => ErrorNotification('Сообщества не найдены.'));
    }, []);

    return (
        <div className={Styles.Teams}>
            <ButtonVoid
                title="Добавить"
                clickHandler={() => navigate('/createNewTeam')}
            ></ButtonVoid>

            {teams ? (
                <div>
                    {teams.map((team) => (
                        <ShowUserOrTeam
                            key={team.id}
                            Team={team}
                        ></ShowUserOrTeam>
                    ))}
                </div>
            ) : (
                <PreloaderUsers></PreloaderUsers>
            )}
        </div>
    );
}
